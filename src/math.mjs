/** Pure, shared arithmetic. No DOM, networking or locale-dependent parsing. */
export const MAX = Number.MAX_SAFE_INTEGER;
export const units = Object.freeze({Mbps:1e6,kbps:1e3,s:1,min:60,h:3600,B:1,MB:1e6,GB:1e9,MiB:2**20,GiB:2**30});
export class InputError extends Error { constructor(code) { super(code); this.code=code; } }
export function parseNumber(raw, {positive=false}={}) {
  const s=String(raw).trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)) throw new InputError('number');
  const significant=s.replace('.','').replace(/^0+/,'').replace(/0+$/,'');
  if(significant.length>15) throw new InputError('precision');
  const n=Number(s);
  if(!Number.isFinite(n)||n>MAX||(n===0&&/[1-9]/.test(s))) throw new InputError('range');
  if(positive && n<=0) throw new InputError('positive');
  return n;
}
export function checked(n) { if(!Number.isFinite(n)||n<0||n>MAX) throw new InputError('range'); return n; }
export function multiply(a,b) { const n=checked(a*b); if(a!==0&&b!==0&&n===0) throw new InputError('range'); return n; }
export function divide(a,b) { const n=checked(a/b); if(a!==0&&n===0) throw new InputError('range'); return n; }
export function convert(value, from, to) {
  if(!Object.hasOwn(units,from)||!Object.hasOwn(units,to)) throw new InputError('unit');
  return divide(multiply(value,units[from]),units[to]);
}
export function fileSize({video,videoUnit='Mbps',audio,audioUnit='kbps',duration,durationUnit='min',allowance}) {
  const v=convert(parseNumber(video,{positive:true}),videoUnit,'Mbps');
  const a=convert(parseNumber(audio),audioUnit,'Mbps');
  const d=convert(parseNumber(duration,{positive:true}),durationUnit,'s');
  const h=divide(parseNumber(allowance),100);
  const videoBytes=divide(multiply(multiply(v,1e6),d),8);
  const audioBytes=divide(multiply(multiply(a,1e6),d),8);
  const payload=checked(videoBytes+audioBytes);
  const containerBytes=multiply(payload,h);
  const bytes=checked(payload+containerBytes);
  if(bytes===0) throw new InputError('range');
  return {bytes,GB:divide(bytes,1e9),GiB:divide(bytes,2**30),MB:divide(bytes,1e6),MiB:divide(bytes,2**20),videoBytes,audioBytes,containerBytes,videoMbps:v,audioMbps:a,durationSeconds:d,allowancePercent:h*100};
}
export function displayNumber(n,lang='en',digits=3) {
  if(n>0&&n<10**(-digits)) return `<${(10**(-digits)).toFixed(digits)}`;
  return new Intl.NumberFormat(lang==='zh'?'zh-CN':'en-US',{maximumFractionDigits:digits}).format(n);
}
