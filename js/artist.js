QFR.ready("artists").then(() => {
  const id = QFR.param("id");
  const view = QFR.param("view") || "home";
  const artist = QFR.getArtist(id);
  const app = document.getElementById("app");
  if (!artist) {
    app.innerHTML = `<div class="wrap py" style="text-align:center"><h1>Artist not found</h1><p><a href="${QFR.page("pages/artists.html")}">Back to artists</a></p></div>`;
    return;
  }
  const VIEWS = ["home","news","members","releases","songs","videos","gallery","biography"];
  const songs = QFR.artistSongs(artist.id);
  const releases = QFR.artistReleases(artist.id);
  const news = QFR.artistNews(artist.id);
  const vids = QFR.artistVideos(artist.id);
  const shots = QFR.artistGallery(artist.id);
  let galCat = "All";
  const cats = ["All","Live Performances","Band Members","Studio","Events","Behind The Scenes"];

  function body() {
    if (view === "biography") return `<article style="max-width:42rem"><h2 style="font-size:2.4rem">Biography</h2><p>${artist.biography}</p><p class="muted">${artist.description}</p></article>`;
    if (view === "members") return `<h2 style="font-size:2.4rem">${artist.type==="solo"?"Artist":"Members"}</h2><div class="members">${artist.members.map((m)=>`<figure><img src="${QFR.asset(m.image)}" alt="${m.name}"><figcaption><p style="font-family:var(--font-display);font-size:1.5rem">${m.name}</p><p class="tiny">${m.role}</p><p class="muted">${m.bio}</p></figcaption></figure>`).join("")}</div>`;
    if (view === "releases") return `<div class="cards three">${releases.map((r)=>`<article class="card"><img class="sq" src="${QFR.asset(r.artwork)}" alt=""><div class="body"><p class="tiny">${r.type}</p><h3 style="font-size:1.5rem">${r.title}</h3><p class="muted">${QFR.date(r.date)}</p></div></article>`).join("")}</div>`;
    if (view === "songs") return `<ul class="list">${songs.map((s)=>{ const rel=QFR.getRelease(s.releaseId); return `<li class="row"><img src="${QFR.asset(s.artwork)}" alt=""><div style="flex:1;min-width:0"><b>${s.title}</b><div class="muted" style="font-size:.75rem">${rel?rel.title:""} · ${QFR.date(s.date)}</div></div><button class="btn btn-ghost" data-ly="${s.id}">Lyrics</button><button class="btn btn-line" data-play="${s.id}">Play</button></li><pre class="lyrics" id="ly-${s.id}" hidden>${s.lyrics}</pre>`; }).join("")}</ul>`;
    if (view === "videos") return `<div class="cards two">${vids.map((v)=>`<article class="card"><div style="position:relative;aspect-ratio:16/9"><img src="${QFR.asset(v.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;display:grid;place-items:center;background:color-mix(in srgb,var(--bg) 40%,transparent);font-size:.8rem;padding:1rem;text-align:center">Add a YouTube ID in data/videos.json to enable playback.</div></div><div class="body"><h3>${v.title}</h3><p class="muted">${QFR.date(v.date)}</p></div></article>`).join("")}</div>`;
    if (view === "news") return news.map((n)=>`<article class="card" style="display:grid;gap:1rem;margin-bottom:1rem"><img src="${QFR.asset(n.image)}" alt="" style="width:100%;max-height:220px;object-fit:cover"><div class="body"><p class="tiny">${n.category} · ${QFR.date(n.date)}</p><h3>${n.headline}</h3><p class="muted">${n.body}</p></div></article>`).join("");
    if (view === "gallery") {
      const list = galCat==="All"?shots:shots.filter((g)=>g.category===galCat);
      return `<div class="chips">${cats.map((c)=>`<button class="chip ${c===galCat?"on":""}" data-cat="${c}">${c}</button>`).join("")}</div><div class="gal" style="margin-top:1.5rem">${list.map((g)=>`<button type="button" data-lb="${QFR.asset(g.image)}"><img src="${QFR.asset(g.image)}" alt="${g.caption}" style="aspect-ratio:3/2;width:100%;object-fit:cover"></button>`).join("")}</div>`;
    }
    return `<div style="display:grid;gap:2.5rem"><div><p style="font-size:1.1rem">${artist.description}</p><p class="muted">${artist.biography}</p></div><aside class="card"><div class="body"><p class="tiny">At a glance</p><p>Hometown · ${artist.hometown}</p><p>Style · ${artist.genre}</p><p>Members · ${artist.members.length}</p><p>Signed · ${QFR.date(artist.signedDate)}</p></div></aside></div>`;
  }

  app.innerHTML = `
    <section class="artist-hero">
      <img class="cover" src="${QFR.asset(artist.hero)}" alt="">
      <div class="veil"></div>
      <div class="wrap inner">
        <div style="display:flex;gap:1.25rem;align-items:end">
          <img src="${QFR.asset(artist.logo)}" alt="" style="width:5.5rem;height:5.5rem;object-fit:cover;border:1px solid var(--border)">
          <div>
            <p class="tiny">${artist.genre}</p>
            <h1 style="font-size:clamp(2.6rem,7vw,4.5rem)">${artist.name}</h1>
            <p class="muted">${artist.hometown} · Est. ${artist.formed}</p>
          </div>
        </div>
        <button class="btn btn-primary" type="button" id="listen">Listen Now</button>
      </div>
    </section>
    <nav class="anav"><div class="wrap">${VIEWS.map((v)=>`<a class="${v===view?"on":""}" href="${QFR.artistUrl(artist.id,v)}">${v}</a>`).join("")}</div></nav>
    <div class="wrap py">${body()}</div>`;
  document.getElementById("listen").onclick = () => QFR.playRandom({ artistId: artist.id });
  document.querySelectorAll("[data-play]").forEach((b) => b.onclick = () => QFR.playSong(b.dataset.play));
  document.querySelectorAll("[data-ly]").forEach((b) => b.onclick = () => {
    const el = document.getElementById("ly-" + b.dataset.ly);
    el.hidden = !el.hidden;
  });
  document.querySelectorAll("[data-cat]").forEach((b) => b.onclick = () => { galCat = b.dataset.cat; /* re-render gallery only */ 
    const main = app.querySelector(".wrap.py");
    // rebuild gallery view
    location.search = `?id=${artist.id}&view=gallery&cat=` + encodeURIComponent(galCat);
  });
  document.querySelectorAll("[data-lb]").forEach((b) => b.onclick = () => {
    const lb = document.createElement("button");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${b.dataset.lb}" alt="" style="max-height:90vh;max-width:100%">`;
    lb.onclick = () => lb.remove();
    document.body.appendChild(lb);
  });
});
