import {readFile,stat,readdir} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import assert from 'node:assert/strict';
import {slugs} from '../src/planner-defs.mjs';
const origin=process.env.SITE_URL||'https://dot-auto.vercel.app';
const paths=['en/','zh/',...['en','zh'].flatMap(l=>slugs.map(s=>`${l}/${s}/`))];
const pages=new Map(await Promise.all(paths.map(async p=>[p,await readFile(`dist/${p}index.html`,'utf8')])));
const titles=new Set(),h1s=new Set(),checks=[];let links=0;
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const [path,html] of pages){
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];assert.ok(title);assert.ok(!titles.has(title),'duplicate title');titles.add(title);
 const h1=[...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];assert.equal(h1.length,1,`${path} H1 count`);assert.ok(!h1s.has(h1[0][1]),'duplicate H1');h1s.add(h1[0][1]);
 assert.ok(html.includes('name="description"'));assert.ok(html.includes('name="viewport"'));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,`${path} duplicate IDs`);
 const lang=path.split('/')[0],slug=path.split('/')[1],tool=slugs.includes(slug);
 assert.ok(html.includes(`<html lang="${lang==='en'?'en':'zh-Hans'}"`));
 assert.ok(html.includes(`<link rel="canonical" href="${origin}/${path}">`),`${path} canonical`);
 for(const [l,tag] of [['en','en'],['zh','zh-Hans'],['en','x-default']])assert.ok(html.includes(`<link rel="alternate" hreflang="${tag}" href="${origin}/${l}/${tool?slug+'/':''}">`),`${path} alternate ${tag}`);
 assert.ok(sitemap.includes(`<loc>${origin}/${path}</loc>`),`${path} sitemap`);
 if(tool){
  for(const id of ['result-panel','formula','instructions','examples','limitations','related','faq','sources'])assert.ok(ids.includes(id),`${path} missing module ${id}`);
  assert.ok(ids.includes(slug==='video-file-size'?'calculator':'planner-form'));
  assert.equal([...html.matchAll(/class="faq"/g)].length,4,`${path} FAQ count`);
  assert.ok([...html.matchAll(/data-(?:planner-)?example=/g)].length>=2,`${path} examples`);
  for(const m of html.matchAll(/<label for="([^"]+)"/g))assert.ok(ids.includes(m[1]),`${path} dangling label ${m[1]}`);
  for(const m of html.matchAll(/aria-describedby="([^"]+)"/g))for(const id of m[1].split(' '))assert.ok(ids.includes(id),`${path} dangling description ${id}`);
  const schemas=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);assert.deepEqual(schemas.map(x=>x['@type']),['WebApplication','BreadcrumbList']);
  assert.equal(schemas[0].url,`${origin}/${path}`);
  const peerLinks=new Set([...html.matchAll(/<a[^>]+href="([^"]+)"/g)].map(x=>x[1]).filter(u=>slugs.some(s=>s!==slug&&u===`/${lang}/${s}/`)));
  assert.ok(peerLinks.size>=3,`${path} needs >=3 different live peer tools`);
  checks.push({path,title,h1:h1[0][1],faqs:4,distinct_peer_tools:peerLinks.size,schema:true,canonical_hreflang:true,sitemap:true});
 }else for(const s of slugs)assert.ok(html.includes(`href="/${lang}/${s}/"`),`home missing ${s}`);
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const href=m[1];if(/^https?:/.test(href))continue;assert.ok(!href.startsWith('javascript:'));
  const [route,hash]=href.split('#'),target=route.startsWith('/')?route.slice(1):route?join(path,route):path;
  if(hash){const targetHtml=target===path?html:await readFile(`dist/${target.endsWith('/')?target+'index.html':target}`,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`${path} broken anchor ${href}`);}else if(target)await stat(`dist/${target.endsWith('/')?target+'index.html':target}`);links++;
 }
}
for(const name of await readdir('dist/assets'))if(name.endsWith('.mjs')){const body=await readFile('dist/assets/'+name,'utf8');for(const m of body.matchAll(/from\s*['"](\.\.?\/[^'"]+)['"]/g))await stat(join('dist/assets',dirname(name),m[1]));assert.ok(!/\b(fetch|XMLHttpRequest|sendBeacon)\s*\(/.test(body),'unexpected transmission');}
const qa=await readFile('dist/qa/index.html','utf8');assert.ok(qa.includes('noindex,nofollow'));assert.equal([...qa.matchAll(/<iframe/g)].length,3);assert.ok(qa.includes('qa-tool')&&qa.includes('qa-lang'));assert.ok(!sitemap.includes('/qa/'));
const css=await readFile('dist/assets/style.css','utf8');assert.ok(css.includes('focus-visible'));assert.ok(css.includes('prefers-reduced-motion'));
console.log(JSON.stringify({status:'PASS',localized_home_pages:2,localized_tool_pages:checks.length,unique_titles:titles.size,unique_h1:h1s.size,local_references_checked:links,broken_local_links:0,qa_frames:3,checks,notes:'Static checks only. Browser interaction, mobile overflow, screenshots and Lighthouse are separate gates.'},null,2));
