QFR.ready("news").then(() => {
  let artistId = "all";
  function paint() {
    const items = [...QFR.news].sort((a,b)=>b.date.localeCompare(a.date)).filter((n)=>artistId==="all"||n.artistIds.includes(artistId));
    const feature = items[0], rest = items.slice(1);
    document.getElementById("app").innerHTML = `
      <section class="wrap py">
        <p class="kicker">Editorial</p>
        <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">News</h1>
        <p class="muted" style="max-width:36rem">Announcements, artist activity, releases, interviews, and transmissions from the QFR universe.</p>
        <select id="nf" style="max-width:18rem;margin-top:1.5rem"><option value="all">All artists</option>${QFR.artists.map(a=>`<option value="${a.id}" ${a.id===artistId?"selected":""}>${a.name}</option>`).join("")}</select>
      </section>
      ${feature?`<section class="wrap"><article class="latest-detail" style="min-height:22rem"><img src="${QFR.asset(feature.image)}" alt=""><div class="cap"><p class="tiny">${feature.category} · ${QFR.date(feature.date)}</p><h2 style="font-size:2.4rem">${feature.headline}</h2><p>${feature.body}</p></div></article></section>`:""}
      <section class="wrap py"><div class="cards three">${rest.map(n=>`<article class="card"><img class="cover" src="${QFR.asset(n.image)}" alt=""><div class="body"><p class="tiny">${n.category} · ${QFR.date(n.date)}</p><h3>${n.headline}</h3><p class="muted">${n.excerpt}</p></div></article>`).join("")}</div></section>`;
    document.getElementById("nf").onchange = (e) => { artistId = e.target.value; paint(); };
  }
  paint();
});
