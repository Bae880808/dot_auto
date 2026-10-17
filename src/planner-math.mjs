/** Normalized Number inputs only. UI parsing and units belong at the boundary. */
import {MAX, InputError, checked, multiply, divide} from './math.mjs';
export function nonnegative(value) {
  if(typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > MAX) throw new InputError('range');
  return value;
}
export function positive(value) { nonnegative(value); if(value === 0) throw new InputError('positive'); return value; }
export function count(value, allowZero=false) { nonnegative(value); if(!Number.isSafeInteger(value) || value < (allowZero?0:1)) throw new InputError('integer'); return value; }
export function fraction(value) { nonnegative(value); if(value>=1) throw new InputError('fraction'); return value; }
function efficiency(value) { positive(value); if(value>1) throw new InputError('efficiency'); return value; }
function add(a,b) { return checked(a+b); }
function signed(value) { if(!Number.isFinite(value)||Math.abs(value)>MAX) throw new InputError('range'); return value; }
function signedDivide(a,b) { return Math.sign(a)*divide(Math.abs(a),b); }
function signedMultiply(a,b) { return Math.sign(a)*multiply(Math.abs(a),b); }
function streamBytes({video_mbps,audio_mbps=0,duration_seconds,container_allowance=0}) {
  const rate=add(positive(video_mbps),nonnegative(audio_mbps));
  const payload=divide(multiply(multiply(rate,1e6),positive(duration_seconds)),8);
  return add(payload,multiply(payload,nonnegative(container_allowance)));
}
function rate(input) {
  const measured=input.measured_MBps !== undefined, link=input.link_mbps !== undefined;
  if(measured===link) throw new InputError('mode');
  const mode=input.mode ?? (measured?'measured':'link');
  if((mode==='measured')!==measured || !['measured','link'].includes(mode)) throw new InputError('mode');
  if(measured) {
    // An efficiency value in measured mode is rejected, never applied twice.
    if(input.efficiency!==undefined) throw new InputError('mode');
    const bytes_per_second=multiply(positive(input.measured_MBps),1e6);
    return {bytes_per_second,effective_mbps:multiply(input.measured_MBps,8),mode};
  }
  const effective_mbps=multiply(positive(input.link_mbps),efficiency(input.efficiency));
  return {bytes_per_second:divide(multiply(effective_mbps,1e6),8),effective_mbps,mode};
}
export function targetBitrate({target_bytes,duration_seconds,size_reserve=0,container_allowance=0,audio_mbps=0}) {
  const planned_bytes=multiply(positive(target_bytes),1-fraction(size_reserve));
  const denominator=multiply(positive(duration_seconds),add(1,nonnegative(container_allowance)));
  const video_mbps=signed(divide(divide(multiply(planned_bytes,8),denominator),1e6)-nonnegative(audio_mbps));
  return {video_mbps,planned_bytes,feasible:video_mbps>0};
}
export function transfer(input) {
  const r=rate(input), seconds=divide(positive(input.bytes),r.bytes_per_second);
  return {seconds,total_seconds:add(seconds,nonnegative(input.setup_seconds??0)),effective_mbps:r.effective_mbps,mode:r.mode};
}
export function deadline(input) {
  const r=rate(input), bytes=positive(input.bytes), window=nonnegative(input.window_seconds);
  const overhead=add(add(nonnegative(input.prep_seconds??0),nonnegative(input.post_seconds??0)),nonnegative(input.buffer_seconds??0));
  const available_transfer_seconds=signed(window-overhead), transfer_seconds=divide(bytes,r.bytes_per_second);
  const total_seconds=add(overhead,transfer_seconds), slack_seconds=signed(window-total_seconds);
  const required_effective_mbps=available_transfer_seconds>0?divide(divide(multiply(bytes,8),available_transfer_seconds),1e6):null;
  const required_link_mbps=required_effective_mbps!==null&&r.mode==='link'?divide(required_effective_mbps,input.efficiency):null;
  return {transfer_seconds,total_seconds,slack_seconds,available_transfer_seconds,required_effective_mbps,required_link_mbps,feasible:slack_seconds>=0,effective_mbps:r.effective_mbps,maximum_transferable_bytes:available_transfer_seconds>0?multiply(available_transfer_seconds,r.bytes_per_second):0};
}
export function recordingCapacity({capacity_bytes,reserved_fraction=0,video_mbps,audio_mbps=0,container_allowance=0,fixed_reserved_bytes=0}) {
  const usable_bytes=checked(multiply(positive(capacity_bytes),1-fraction(reserved_fraction))-nonnegative(fixed_reserved_bytes));
  const bytes_per_second=streamBytes({video_mbps,audio_mbps,container_allowance,duration_seconds:1});
  const seconds=divide(usable_bytes,bytes_per_second);
  return {usable_bytes,seconds,hours:divide(seconds,3600)};
}
export function multicam({rows,total_copies,free_space_fraction=0}) {
  if(!Array.isArray(rows)||!rows.length) throw new InputError('rows');
  const copies=count(total_copies), usable=1-fraction(free_space_fraction);
  const unique_bytes=rows.reduce((sum,row)=>add(sum,multiply(streamBytes(row),count(row.cameras))),0);
  const copied_bytes=multiply(unique_bytes,copies);
  return {unique_bytes,copied_bytes,required_capacity_bytes:divide(copied_bytes,usable),per_destination_capacity_bytes:divide(unique_bytes,usable)};
}
function rates(values,copies) {
  if(!Array.isArray(values)||values.length!==copies) throw new InputError('copies');
  return values.map(value=>multiply(positive(value),1e6));
}
export function offload(input) {
  const bytes=positive(input.bytes), copies=count(input.copies), mode=input.mode??'sequential';
  if(!['sequential','parallel'].includes(mode)) throw new InputError('mode');
  const reread=input.additional_source_reread??false;
  if(typeof reread!=='boolean') throw new InputError('mode');
  const setup=nonnegative(input.setup_seconds??0), verification=rates(input.destination_verify_MBps,copies);
  const sourceVerify=reread?multiply(positive(input.source_verify_MBps),1e6):null;
  let copy_seconds,verification_seconds,copy_rate_model;
  if(mode==='sequential') {
    let copyRates;
    if(input.measured_copy_MBps!==undefined) { copyRates=rates(input.measured_copy_MBps,copies); copy_rate_model='measured'; }
    else { const source=multiply(positive(input.source_MBps),1e6); copyRates=rates(input.destination_write_MBps,copies).map(write=>Math.min(source,write)); copy_rate_model='idealized_component_bottleneck'; }
    copy_seconds=copyRates.reduce((sum,r)=>add(sum,divide(bytes,r)),0);
    verification_seconds=verification.reduce((sum,r)=>add(sum,divide(bytes,r)),reread?divide(bytes,sourceVerify):0);
  } else {
    if(input.measured_copy_MBps!==undefined) throw new InputError('mode');
    const source=multiply(positive(input.source_MBps),1e6), writes=rates(input.destination_write_MBps,copies);
    const writeCap=multiply(positive(input.aggregate_destination_write_MBps),1e6), verifyCap=multiply(positive(input.aggregate_verification_read_MBps),1e6);
    copy_seconds=Math.max(divide(bytes,source),...writes.map(r=>divide(bytes,r)),divide(multiply(bytes,copies),writeCap));
    verification_seconds=Math.max(reread?divide(bytes,sourceVerify):0,...verification.map(r=>divide(bytes,r)),divide(multiply(bytes,add(copies,reread?1:0)),verifyCap));
    copy_rate_model='idealized_parallel_fan_out';
  }
  return {copy_seconds,verification_seconds,total_seconds:add(add(copy_seconds,verification_seconds),setup),destination_storage_bytes:multiply(bytes,copies),per_destination_bytes:bytes,mode,copy_rate_model,additional_source_reread:reread};
}
export function proxy(input) {
  const original_bytes=streamBytes({video_mbps:input.original_video_mbps,audio_mbps:input.original_audio_mbps,duration_seconds:input.duration_seconds,container_allowance:input.original_container_allowance??input.container_allowance});
  const proxy_bytes=streamBytes({video_mbps:input.proxy_video_mbps,audio_mbps:input.proxy_audio_mbps,duration_seconds:input.duration_seconds,container_allowance:input.proxy_container_allowance??input.container_allowance});
  const original_copies=count(input.original_copies??1,true), proxy_copies=count(input.proxy_copies??1,true);
  if(original_copies===0&&proxy_copies===0) throw new InputError('copies');
  const portable_reduction_bytes=signed(original_bytes-proxy_bytes);
  return {original_bytes,proxy_bytes,original_plus_proxy_bytes:add(original_bytes,proxy_bytes),portable_reduction_bytes,portable_reduction_percent:signedMultiply(signedDivide(portable_reduction_bytes,original_bytes),100),original_to_proxy_ratio:divide(original_bytes,proxy_bytes),retained_bytes:add(multiply(original_bytes,original_copies),multiply(proxy_bytes,proxy_copies))};
}
export function proxyTiming({original_bytes,proxy_bytes,measured_transcode_seconds,measured_effective_upload_mbps,sequential=true}) {
  if(sequential!==true) throw new InputError('mode');
  positive(original_bytes); positive(proxy_bytes);
  const transcode=nonnegative(measured_transcode_seconds), rate=divide(multiply(positive(measured_effective_upload_mbps),1e6),8);
  const original_upload_seconds=divide(original_bytes,rate), proxy_upload_seconds=divide(proxy_bytes,rate), proxy_total_seconds=add(transcode,proxy_upload_seconds);
  const difference=signed(original_bytes-proxy_bytes), maximum_transcode_seconds=signedDivide(difference,rate);
  const break_even_effective_mbps=difference>0&&transcode>0?divide(divide(multiply(difference,8),transcode),1e6):null;
  const break_even_status=break_even_effective_mbps!==null?'finite':difference>0?'proxy_faster_at_all_rates':difference===0&&transcode===0?'tie_at_all_rates':'original_faster_at_all_rates';
  return {original_upload_seconds,proxy_upload_seconds,proxy_total_seconds,net_time_saved_seconds:signed(original_upload_seconds-proxy_total_seconds),maximum_transcode_seconds,break_even_effective_mbps,break_even_status};
}
