QFR.ready("gallery").then(() => {
  let artistId="all", cat="All";
  const cats=["All","Live Performances","Band Members","Studio","Events","Behind The Scenes"];
  function paint() {
    const items = QFR.gallery.filter(g => (artistId==="all"||g.artistId===artistId) && (cat==="All"||g.category===cat));
    document.getElementById("app").innerHTML = `
      <section class="wrap py">
        <p class="kicker">Visuals</p>
        <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">Gallery</h1>
        <p class="muted" style="max-width:36rem">Live performances, members, studio, events, and behind the scenes — JSON-driven.</p>
        <div class="chips" style="margin-top:1.5rem">${cats.map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}">${c}</button>`).join("")}</div>
        <select id="ga" style="max-width:18rem;margin-top:1rem"><option value="all">All artists</option>${QFR.artists.map(a=>`<option value="${a.id}" ${a.id===artistId?"selected":""}>${a.name}</option>`).join("")}</select>
      </section>
      <section class="wrap py"><div class="gal">${items.map(g=>{const a=QFR.getArtist(g.artistId); return `<button type="button" data-lb="${QFR.asset(g.image)}"><img src="${QFR.asset(g.image)}" alt="${g.caption}" style="aspect-ratio:3/2;width:100%;object-fit:cover"><span style="display:block;background:var(--surface);padding:.75rem"><span class="tiny">${g.category}</span><span style="display:block">${a?.name||""}</span></span></button>`;}).join("")}</div></section>`;
    document.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { cat=b.dataset.c; paint(); });
    document.getElementById("ga").onchange = e => { artistId=e.target.value; paint(); };
    document.querySelectorAll("[data-lb]").forEach(b => b.onclick = () => {
      const lb=document.createElement("button"); lb.className="lightbox";
      lb.innerHTML=`<img src="${b.dataset.lb}" alt="" style="max-height:90vh;max-width:100%">`;
      lb.onclick=()=>lb.remove(); document.body.appendChild(lb);
    });
  }
  paint();
});
