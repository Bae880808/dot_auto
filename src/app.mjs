import {fileSize,parseNumber,convert,displayNumber} from './math.mjs';
const t=JSON.parse(document.getElementById('ui-strings').textContent);
const $=id=>document.getElementById(id),form=$('calculator'),fields=['video','audio','duration','allowance'];
const f=n=>displayNumber(n,t.lang);
const unitState=Object.fromEntries(['video','audio','duration'].map(id=>[id,$(id+'-unit').value]));
let latest=null,announceTimer;
function read(){return Object.fromEntries([...fields.map(id=>[id,$(id).value]),...['video','audio','duration'].map(id=>[id+'Unit',$(id+'-unit').value])]);}
function clearErrors(){for(const id of fields){$(id).removeAttribute('aria-invalid');$(id+'-error').textContent='';} $('form-error').hidden=true;}
function render({announce=false,focus=false}={}){
 clearTimeout(announceTimer);$('result-announcement').textContent='';
 clearErrors(); let invalid=false;
 for(const id of fields){try{parseNumber($(id).value,{positive:id==='video'||id==='duration'});}catch(e){invalid=true;$(id).setAttribute('aria-invalid','true');$(id+'-error').textContent=t.errors[e.code]||t.errors.number;}}
 try {if(invalid)throw Error('fields');latest=fileSize(read());}catch(e){latest=null;$('result-content').hidden=true;$('result-empty').hidden=false;$('form-error').hidden=false;$('form-error').textContent=e.message==='fields'?t.errorTitle:(t.errors[e.code]||t.errors.range);if(focus){const bad=form.querySelector('[aria-invalid="true"]');(bad||$('video')).focus();}return;}
 $('result-content').hidden=false;$('result-empty').hidden=true;
 $('result-gb').textContent=f(latest.GB);$('result-gib').textContent=f(latest.GiB);$('result-bytes').textContent=displayNumber(latest.bytes,t.lang,3);
 for(const [id,key] of [['video','videoBytes'],['audio','audioBytes'],['container','containerBytes']])$('part-'+id).textContent=latest[key]>0&&latest[key]/1e9===0?'<0.001':f(latest[key]/1e9);
 $('assumptions').textContent=`${f(latest.videoMbps)} Mbps + ${f(latest.audioMbps*1000)} kbps · ${f(latest.durationSeconds)} s · ${f(latest.allowancePercent)}%`;
 $('allowance-warning').hidden=latest.allowancePercent<=20;$('allowance-warning').textContent=t.largeAllowance;
 $('calculation-text').textContent=`(${latest.videoMbps} × 1,000,000 + ${latest.audioMbps} × 1,000,000) × ${latest.durationSeconds} ÷ 8 × (1 + ${latest.allowancePercent} ÷ 100) ≈ ${latest.bytes} B = ${latest.GB} GB ≈ ${latest.GiB} GiB`;
 $('copy-status').textContent='';
 if(announce){const announcement=`${t.result}: ${f(latest.GB)} GB, ${f(latest.GiB)} GiB`;announceTimer=setTimeout(()=>{$('result-announcement').textContent=announcement;},250);}
 if(focus)$('result-panel').focus();
}
form.addEventListener('submit',e=>{e.preventDefault();render({announce:true,focus:true});});
form.addEventListener('input',e=>{if(e.target.tagName==='INPUT')render({announce:true});});
for(const id of ['video','audio','duration'])$(id+'-unit').addEventListener('change',()=>{
 const next=$(id+'-unit').value;
 try {const n=parseNumber($(id).value,{positive:id!=='audio'});const changed=convert(n,unitState[id],next);$(id).value=plain(changed);}catch{ /* Invalid text is kept for correction, never coerced to zero. */ }
 unitState[id]=next;render({announce:true});
});
function plain(n){return n.toLocaleString('en-US',{useGrouping:false,maximumSignificantDigits:15});}
form.addEventListener('reset',()=>{setTimeout(()=>{for(const id of Object.keys(unitState))unitState[id]=$(id+'-unit').value;render({announce:true});},0);});
for(const button of document.querySelectorAll('[data-example]'))button.addEventListener('click',()=>{
 const second=button.dataset.example==='1';for(const [id,value] of Object.entries(second?{video:'100',audio:'2.304',duration:'1',allowance:'1'}:{video:'20',audio:'320',duration:'10',allowance:'2'}))$(id).value=value;
 for(const [id,value] of Object.entries({video:'Mbps',audio:second?'Mbps':'kbps',duration:second?'h':'min'})){$(id+'-unit').value=value;unitState[id]=value;}
 render({announce:true});$('main').scrollIntoView({behavior:'auto'});$('video').focus({preventScroll:true});
});
$('copy').addEventListener('click',async()=>{if(!latest)return;try{await navigator.clipboard.writeText(`${t.result}\n${$('calculation-text').textContent}\n${$('assumptions').textContent}\n${t.lang==='en'?'Planning estimate, not a guarantee.':'估算结果，不作保证。'}`);$('copy-status').textContent=t.copied;}catch{$('copy-status').textContent=t.copyFailed;document.querySelector('.calculation-text').open=true;}});
render();
