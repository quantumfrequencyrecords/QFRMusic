QFR.ready("music").then(() => {
  let artistId="all", genre="all", releaseId="all", year="all";
  const years = [...new Set(QFR.songs.map(s=>s.date.slice(0,4)))].sort().reverse();
  const genres = [...new Set(QFR.artists.flatMap(a=>[a.genre,...a.genres]))].sort();
  function paint() {
    const list = QFR.songs.filter(s => {
      if (artistId!=="all" && s.artistId!==artistId) return false;
      if (releaseId!=="all" && s.releaseId!==releaseId) return false;
      if (year!=="all" && !s.date.startsWith(year)) return false;
      if (genre!=="all") {
        const a = QFR.getArtist(s.artistId);
        if (!(s.genre===genre || a?.genre===genre || a?.genres.includes(genre))) return false;
      }
      return true;
    });
    const rels = QFR.releases.filter(r => (artistId==="all"||r.artistId===artistId) && (year==="all"||r.date.startsWith(year)));
    document.getElementById("app").innerHTML = `
      <section class="wrap py">
        <p class="kicker">Catalog</p>
        <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">Music</h1>
        <p class="muted" style="max-width:36rem">Filter by artist, genre, release, and year. Play authorized local audio in the persistent player.</p>
        <div style="display:grid;gap:.75rem;margin-top:1.5rem" class="cards" id="filters">
          <label class="field">Artist<select id="fa"><option value="all">All artists</option>${QFR.artists.map(a=>`<option value="${a.id}" ${a.id===artistId?"selected":""}>${a.name}</option>`).join("")}</select></label>
          <label class="field">Genre<select id="fg"><option value="all">All genres</option>${genres.map(g=>`<option ${g===genre?"selected":""}>${g}</option>`).join("")}</select></label>
          <label class="field">Release<select id="fr"><option value="all">All releases</option>${rels.map(r=>`<option value="${r.id}" ${r.id===releaseId?"selected":""}>${r.title}</option>`).join("")}</select></label>
          <label class="field">Year<select id="fy"><option value="all">All years</option>${years.map(y=>`<option ${y===year?"selected":""}>${y}</option>`).join("")}</select></label>
        </div>
      </section>
      <section class="wrap py"><ul class="list">${list.map(s=>{const a=QFR.getArtist(s.artistId); const r=QFR.getRelease(s.releaseId); return `<li class="row"><img src="${QFR.asset(s.artwork)}" alt=""><div style="flex:1;min-width:0"><b>${s.title}</b><div class="muted" style="font-size:.75rem">${a?.name||""} · ${r?.title||""} · ${QFR.date(s.date)}</div></div><button class="btn btn-ghost" data-ly="${s.id}">Lyrics</button><button class="btn btn-line" data-play="${s.id}">Play</button></li><pre class="lyrics" id="ly-${s.id}" hidden>${s.lyrics}</pre>`;}).join("")}</ul></section>`;
    document.getElementById("filters").style.gridTemplateColumns = "repeat(auto-fit,minmax(12rem,1fr))";
    document.getElementById("fa").onchange = e => { artistId=e.target.value; paint(); };
    document.getElementById("fg").onchange = e => { genre=e.target.value; paint(); };
    document.getElementById("fr").onchange = e => { releaseId=e.target.value; paint(); };
    document.getElementById("fy").onchange = e => { year=e.target.value; paint(); };
    document.querySelectorAll("[data-play]").forEach(b => b.onclick = () => QFR.playSong(b.dataset.play));
    document.querySelectorAll("[data-ly]").forEach(b => b.onclick = () => { const el=document.getElementById("ly-"+b.dataset.ly); el.hidden=!el.hidden; });
  }
  paint();
});
