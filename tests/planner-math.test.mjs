import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as m from '../src/planner-math.mjs';
import {MAX,InputError} from '../src/math.mjs';
const fixtures=JSON.parse(readFileSync(new URL('../data/calculator-fixtures.json',import.meta.url))).cases;
const names={target_bitrate:'targetBitrate',recording_capacity:'recordingCapacity',proxy_timing:'proxyTiming'};
const fixture=id=>structuredClone(fixtures.find(c=>c.id===id).inputs);
const close=(a,b)=>assert.ok(Math.abs(a-b)<=Math.max(1e-8*Math.abs(b),1e-6),`${a} != ${b}`);
for(const c of fixtures.filter(c=>c.tool!=='file_size')) test(`independent fixture ${c.id}`,()=>{
  const result=m[names[c.tool]??c.tool](c.inputs);
  for(const [key,value] of Object.entries(c.expected)) close(result[key],value);
});
const reject=fn=>assert.throws(fn,InputError);
test('normalized validation does not reparse legitimate binary fractions',()=>{
  assert.equal(m.nonnegative(0.1+0.2),0.1+0.2);
  for(const value of ['', '1',NaN,Infinity,-Infinity,-1,null,undefined,MAX+1]) reject(()=>m.nonnegative(value));
  reject(()=>m.positive(0));
});
test('target budget preserves negative and zero video feasibility',()=>{
  const args={target_bytes:1e6,duration_seconds:8,audio_mbps:1};
  assert.deepEqual(m.targetBitrate(args),{planned_bytes:1e6,video_mbps:0,feasible:false});
  assert.equal(m.targetBitrate({...args,audio_mbps:2}).video_mbps,-1);
  reject(()=>m.targetBitrate({...args,duration_seconds:0}));
  reject(()=>m.targetBitrate({...args,size_reserve:1}));
});
test('target inversion and fractional subsecond durations',()=>{
  const p=fixture('proxy-1'); const result=m.proxy(p);
  const target=m.targetBitrate({target_bytes:result.original_bytes,duration_seconds:p.duration_seconds,audio_mbps:p.original_audio_mbps,container_allowance:p.container_allowance});
  close(target.video_mbps,p.original_video_mbps);
  close(m.targetBitrate({target_bytes:1,duration_seconds:0.1}).video_mbps,0.00008);
});
test('transfer exclusive modes and efficiency used exactly once',()=>{
  close(m.transfer({bytes:1e6,measured_MBps:1}).seconds,1);
  close(m.transfer({bytes:1e6,link_mbps:8,efficiency:0.5}).seconds,2);
  assert.equal(m.transfer({bytes:1,measured_MBps:1,setup_seconds:2}).total_seconds,2.000001);
  for(const args of [{bytes:1,measured_MBps:1,efficiency:0.8},{bytes:1,measured_MBps:1,link_mbps:8},{bytes:1},{bytes:1,link_mbps:1,efficiency:0},{bytes:1,link_mbps:1,efficiency:1.1},{bytes:1,measured_MBps:1,mode:'link'},{bytes:0,measured_MBps:1}]) reject(()=>m.transfer(args));
});
test('deadline exhausted window has null required rates, not infinity',()=>{
  const a={bytes:1e6,link_mbps:8,efficiency:1,window_seconds:1,prep_seconds:1};
  const r=m.deadline(a); assert.equal(r.required_effective_mbps,null); assert.equal(r.required_link_mbps,null); assert.equal(r.maximum_transferable_bytes,0); assert.equal(r.slack_seconds,-1);
  assert.equal(m.deadline({...a,prep_seconds:2}).available_transfer_seconds,-1);
});
test('deadline exact equality and measured mode',()=>{
  const r=m.deadline({bytes:1e6,measured_MBps:1,window_seconds:1});
  assert.equal(r.slack_seconds,0); assert.equal(r.feasible,true); assert.equal(r.required_link_mbps,null); assert.equal(r.required_effective_mbps,8);
  assert.equal(m.deadline({bytes:1e6,measured_MBps:1,window_seconds:0.999999}).feasible,false);
});
test('capacity zero usable is valid and negative usable rejects',()=>{
  const args={capacity_bytes:100,video_mbps:1,fixed_reserved_bytes:100};
  assert.equal(m.recordingCapacity(args).seconds,0);
  reject(()=>m.recordingCapacity({...args,fixed_reserved_bytes:101}));
  reject(()=>m.recordingCapacity({...args,reserved_fraction:1}));
  reject(()=>m.recordingCapacity({...args,video_mbps:0}));
});
test('multicam count and per destination reserve division',()=>{
  const a=fixture('multicam-1'),r=m.multicam(a);
  close(r.per_destination_capacity_bytes,r.unique_bytes/0.8);
  close(r.required_capacity_bytes,r.per_destination_capacity_bytes*2);
  for(const value of [0,-1,1.5,NaN,MAX+1]) {
    reject(()=>m.multicam({...a,total_copies:value}));
    reject(()=>m.multicam({...a,rows:[{...a.rows[0],cameras:value}]}));
  }
  reject(()=>m.multicam({...a,rows:[]}));
});
test('offload default source reread off and explicit extra pass',()=>{
  const a=fixture('offload-1'); delete a.mode; delete a.additional_source_reread;
  const r=m.offload(a); assert.equal(r.mode,'sequential'); assert.equal(r.total_seconds,2520); assert.equal(r.copy_rate_model,'measured');
  assert.equal(m.offload({...a,additional_source_reread:true}).total_seconds,2920);
  delete a.measured_copy_MBps;
  assert.equal(m.offload(a).copy_rate_model,'idealized_component_bottleneck');
  assert.equal(m.offload(a).total_seconds,2520);
});
test('offload advanced parallel caps and independent bottlenecks',()=>{
  const a=fixture('offload-2');
  assert.equal(m.offload({...a,source_MBps:10}).copy_seconds,12000);
  assert.equal(m.offload({...a,destination_write_MBps:[10,200]}).copy_seconds,12000);
  assert.equal(m.offload({...a,aggregate_destination_write_MBps:10}).copy_seconds,24000);
  assert.equal(m.offload({...a,aggregate_verification_read_MBps:10}).verification_seconds,36000);
  assert.equal(m.offload({...a,additional_source_reread:false}).verification_seconds,600);
  for(const key of ['source_MBps','aggregate_destination_write_MBps','aggregate_verification_read_MBps']) { const b={...a};delete b[key];reject(()=>m.offload(b)); }
});
test('offload rejects ambiguous mode or mismatched copies',()=>{
  const a=fixture('offload-1');
  for(const b of [{...a,copies:1.5},{...a,destination_verify_MBps:[1]},{...a,measured_copy_MBps:[1]},{...a,mode:'magic'},{...a,additional_source_reread:'true'}]) reject(()=>m.offload(b));
  reject(()=>m.offload({...fixture('offload-2'),measured_copy_MBps:[200,200]}));
});
test('proxy larger means signed reduction; copies separate from handoff',()=>{
  const a=fixture('proxy-1'),r=m.proxy({...a,proxy_video_mbps:400});
  assert.ok(r.portable_reduction_bytes<0); assert.ok(r.portable_reduction_percent<0);
  const p=m.proxy({...a,original_copies:0,proxy_copies:2}); close(p.retained_bytes,p.proxy_bytes*2);
  assert.equal(p.original_plus_proxy_bytes,m.proxy(a).original_plus_proxy_bytes);
  reject(()=>m.proxy({...a,original_copies:0,proxy_copies:0}));
  reject(()=>m.proxy({...a,proxy_copies:1.5}));
});
test('proxy per-set allowances override common allowance once',()=>{
  const a={duration_seconds:8,original_video_mbps:1,proxy_video_mbps:1,container_allowance:0.9,original_container_allowance:0,proxy_container_allowance:0.2};
  const r=m.proxy(a); assert.equal(r.original_bytes,1e6);assert.equal(r.proxy_bytes,1.2e6);
});
test('proxy timing exact break even, sign flip and no repeated allowance',()=>{
  const a={original_bytes:2e6,proxy_bytes:1e6,measured_transcode_seconds:1,measured_effective_upload_mbps:8};
  const r=m.proxyTiming(a);assert.equal(r.net_time_saved_seconds,0);assert.equal(r.break_even_effective_mbps,8);assert.equal(r.break_even_status,'finite');
  assert.ok(m.proxyTiming({...a,measured_effective_upload_mbps:4}).net_time_saved_seconds>0);
  assert.ok(m.proxyTiming({...a,measured_effective_upload_mbps:16}).net_time_saved_seconds<0);
});
test('proxy timing all zero-transcode/equal/larger branches',()=>{
  const a={original_bytes:2e6,proxy_bytes:1e6,measured_transcode_seconds:0,measured_effective_upload_mbps:8};
  assert.equal(m.proxyTiming(a).break_even_effective_mbps,null);
  assert.equal(m.proxyTiming(a).break_even_status,'proxy_faster_at_all_rates');
  assert.equal(m.proxyTiming({...a,proxy_bytes:2e6}).break_even_status,'tie_at_all_rates');
  assert.equal(m.proxyTiming({...a,proxy_bytes:3e6}).break_even_status,'original_faster_at_all_rates');
  const r=m.proxyTiming({...a,proxy_bytes:3e6,measured_transcode_seconds:1});assert.equal(r.maximum_transcode_seconds,-1);assert.equal(r.net_time_saved_seconds,-2);
  for(const b of [{...a,measured_transcode_seconds:-1},{...a,measured_transcode_seconds:Infinity},{...a,measured_effective_upload_mbps:0},{...a,sequential:false}]) reject(()=>m.proxyTiming(b));
});
test('intermediate overflow is rejected, not hidden by later division',()=>{
  reject(()=>m.targetBitrate({target_bytes:MAX,duration_seconds:1e6}));
  reject(()=>m.transfer({bytes:1,measured_MBps:MAX}));
  reject(()=>m.deadline({bytes:1,measured_MBps:1,window_seconds:MAX}));
  reject(()=>m.multicam({rows:[{cameras:MAX,video_mbps:1,duration_seconds:1}],total_copies:1}));
  reject(()=>m.proxyTiming({original_bytes:MAX,proxy_bytes:1,measured_transcode_seconds:1,measured_effective_upload_mbps:1}));
});
test('tiny valid values remain nonzero; underflow rejects',()=>{
  assert.ok(m.transfer({bytes:1e-12,measured_MBps:1}).seconds>0);
  reject(()=>m.transfer({bytes:Number.MIN_VALUE,measured_MBps:1}));
  reject(()=>m.targetBitrate({target_bytes:Number.MIN_VALUE,duration_seconds:1,size_reserve:0.9}));
  reject(()=>m.transfer({bytes:1,link_mbps:Number.MIN_VALUE,efficiency:0.1}));
});
