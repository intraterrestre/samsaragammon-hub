<script>
// ==========================
// Venenos ON/OFF — módulo simple
// ==========================
(function(){
  const CONFIG = {
    venenos: {
      ignorancia: { peso:1.10, nidanas:[1,2,3] },
      deseo:      { peso:1.20, nidanas:[7,8,9] },
      aversion:   { peso:1.15, nidanas:[6,10,11,12] }
    },
    reinos: {
      devas:{base:+2}, asuras:{base:+1}, humanos:{base:0},
      animales:{base:-1}, pretas:{base:-2}, infierno:{base:-3}
    },
    nidanas: {
      1:{peso:1.30, nombre:'1 Avidya'},
      2:{peso:1.10, nombre:'2 Samskara'},
      3:{peso:1.00, nombre:'3 Vijñana'},
      6:{peso:1.00, nombre:'6 Sparsha'},
      7:{peso:1.05, nombre:'7 Vedana'},
      8:{peso:1.25, nombre:'8 Trishna'},
      9:{peso:1.30, nombre:'9 Upadana'},
      10:{peso:1.15, nombre:'10 Bhava'},
      11:{peso:1.05, nombre:'11 Jati'},
      12:{peso:1.20, nombre:'12 Jara-Marana'}
    },
    bounds: { min:0.70, max:1.40 }
  };

  const state = { enabled:false, veneno:'ignorancia', reino:'humanos', nidanas:[] };
  const KEY = 'venenos@settings';
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY)||'null')||{}); } catch(e){}
  const save=()=>{ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} };

  function multiplicador(){
    if(!state.enabled) return 1.0;
    const v = CONFIG.venenos[state.veneno] || CONFIG.venenos.ignorancia;
    const r = CONFIG.reinos[state.reino]   || CONFIG.reinos.humanos;
    const pesos = (state.nidanas.length? state.nidanas : []).map(id => (CONFIG.nidanas[id]?.peso||1.0));
    const prom = pesos.length ? pesos.reduce((a,b)=>a+b,0)/pesos.length : 1.0;
    let val = v.peso * prom * (1 + (r.base||0)/10);
    val = Math.max(CONFIG.bounds.min, Math.min(CONFIG.bounds.max, val));
    return Math.round(val*1000)/1000;
  }

  // Helpers públicos
  window.venenosMultiplier = multiplicador;
  window.aplicarVenenos = (x)=> {
    const n = Number(x); if(Number.isNaN(n)) return x;
    return Math.round(n * multiplicador() * 1000)/1000;
  };
  window.Venenos = {
    toggle(){ state.enabled=!state.enabled; save(); renderPanel(); renderBtn(); },
    enable(){ state.enabled=true; save(); renderPanel(); renderBtn(); },
    disable(){ state.enabled=false; save(); renderPanel(); renderBtn(); },
    getState(){ return {...state}; }
  };

  // UI flotante
  const css = `
  .venenos-fab{position:fixed;right:16px;bottom:16px;z-index:99999}
  .venenos-btn{background:#0f3;color:#021;border:1px solid #063;border-radius:12px;padding:10px 14px;font-weight:700;cursor:pointer}
  .venenos-btn.off{background:#222;color:#bbb;border-color:#444}
  .venenos-panel{position:fixed;right:16px;bottom:68px;width:320px;max-width:92vw;background:rgba(0,20,10,.97);color:#e8fff4;border:1px solid #063;border-radius:14px;padding:14px;z-index:99998;display:none}
  .venenos-panel h3{margin:0 0 8px;font-size:16px;color:#9ff5c8}
  .v-row{display:flex;gap:10px;margin:8px 0}.v-col{flex:1}
  .venenos-panel label{display:block;font-size:13px;color:#cfeee0;margin:6px 0 2px}
  .venenos-panel select{width:100%;background:#07170f;color:#e8fff4;border:1px solid #134;border-radius:8px;padding:8px}
  .v-nidanas{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px}
  .v-nidanas label{display:flex;align-items:center;gap:8px;font-size:13px}
  .v-foot{display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:13px}
  .v-link{color:#0f8;text-decoration:none;border-bottom:1px dotted #0f8}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const fab = document.createElement('div'); fab.className='venenos-fab';
  const btn = document.createElement('button'); btn.className='venenos-btn'; fab.appendChild(btn);
  const panel = document.createElement('div'); panel.className='venenos-panel';
  document.body.appendChild(fab); document.body.appendChild(panel);

  function renderBtn(){
    btn.textContent = state.enabled ? 'VENENOS: ON' : 'VENENOS: OFF';
    btn.classList.toggle('off', !state.enabled);
  }
  btn.addEventListener('click', ()=>{ panel.style.display = (panel.style.display==='block')?'none':'block'; });

  function renderPanel(){
    const list = (CONFIG.venenos[state.veneno]||CONFIG.venenos.ignorancia).nidanas;
    panel.innerHTML = `
      <h3>Modo Venenoso</h3>
      <div class="v-row">
        <div class="v-col">
          <label>Veneno</label>
          <select id="v-ven">
            <option value="ignorancia">Ignorancia</option>
            <option value="deseo">Deseo / Apego</option>
            <option value="aversion">Aversión / Odio</option>
          </select>
        </div>
        <div class="v-col">
          <label>Reino</label>
          <select id="v-rei">
            <option value="devas">Devas</option>
            <option value="asuras">Asuras</option>
            <option value="humanos">Humanos</option>
            <option value="animales">Animales</option>
            <option value="pretas">Pretas</option>
            <option value="infierno">Infierno</option>
          </select>
        </div>
      </div>
      <div class="v-nidanas" id="v-nid"></div>
      <div class="v-foot">
        <div>Multiplicador: <span id="v-m">${multiplicador().toFixed(3)}</span></div>
        <button id="v-toggle" class="venenos-btn ${state.enabled?'':'off'}">${state.enabled?'ON':'OFF'}</button>
      </div>
      <div class="v-foot"><small>Límite 0.70–1.40</small><a href="https://sage-custard-592036.netlify.app/diccionario/" class="v-link" target="_blank">Diccionario</a></div>
    `;
    panel.querySelector('#v-ven').value = state.veneno;
    panel.querySelector('#v-rei').value = state.reino;
    panel.querySelector('#v-ven').addEventListener('change',(e)=>{ state.veneno=e.target.value; state.nidanas=[]; save(); renderPanel(); renderBtn(); });
    panel.querySelector('#v-rei').addEventListener('change',(e)=>{ state.reino=e.target.value; save(); updateMult(); });
    panel.querySelector('#v-toggle').addEventListener('click',()=>{ state.enabled=!state.enabled; save(); renderPanel(); renderBtn(); });
    renderNid();
    function renderNid(){
      const box = panel.querySelector('#v-nid');
      box.innerHTML = list.map(id=>{
        const n = CONFIG.nidanas[id]; const checked = state.nidanas.includes(id) ? 'checked' : '';
        return `<label><input type="checkbox" value="${id}" ${checked}> ${n.nombre} · peso ${n.peso}</label>`;
      }).join('');
      box.querySelectorAll('input[type="checkbox"]').forEach(ch=>{
        ch.addEventListener('change',(e)=>{
          const id = Number(e.target.value);
          if(e.target.checked){ state.nidanas.push(id); if(state.nidanas.length>3) state.nidanas.shift(); }
          else { state.nidanas = state.nidanas.filter(x=>x!==id); }
          save(); updateMult();
        });
      });
    }
    function updateMult(){ const el=panel.querySelector('#v-m'); if(el) el.textContent=multiplicador().toFixed(3); }
  }

  renderPanel(); renderBtn();

  // Modo DOM-auto (opcional): escala spans marcados
  const observer = new MutationObserver(()=>{
    document.querySelectorAll('[data-venenos-scale]').forEach(el=>{
      const base = Number(el.dataset.venenosScale);
      if(Number.isFinite(base)){ el.textContent = aplicarVenenos(base).toFixed(3); }
    });
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
})();
</script>