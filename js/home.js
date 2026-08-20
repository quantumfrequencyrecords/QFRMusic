QFR.ready("home").then(() => {
  const s = QFR.site;
  const signing = QFR.getArtist(s.latest.signingArtistId);
  const album = QFR.getRelease(s.latest.albumReleaseId);
  const single = QFR.getRelease(s.latest.singleReleaseId);
  const newsItem = QFR.news.find((n) => n.id === s.latest.newsId) || QFR.news[0];
  const details = {
    signing: { kicker: "Latest Signing", title: signing.name, meta: `${signing.genre} · ${signing.hometown}`, body: signing.description, image: signing.hero, href: QFR.artistUrl(signing.id) },
    album: { kicker: "Latest Album", title: album.title, meta: `${QFR.getArtist(album.artistId).name} · ${album.date}`, body: album.description, image: album.artwork, href: QFR.page("pages/music.html") },
    single: { kicker: "Latest Single", title: single.title, meta: `${QFR.getArtist(single.artistId).name} · ${single.date}`, body: single.description, image: single.artwork, href: QFR.page("pages/music.html") },
    news: { kicker: "Latest News", title: newsItem.headline, meta: `${QFR.date(newsItem.date)} · ${newsItem.category}`, body: newsItem.excerpt, image: newsItem.image, href: QFR.page("pages/news.html") },
  };
  const keys = Object.keys(details);
  let latest = "signing";
  let tf = "month";
  const tfLabel = { week: "This Week", month: "This Month", ytd: "Year to Date" };

  function top(kind) {
    if (kind === "artist") return [...QFR.artists].sort((a, b) => b.stats[tf] - a.stats[tf])[0];
    if (kind === "song") return [...QFR.songs].sort((a, b) => b.streams[tf] - a.streams[tf])[0];
    return [...QFR.videos].sort((a, b) => b.views[tf] - a.views[tf])[0];
  }

  function paint() {
    const d = details[latest];
    const a = top("artist"), song = top("song"), vid = top("video");
    document.getElementById("app").innerHTML = `
      <section class="wrap hero-split">
        <div>
          <p class="kicker">The Label</p>
          <h1 style="font-size:clamp(2.8rem,7vw,4.5rem);margin-top:.75rem">${s.homeHeading}</h1>
          <p class="muted" style="margin-top:1.25rem;max-width:28rem">${s.tagline}</p>
        </div>
        <div style="position:relative">
          <img class="hairline" src="${QFR.asset("assets/images/backgrounds/music-studio.jpg")}" alt="Studio">
        </div>
      </section>
      <div class="wrap"><div class="freq"></div></div>
      <section class="wrap section">
        <p class="kicker">Mission</p>
        <h2 style="font-size:2.5rem;margin-top:.5rem">How we move</h2>
        <div class="mission">${s.missionGrid.map((t) => `<button type="button" data-m="${t.id}"><span style="font-family:var(--font-display);font-size:1.6rem">${t.label}</span><span class="note">${t.note}</span></button>`).join("")}</div>
      </section>
      <div class="wrap"><div class="freq"></div></div>
      <section class="wrap section">
        <p class="kicker">Latest</p>
        <h2 style="font-size:2.5rem;margin-top:.5rem">Right now</h2>
        <div class="latest-grid">
          <div class="latest-btns">${keys.map((k) => `<button type="button" data-l="${k}" class="${k===latest?"on":""}"><span class="tiny">${details[k].kicker}</span><span style="display:block;font-family:var(--font-display);font-size:1.3rem;margin-top:.4rem">${details[k].title}</span></button>`).join("")}</div>
          <a class="latest-detail" href="${d.href}">
            <img src="${QFR.asset(d.image)}" alt="">
            <div class="cap"><p class="tiny">${d.kicker}</p><h3 style="font-size:2rem">${d.title}</h3><p class="muted">${d.meta}</p><p>${d.body}</p></div>
          </a>
        </div>
      </section>
      <div class="wrap"><div class="freq"></div></div>
      <section class="wrap section">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;align-items:end">
          <div><p class="kicker">Hot & Trending</p><h2 style="font-size:2.5rem;margin-top:.5rem">What is moving</h2></div>
          <div class="seg">${["week","month","ytd"].map((k)=>`<button data-tf="${k}" class="${k===tf?"on":""}">${k==="ytd"?"YTD":k}</button>`).join("")}</div>
        </div>
        <div class="trend">
          <a href="${QFR.artistUrl(a.id)}"><img src="${QFR.asset(a.image)}" alt=""><div class="cap"><p class="tiny">Most Streamed Artist</p><p style="font-family:var(--font-display);font-size:1.6rem">${a.name}</p><p>${QFR.fmt(a.stats[tf])} streams <span class="muted">${tfLabel[tf]}</span></p></div></a>
          <a href="${QFR.page("pages/music.html")}" data-play="${song.id}"><img src="${QFR.asset(song.artwork)}" alt=""><div class="cap"><p class="tiny">Most Streamed Song</p><p style="font-family:var(--font-display);font-size:1.6rem">${song.title}</p><p>${QFR.fmt(song.streams[tf])} streams <span class="muted">${tfLabel[tf]}</span></p></div></a>
          <a href="${QFR.page("pages/videos.html")}"><img src="${QFR.asset(vid.thumbnail)}" alt=""><div class="cap"><p class="tiny">Most Viewed Video</p><p style="font-family:var(--font-display);font-size:1.6rem">${vid.title}</p><p>${QFR.fmt(vid.views[tf])} views <span class="muted">${tfLabel[tf]}</span></p></div></a>
        </div>
      </section>
      ${QFR.newsletterHTML()}`;
    document.querySelectorAll("[data-m]").forEach((b) => b.onclick = () => b.classList.toggle("open"));
    document.querySelectorAll("[data-l]").forEach((b) => b.onclick = () => { latest = b.dataset.l; paint(); });
    document.querySelectorAll("[data-tf]").forEach((b) => b.onclick = () => { tf = b.dataset.tf; paint(); });
    document.querySelectorAll("[data-play]").forEach((b) => b.addEventListener("click", () => QFR.playSong(b.dataset.play)));
    const nl = document.getElementById("nl-form");
    if (nl) nl.onsubmit = (e) => { e.preventDefault(); nl.hidden = true; document.getElementById("nl-done").hidden = false; };
  }
  paint();
  setInterval(() => { latest = keys[(keys.indexOf(latest)+1)%keys.length]; paint(); }, 5200);
});
