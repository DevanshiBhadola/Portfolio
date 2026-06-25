// GitHub Backend — stores progress as JSON in your repo
// Cross-device sync: any browser, any device, always up to date

const GH = {
  get token(){ return localStorage.getItem('gh_token')||''; },
  get owner(){ return localStorage.getItem('gh_owner')||''; },
  get repo(){  return localStorage.getItem('gh_repo')||''; },
  file: 'data/progress.json',
  branch: 'main',
  sha: null,
};

function ghConfigured(){ return !!(GH.token && GH.owner && GH.repo); }

function saveGHConfig(t,o,r){
  localStorage.setItem('gh_token',t);
  localStorage.setItem('gh_owner',o);
  localStorage.setItem('gh_repo',r);
}

async function ghRead(){
  if(!ghConfigured()) return null;
  try{
    const url=`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${GH.file}?ref=${GH.branch}&_=${Date.now()}`;
    const r=await fetch(url,{headers:{Authorization:`token ${GH.token}`,Accept:'application/vnd.github.v3+json'}});
    if(!r.ok) return null;
    const j=await r.json();
    GH.sha=j.sha;
    return JSON.parse(atob(j.content.replace(/\n/g,'')));
  }catch(e){ console.warn('gh read:',e); return null; }
}

async function ghWrite(data){
  if(!ghConfigured()) return false;
  try{
    const content=btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2))));
    const body={message:`Progress ${new Date().toISOString().slice(0,16)}`,content,branch:GH.branch};
    if(GH.sha) body.sha=GH.sha;
    const url=`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${GH.file}`;
    const r=await fetch(url,{method:'PUT',headers:{Authorization:`token ${GH.token}`,Accept:'application/vnd.github.v3+json','Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.ok){ const j=await r.json(); GH.sha=j.content?.sha||GH.sha; }
    return r.ok;
  }catch(e){ console.warn('gh write:',e); return false; }
}

let syncState='idle';
function setSyncState(s){
  syncState=s;
  const m={idle:{txt:'Not configured',col:'#606090'},syncing:{txt:'Syncing…',col:'#ff9a35'},ok:{txt:'✓ Synced',col:'#3df59e'},error:{txt:'Sync failed',col:'#ff3d55'},local:{txt:'Local only',col:'#606090'}};
  const info=m[s]||m.idle;
  document.querySelectorAll('.sync-badge').forEach(el=>{
    el.textContent=info.txt; el.style.color=info.col; el.style.borderColor=info.col+'44';
  });
}

const Sync={
  async load(){
    setSyncState('syncing');
    const remote=await ghRead();
    if(remote){ setSyncState('ok'); return remote; }
    setSyncState(ghConfigured()?'error':'local');
    try{ return JSON.parse(localStorage.getItem('hx_d')||'{}'); }catch{ return {}; }
  },
  async save(data){
    localStorage.setItem('hx_d',JSON.stringify(data));
    if(!ghConfigured()){ setSyncState('local'); return; }
    setSyncState('syncing');
    const ok=await ghWrite(data);
    setSyncState(ok?'ok':'error');
    if(ok){ const r=await ghRead(); if(r) GH.sha=GH.sha; }
  }
};
