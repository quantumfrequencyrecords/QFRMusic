QFR.ready("about").then(() => {
  const a = QFR.site.about;
  const sections = [
    ["Philosophy", a.philosophy],
    ["Mission", a.mission],
    ["Origin", a.origin],
    ["Artist first", a.artistFirst],
    ["Beyond genre", a.beyondGenre],
    ["Instruments, including machines", a.ai],
    ["Future vision", a.future],
  ];
  document.getElementById("app").innerHTML = `
    <section style="position:relative;overflow:hidden">
      <img src="${QFR.asset("assets/images/backgrounds/about.jpg")}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5">
      <div style="position:absolute;inset:0;background:linear-gradient(transparent,var(--bg))"></div>
      <div class="wrap" style="position:relative;padding:5rem 1.25rem">
        <p class="kicker">The label</p>
        <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">About Us</h1>
        <p style="max-width:36rem;margin-top:1.25rem">${QFR.site.tagline}</p>
      </div>
    </section>
    ${sections.map(([t,b],i)=>`<section class="wrap" style="max-width:42rem;padding:2.5rem 1.25rem">${i?'<div class="freq" style="margin-bottom:2.5rem"></div>':''}<h2 style="font-size:2.2rem">${t}</h2><p class="muted">${b}</p></section>`).join("")}`;
});
