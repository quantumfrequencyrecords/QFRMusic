QFR.ready("videos").then(() => {
  let artistId="all", cat="all";
  const cats = [...new Set(QFR.videos.map(v=>v.category))];
  function paint() {
    const items = [...QFR.videos].sort((a,b)=>b.date.localeCompare(a.date)).filter(v => (artistId==="all"||v.artistId===artistId) && (cat==="all"||v.category===cat));
    const feature = items[0], rest = items.slice(1);
    const fa = feature ? QFR.getArtist(feature.artistId) : null;
    document.getElementById("app").innerHTML = `
      <section class="wrap py">
        <p class="kicker">Moving image</p>
        <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">Videos</h1>
        <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.5rem">
          <select id="va"><option value="all">All artists</option>${QFR.artists.map(a=>`<option value="${a.id}" ${a.id===artistId?"selected":""}>${a.name}</option>`).join("")}</select>
          <select id="vc"><option value="all">All categories</option>${cats.map(c=>`<option ${c===cat?"selected":""}>${c}</option>`).join("")}</select>
        </div>
      </section>
      ${feature?`<section class="wrap"><div class="card"><div style="position:relative;aspect-ratio:16/9"><img src="${QFR.asset(feature.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;display:grid;place-items:center;background:color-mix(in srgb,var(--bg) 45%,transparent)">Featured video placeholder. Add a YouTube ID in data/videos.json.</div></div><div class="body"><p class="tiny">${feature.category}</p><h2>${feature.title}</h2><p class="muted">${fa?.name||""} · ${QFR.date(feature.date)}</p></div></div></section>`:""}
      <section class="wrap py"><div class="cards three">${rest.map(v=>{const a=QFR.getArtist(v.artistId); return `<article class="card"><img class="cover" src="${QFR.asset(v.thumbnail)}" alt=""><div class="body"><p class="tiny">${v.category}</p><h3>${v.title}</h3><p class="muted">${a?.name||""} · ${QFR.date(v.date)}</p></div></article>`;}).join("")}</div></section>`;
    document.getElementById("va").onchange = e => { artistId=e.target.value; paint(); };
    document.getElementById("vc").onchange = e => { cat=e.target.value; paint(); };
  }
  paint();
});
