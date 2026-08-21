QFR.ready("landing", { hideFooter: true }).then(() => {
  const s = QFR.site;
  const words = s.subtitleWords
    .map((w, i) => `${i ? "<span style='color:var(--accent)'>•</span>" : ""}<span class="subtitle-word">${w}</span>`)
    .join("");
  document.getElementById("app").innerHTML = `
    <section class="landing">
      <img class="bg" src="${QFR.asset("assets/images/backgrounds/landing.jpg")}" alt="">
      <div class="veil"></div>
      <canvas id="particles"></canvas>
      <div class="landing-inner">
        <div style="width:6rem;margin:0 auto;color:var(--accent)">${document.querySelector(".wordmark svg").outerHTML}</div>
        <p class="kicker" style="margin-top:2rem">QUANTUM FREQUENCY RECORDS</p>
        <h1 class="hero-title">${s.headline}</h1>
        <p class="subtitle">${words}</p>
        <a class="cta" href="${QFR.page("pages/home.html")}">Enter the Experience</a>
      </div>
    </section>`;
  const c = document.getElementById("particles");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const low = (navigator.hardwareConcurrency || 8) <= 4;
  if (!c || reduce || low) return;
  const ctx = c.getContext("2d");
  const dots = Array.from({ length: 42 }, () => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.3, s: Math.random() * 0.00018 + 0.00004, a: Math.random() * 0.35 + 0.08,
  }));
  const resize = () => { c.width = c.clientWidth * devicePixelRatio; c.height = c.clientHeight * devicePixelRatio; };
  resize(); addEventListener("resize", resize);
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const d of dots) {
      d.y -= d.s; if (d.y < -0.02) d.y = 1.02;
      ctx.beginPath(); ctx.fillStyle = `rgba(126,200,255,${d.a})`;
      ctx.arc(d.x * c.width, d.y * c.height, d.r * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
});
