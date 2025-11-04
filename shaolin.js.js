<!-- js/efectos-shaolin.js -->
<script>
(function(){
  // Si no hay DOM, salgo
  if (!document || !document.body) return;

  // Catálogo de efectos (nombres tal cual están en audio/shaolin/)
  const efectosShaolin = [
    "alone-samurai-in-mountain-430719.mp3",
    "asiatic-intro_3-283719.mp3",
    "birds-chirping-67827.mp3",
    "China-cymbal-transition-sound-effect.mp3",
    "chinese-beat-190047.mp3",
    "chinese-flute-hulusi-76116.mp3",
    "chinese-ident-transition-1-283708.mp3",
    "CHINITO COLTICO.mp3",
    "dizi-flute-02-72563.mp3",
    "fireworks-07-419025.mp3",
    "Gong-sound.mp3",
    "gongfeb11-91065.mp3",
    "INTROCHINO.mp3",
    "music-transition-ancient-back-etlx-247347.mp3",
    "spike-one-31462.mp3",
    "tibetan-buddhist-drum-314994.mp3"
  ];

  // Botón fijo
  const btn = document.createElement("button");
  btn.textContent = "🎛️ Efecto Shaolin";
  Object.assign(btn.style, {
    position:"fixed", left:"16px", bottom:"16px", zIndex:9999,
    background:"#031b14", border:"2px solid #00ff7b", borderRadius:"999px",
    color:"#00ff7b", fontWeight:"800", padding:"10px 18px", cursor:"pointer",
    boxShadow:"0 0 15px rgba(0,255,150,.4)"
  });
  // Animación breve al sonar
  const pulse = ()=>{
    btn.style.boxShadow = "0 0 20px rgba(0,255,150,.9)";
    setTimeout(()=> btn.style.boxShadow = "0 0 15px rgba(0,255,150,.4)", 250);
  };

  document.body.appendChild(btn);

  // Reproducción aleatoria
  btn.addEventListener("click", ()=>{
    const pick = efectosShaolin[(Math.random()*efectosShaolin.length)|0];
    const audio = new Audio(`audio/shaolin/${pick}`);
    audio.volume = 0.8;
    audio.play().then(pulse).catch(()=>{ /* usuario aún no interactuó */ });
  });
})();
</script>