QFR.ready("artists").then(() => {
  const id = QFR.param("id");
  let view = QFR.param("view") || "profile";
  if (view === "releases" || view === "songs") view = "music";
  if (view === "home" || view === "biography") view = "profile";
  const artist = QFR.getArtist(id);
  const app = document.getElementById("app");
  if (!artist) {
    app.innerHTML = `<div class="wrap py" style="text-align:center"><h1>Artist not found</h1><p><a href="${QFR.page("pages/artists.html")}">Back to artists</a></p></div>`;
    return;
  }

  const VIEWS = [
    { id: "profile", label: "Profile" },
    { id: "news", label: "News" },
    { id: "music", label: "Music" },
    { id: "videos", label: "Videos" },
    { id: "members", label: "Members" },
    { id: "gallery", label: "Gallery" },
    { id: "merch", label: "Merch" },
  ];
  const songs = QFR.artistSongs(artist.id);
  const releases = QFR.artistReleases(artist.id);
  const news = QFR.artistNews(artist.id);
  const vids = QFR.artistVideos(artist.id);
  const shots = QFR.artistGallery(artist.id);
  let galCat = QFR.param("cat") || "All";
  const cats = ["All", "Live Performances", "Band Members", "Studio", "Events", "Behind The Scenes"];
  const dna = QFR.artistDna(artist.id);
  const latestRel = releases[0];
  const latestNews = news[0];
  const topSongs = [...songs].sort((a, b) => b.streams.ytd - a.streams.ytd).slice(0, 5);
  const featureVid = vids[0];

  function dnaSVG() {
    const cx = 80, cy = 80, r = 56;
    const pts = dna
      .map((d, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / dna.length;
        const rr = (d.value / 100) * r;
        return `${cx + Math.cos(ang) * rr},${cy + Math.sin(ang) * rr}`;
      })
      .join(" ");
    const rings = [0.35, 0.65, 1]
      .map((s) => {
        const p = dna
          .map((_, i) => {
            const ang = -Math.PI / 2 + (i * 2 * Math.PI) / dna.length;
            return `${cx + Math.cos(ang) * r * s},${cy + Math.sin(ang) * r * s}`;
          })
          .join(" ");
        return `<polygon points="${p}" fill="none" stroke="currentColor" opacity="0.25"/>`;
      })
      .join("");
    const axes = dna
      .map((_, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / dna.length;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="currentColor" opacity="0.25"/>`;
      })
      .join("");
    return `<svg viewBox="0 0 160 160" style="width:13rem;height:13rem;margin:1rem auto 0;display:block;color:var(--accent)">${rings}${axes}<polygon points="${pts}" fill="currentColor" opacity="0.22" stroke="currentColor"/></svg>`;
  }

  function videoBlock(v) {
    if (v.youtubeId) {
      return `<iframe title="${v.title}" style="aspect-ratio:16/9;width:100%;border:0" src="https://www.youtube-nocookie.com/embed/${v.youtubeId}" allowfullscreen></iframe>`;
    }
    return `<div style="position:relative;aspect-ratio:16/9"><img src="${QFR.asset(v.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;display:grid;place-items:center;background:color-mix(in srgb,var(--bg) 40%,transparent);font-size:.8rem;padding:1rem;text-align:center">Add a YouTube ID in data/videos.json to enable playback.</div></div>`;
  }

  function body() {
    if (view === "members") {
      return `<h2 style="font-size:2.4rem">${artist.type === "solo" ? "Artist" : "Members"}</h2>
        <div class="members">${artist.members
          .map(
            (m) => `<figure><img src="${QFR.asset(m.image)}" alt="${m.name}"><figcaption><p style="font-family:var(--font-display);font-size:1.5rem">${m.name}</p><p class="tiny">${m.role}</p><p class="muted" style="margin-top:.5rem">${m.bio}</p></figcaption></figure>`,
          )
          .join("")}</div>`;
    }
    if (view === "music") {
      return `<div>
        <h2 style="font-size:2.4rem">Releases</h2>
        <div class="cards three" style="margin-top:1.5rem">${releases
          .map(
            (r) => `<article class="card"><img class="sq" src="${QFR.asset(r.artwork)}" alt=""><div class="body"><p class="tiny">${r.type}</p><h3 style="font-size:1.5rem">${r.title}</h3><p class="muted">${QFR.date(r.date)}</p></div></article>`,
          )
          .join("")}</div>
        <h2 style="font-size:2.4rem;margin-top:3rem">Songs & lyrics</h2>
        <ul class="list" style="margin-top:1.5rem">${songs
          .map((s) => {
            const rel = QFR.getRelease(s.releaseId);
            return `<li class="row"><img src="${QFR.asset(s.artwork)}" alt=""><div style="flex:1;min-width:0"><b>${s.title}</b><div class="muted" style="font-size:.75rem">${rel ? rel.title : ""} · ${QFR.date(s.date)}</div></div><button class="btn btn-ghost" data-ly="${s.id}">Lyrics</button><button class="play-mini" data-play="${s.id}" aria-label="Play">▶</button></li><pre class="lyrics" id="ly-${s.id}" hidden>${s.lyrics}</pre>`;
          })
          .join("")}</ul>
      </div>`;
    }
    if (view === "videos") {
      return `<div class="cards two">${vids
        .map(
          (v) => `<article class="card">${videoBlock(v)}<div class="body"><h3>${v.title}</h3><p class="muted">${QFR.date(v.date)} · ${QFR.fmtCompact(v.views.month)} views</p></div></article>`,
        )
        .join("")}</div>`;
    }
    if (view === "news") {
      if (!news.length) return `<p class="muted">No artist news yet.</p>`;
      return news
        .map(
          (n) => `<article class="card" style="display:grid;gap:1rem;margin-bottom:1rem" class="news-row"><img src="${QFR.asset(n.image)}" alt="" style="width:100%;max-height:220px;object-fit:cover"><div class="body"><p class="tiny">${n.category} · ${QFR.date(n.date)}</p><h3>${n.headline}</h3><p class="muted">${n.body}</p></div></article>`,
        )
        .join("");
    }
    if (view === "gallery") {
      const list = galCat === "All" ? shots : shots.filter((g) => g.category === galCat);
      return `<div class="chips">${cats
        .map((c) => `<button class="chip ${c === galCat ? "on" : ""}" data-cat="${c}">${c}</button>`)
        .join("")}</div>
        <div class="gal" style="margin-top:1.5rem">${list
          .map(
            (g) => `<button type="button" data-lb="${QFR.asset(g.image)}"><img src="${QFR.asset(g.image)}" alt="${g.caption}" style="aspect-ratio:3/2;width:100%;object-fit:cover"></button>`,
          )
          .join("")}</div>`;
    }
    if (view === "merch") {
      return `<div class="card" style="text-align:center;padding:4rem 1.5rem">
        <p class="kicker">Coming soon</p>
        <h2 style="font-size:2.4rem;margin-top:.75rem">Merch for ${artist.name}</h2>
        <p class="muted" style="max-width:28rem;margin:1rem auto 0">Artist products will filter into the store when it opens. Until then, this page is the placeholder.</p>
        <p style="margin-top:2rem"><a class="btn btn-primary" href="${QFR.page("pages/store.html")}">Visit the store</a></p>
      </div>`;
    }
    return `<div style="display:grid;gap:2.5rem">
      <div class="profile-split">
        <div>
          <p class="tiny">About ${artist.name}</p>
          <p style="margin-top:.75rem;font-size:1.1rem;line-height:1.7">${artist.description}</p>
          <p class="muted" style="margin-top:1rem;line-height:1.7">${artist.biography}</p>
        </div>
        <aside class="card"><div class="body">
          <p class="tiny">Frequency DNA</p>
          ${dnaSVG()}
          <ul style="list-style:none;padding:0;margin:1rem 0 0;display:grid;grid-template-columns:1fr 1fr;gap:.5rem;font-size:.8rem" class="muted">
            ${dna.map((d) => `<li style="display:flex;justify-content:space-between"><span>${d.label}</span><span style="color:var(--fg)">${d.value}</span></li>`).join("")}
          </ul>
        </div></aside>
      </div>
      <div class="cards three">
        ${
          latestRel
            ? `<article class="card"><p class="tiny" style="padding:1rem 1rem 0">Latest release</p><img class="sq" src="${QFR.asset(latestRel.artwork)}" alt=""><div class="body"><h3 style="font-size:1.5rem">${latestRel.title}</h3><p class="muted">${latestRel.type} · ${QFR.date(latestRel.date)}</p></div></article>`
            : ""
        }
        ${
          latestNews
            ? `<article class="card"><div class="body"><p class="tiny">Latest news</p><h3 style="font-size:1.5rem;margin-top:.75rem">${latestNews.headline}</h3><p class="muted" style="margin-top:.5rem">${latestNews.excerpt}</p><p class="muted" style="margin-top:.75rem;font-size:.8rem">${QFR.date(latestNews.date)}</p></div></article>`
            : ""
        }
        <article class="card"><div class="body">
          <p class="tiny">Connect</p>
          <p class="muted" style="margin-top:.75rem">Follow the label channels for ${artist.name} drops, or share this page.</p>
          ${QFR.socialIcons("social-row")}
          <button class="btn btn-line" type="button" id="share" style="margin-top:1rem">Share ${artist.name}</button>
        </div></article>
      </div>
      <div class="profile-split">
        <div>
          <p class="tiny">Top songs</p>
          <ul class="list" style="margin-top:1rem">${topSongs
            .map(
              (s, i) => `<li class="row"><span class="muted" style="width:1.25rem">${i + 1}</span><img src="${QFR.asset(s.artwork)}" alt=""><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.title}</span><span class="muted" style="font-size:.75rem">${QFR.fmtCompact(s.streams.ytd)}</span><button class="play-mini" data-play="${s.id}" aria-label="Play">▶</button></li>`,
            )
            .join("")}</ul>
        </div>
        ${
          featureVid
            ? `<div><p class="tiny">Featured video</p><div class="card" style="margin-top:1rem">${videoBlock(featureVid)}<p style="font-family:var(--font-display);font-size:1.3rem;padding:0.75rem">${featureVid.title}</p></div></div>`
            : ""
        }
      </div>
    </div>`;
  }

  app.innerHTML = `
    ${QFR.tickerHTML()}
    <section class="artist-hero">
      <img class="cover" src="${QFR.asset(artist.hero)}" alt="">
      <div class="veil"></div>
      <div class="wrap inner">
        <div>
          <p class="tiny">${(artist.genres || [artist.genre]).join(" · ")}</p>
          <h1 class="hero-title" style="margin-top:.4rem">${artist.name}</h1>
          <p style="margin-top:.75rem;max-width:32rem;color:color-mix(in srgb,var(--fg) 85%, transparent)">“${artist.tagline || artist.description}”</p>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.5rem">
            <button class="btn btn-primary" type="button" id="listen">Listen Now</button>
            <button class="btn btn-ghost" type="button" id="share-top">Share</button>
          </div>
        </div>
        <aside class="stat-grid" style="min-width:14rem">
          <div class="stat-box"><p class="tiny">Hometown</p><p>${artist.hometown}</p></div>
          <div class="stat-box"><p class="tiny">Formed</p><p>${artist.formed}</p></div>
          <div class="stat-box"><p class="tiny">YTD streams</p><p>${QFR.fmtCompact(artist.stats.ytd)}</p></div>
          <div class="stat-box"><p class="tiny">Signed</p><p>${QFR.date(artist.signedDate)}</p></div>
        </aside>
      </div>
    </section>
    <nav class="anav"><div class="wrap">${VIEWS.map((v) => `<a class="${v.id === view ? "on" : ""}" href="${QFR.artistUrl(artist.id, v.id)}">${v.label}</a>`).join("")}</div></nav>
    <div class="wrap py">${body()}</div>
    <div class="wrap"><div class="freq"></div></div>`;

  QFR.bindTicker();
  const listen = document.getElementById("listen");
  if (listen) listen.onclick = () => QFR.playRandom({ artistId: artist.id });

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: artist.name, url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  }
  document.querySelectorAll("#share, #share-top").forEach((b) => {
    if (b) b.onclick = share;
  });
  document.querySelectorAll("[data-play]").forEach((b) => {
    b.onclick = () => QFR.playSong(b.dataset.play);
  });
  document.querySelectorAll("[data-ly]").forEach((b) => {
    b.onclick = () => {
      const el = document.getElementById("ly-" + b.dataset.ly);
      el.hidden = !el.hidden;
    };
  });
  document.querySelectorAll("[data-cat]").forEach((b) => {
    b.onclick = () => {
      location.search = `?id=${artist.id}&view=gallery&cat=` + encodeURIComponent(b.dataset.cat);
    };
  });
  document.querySelectorAll("[data-lb]").forEach((b) => {
    b.onclick = () => {
      const lb = document.createElement("button");
      lb.className = "lightbox";
      lb.innerHTML = `<img src="${b.dataset.lb}" alt="" style="max-height:90vh;max-width:100%">`;
      lb.onclick = () => lb.remove();
      document.body.appendChild(lb);
    };
  });
  document.querySelectorAll(".profile-split").forEach((el) => {
    if (window.matchMedia("(min-width:768px)").matches) {
      el.style.display = "grid";
      el.style.gridTemplateColumns = "1.2fr .8fr";
      el.style.gap = "2rem";
    }
  });
});
