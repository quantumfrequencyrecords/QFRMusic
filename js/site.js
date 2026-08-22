/* Quantum Frequency Records — shared chrome, data, player */
(() => {
  const html = document.documentElement;
  const ROOT = html.dataset.root || "./";
  window.QFR = window.QFR || {};
  QFR.root = ROOT;

  const NAV = [
    { href: "pages/home.html", id: "home", label: "Home" },
    { href: "pages/news.html", id: "news", label: "News" },
    { href: "pages/artists.html", id: "artists", label: "Artists" },
    { href: "pages/music.html", id: "music", label: "Music" },
    { href: "pages/videos.html", id: "videos", label: "Videos" },
    { href: "pages/gallery.html", id: "gallery", label: "Gallery" },
    { href: "pages/about.html", id: "about", label: "About Us" },
    { href: "pages/contact.html", id: "contact", label: "Contact Us" },
  ];

  QFR.asset = (p) => {
    if (!p) return "";
    if (/^https?:/i.test(p)) return p;
    return ROOT + String(p).replace(/^\//, "");
  };
  QFR.page = (p) => ROOT + String(p).replace(/^\//, "");
  QFR.artistUrl = (id, view) =>
    QFR.page("pages/artist.html") + "?id=" + encodeURIComponent(id) + (view ? "&view=" + view : "");
  QFR.fmt = (n) => Number(n || 0).toLocaleString("en-US");
  QFR.fmtCompact = (n) => {
    n = Number(n || 0);
    if (n >= 1_000_000) {
      const v = n / 1_000_000;
      return (v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")) + "M";
    }
    if (n >= 1_000) {
      const v = n / 1_000;
      return (v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")) + "K";
    }
    return String(n);
  };
  QFR.date = (iso) => {
    const d = new Date(iso + (String(iso).length <= 10 ? "T00:00:00" : ""));
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };
  QFR.time = (s) => {
    if (!Number.isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + String(sec).padStart(2, "0");
  };
  QFR.param = (k) => new URLSearchParams(location.search).get(k);

  const MARK = `<img class="qfr-header-logo" src="${QFR.asset("../favicon.svg")}" alt="Quantum Frequency Records logo">`;

  const ICONS = {
    spotify: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.6-.8 6.7-.4 9.2 1.1.3.1.4.5.2.7Zm1.1-2.5c-.2.4-.7.5-1 .3-2.5-1.5-6.4-2-9.4-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.4-1 7.7-.5 10.6 1.2.4.2.5.7.2 1Zm.1-2.6c-3-1.8-8-2-10.9-1.1-.5.1-1-.2-1.1-.6-.2-.5.1-1 .6-1.1 3.3-1 8.8-.8 12.3 1.3.4.3.6.9.3 1.3-.2.4-.8.6-1.2.2Z"/></svg>`,
    x: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.7 10.3 21 3h-2.3l-5.2 6-4.2-6H3.2l6.7 9.5L3 21h2.3l5.6-6.5 4.6 6.5H21l-6.3-10.7Zm-2 2.3-.6-.9-5.1-7.3h2.2l4.1 5.9.6.9 5.3 7.6h-2.2l-4.3-6.2Z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.4 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.5V8.9l6.2 3.3-6.2 3.3Z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 3c.4 2.6 1.8 4.4 4.5 4.7v2.4c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.4-2.7 6.1-6.2 6.1S2.5 18.8 2.5 15.4c0-3.3 2.6-6 5.9-6.1v2.5c-1.8.1-3.2 1.6-3.2 3.5 0 2 1.6 3.6 3.6 3.6s3.5-1.6 3.5-3.6V3h2.2Z"/></svg>`,
  };

  async function loadData() {
    const names = ["site", "artists", "releases", "songs", "videos", "news", "gallery", "values", "trending"];
    const pack = await Promise.all(
      names.map((n) =>
        fetch(ROOT + "data/" + n + ".json").then((r) => {
          if (!r.ok) throw new Error(n);
          return r.json();
        }),
      ),
    );
    names.forEach((n, i) => (QFR[n] = pack[i]));
    const latestNames = ["label-news", "artist-news", "signed-artist", "album", "song"];
    const latest = await Promise.all(
      latestNames.map((n) => fetch(ROOT + "data/latest/" + n + ".json").then((r) => r.json())),
    );
    QFR.latestCards = latest;
  }

  function headerHTML(pageId) {
    const links = NAV.map((n) => {
      const href = QFR.page(n.href);
      const on = pageId === n.id ? " active" : "";
      return `<a class="${on}" href="${href}">${n.label}</a>`;
    }).join("");
    return `
      <header class="site-header" id="site-header-el">
        <div class="hdr">
          <div class="hdr-left">
            <button class="icon-btn menu-btn" type="button" aria-label="Open menu">☰</button>
            <a class="wordmark" href="${QFR.page("index.html")}" aria-label="Quantum Frequency Records">
              ${MARK}
            </a>
          </div>
          <p class="hdr-center">QFR</p>
          <nav class="nav-desk">${links}</nav>
          <div class="hdr-right">
            <button class="collapse-btn" id="hdr-collapse" type="button" aria-label="Collapse header">▴</button>
            <a class="store-btn" href="${QFR.page("pages/store.html")}">Store</a>
          </div>
        </div>
        <div class="freq"></div>
      </header>
      <div class="drawer-root" id="drawer">
        <div class="drawer-ov" data-close></div>
        <aside class="drawer">
          <div class="hdr-left" style="padding:1rem;justify-content:space-between">
            <span class="wordmark">${MARK}<span><span class="wordmark-qfr">QFR</span></span></span>
            <button class="icon-btn" type="button" data-close aria-label="Close">✕</button>
          </div>
          <div class="freq"></div>
          <nav>${links}<a href="${QFR.page("pages/store.html")}">Store</a></nav>
        </aside>
      </div>`;
  }

  function socialList() {
    const s = QFR.site.social;
    return [
      { id: "spotify", label: "Spotify", href: s.spotify },
      { id: "x", label: "X", href: s.x },
      { id: "instagram", label: "Instagram", href: s.instagram },
      { id: "youtube", label: "YouTube", href: s.youtube },
      { id: "tiktok", label: "TikTok", href: s.tiktok },
    ];
  }

  QFR.socialIcons = (cls = "") =>
    `<div class="${cls}">${socialList()
      .map(
        (s) =>
          `<a class="social-icon" href="${s.href}" target="_blank" rel="noreferrer" aria-label="${s.label}">${ICONS[s.id]}</a>`,
      )
      .join("")}</div>`;

  QFR.socialSection = () => `
    <section class="wrap section">
      <p class="kicker">Follow the frequency</p>
      <h2 style="font-size:clamp(2.2rem,5vw,3.2rem);margin-top:.5rem">Stay with the roster</h2>
      <p class="muted" style="max-width:32rem;margin-top:.75rem">Spotify, X, Instagram, YouTube, and TikTok. Handles live in site.json so they can move without a rebuild of the layout.</p>
      <div class="social-row" style="margin-top:2rem">${socialList()
        .map(
          (s) =>
            `<a class="social-chip" href="${s.href}" target="_blank" rel="noreferrer">${ICONS[s.id]} ${s.label}</a>`,
        )
        .join("")}</div>
    </section>`;

  function newsletterHTML() {
    return `<section class="stay">
      <div class="wrap stay-inner">
        <div class="stay-copy">
          <span class="stay-icon">@</span>
          <div>
            <p style="font-family:var(--font-display);font-size:1.6rem;letter-spacing:.12em">Stay Connected</p>
            <p class="muted" style="margin-top:.25rem;font-size:.9rem">Get the latest news, drops and exclusive offers delivered to your inbox.</p>
          </div>
        </div>
        <form id="nl-form">
          <input type="email" required placeholder="Enter your email address" aria-label="Email">
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
        <p id="nl-done" hidden class="muted">You’re on the list. We’ll be in touch when the next wave drops.</p>
      </div>
    </section>`;
  }

  function footerHTML() {
    const s = QFR.site;
    const nav = NAV.map((n) => `<li><a href="${QFR.page(n.href)}">${n.label}</a></li>`).join("");
    return `
      ${newsletterHTML()}
      <footer class="site-footer">
        <div class="freq"></div>
        <div class="wrap ft-grid">
          <div>
            <div class="wordmark">${MARK}<span><span class="wordmark-qfr">${s.shortName}</span><span class="wordmark-sub">QUANTUM FREQUENCY</span></span></div>
            <p class="muted" style="margin-top:1rem;max-width:24rem">${s.tagline}</p>
          </div>
          <div>
            <p class="kicker">Navigation</p>
            <ul style="list-style:none;padding:0;margin:1rem 0 0">${nav}<li><a href="${QFR.page("pages/store.html")}">Store</a></li></ul>
          </div>
          <div>
            <p class="kicker">Connect</p>
            ${QFR.socialIcons("social-row")}
            <a class="muted" style="display:block;margin-top:1rem;font-size:.9rem" href="mailto:${s.contact.email}">${s.contact.email}</a>
          </div>
          <div>
            <p class="kicker">Legal</p>
            <ul style="list-style:none;padding:0;margin:1rem 0 0">
              <li><a href="${QFR.page("pages/privacy.html")}">Privacy</a></li>
              <li><a href="${QFR.page("pages/terms.html")}">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="wrap ft-bar">
          <p>${s.copyright}</p>
        </div>
      </footer>`;
  }

  function playerHTML() {
    const genres = [...new Set(QFR.artists.flatMap((a) => [a.genre, ...a.genres]))].sort();
    return `
      <div class="np" id="np">
        <audio id="np-audio" preload="metadata"></audio>
        <div class="np-inner">
          <button class="icon-btn" id="np-min" type="button" aria-label="Dock player to the side">⇥</button>
          <button class="np-play" id="np-toggle" type="button" aria-label="Play">▶</button>
          <img class="np-art" id="np-art" alt="" hidden>
          <div class="np-meta" id="np-meta"><b>Select an artist or genre</b><span>Now Playing</span></div>
          <input class="np-seek" id="np-seek" type="range" min="0" max="0" value="0" step="0.1" aria-label="Seek">
          <div class="np-selects">
            <select id="np-genre"><option value="">Genre</option>${genres.map((g) => `<option>${g}</option>`).join("")}</select>
            <select id="np-artist"><option value="">Artist</option>${QFR.artists.map((a) => `<option value="${a.id}">${a.name}</option>`).join("")}</select>
            <button type="button" id="np-rand" aria-label="Random">⟳</button>
          </div>
        </div>
      </div>`;
  }

  const playerState = {
    songId: null,
    playing: false,
    artistFilter: "",
    genreFilter: "",
    collapsed: false,
  };
  try {
    Object.assign(playerState, JSON.parse(localStorage.getItem("qfr-now-playing") || "{}"));
  } catch {}

  function savePlayer() {
    localStorage.setItem(
      "qfr-now-playing",
      JSON.stringify({
        songId: playerState.songId,
        artistFilter: playerState.artistFilter,
        genreFilter: playerState.genreFilter,
        collapsed: playerState.collapsed,
      }),
    );
  }

  QFR.getArtist = (id) => QFR.artists.find((a) => a.id === id);
  QFR.getSong = (id) => QFR.songs.find((s) => s.id === id);
  QFR.getRelease = (id) => QFR.releases.find((r) => r.id === id);
  QFR.artistSongs = (id) => QFR.songs.filter((s) => s.artistId === id);
  QFR.artistReleases = (id) => QFR.releases.filter((r) => r.artistId === id).sort((a, b) => b.date.localeCompare(a.date));
  QFR.artistNews = (id) => QFR.news.filter((n) => n.artistIds.includes(id)).sort((a, b) => b.date.localeCompare(a.date));
  QFR.artistVideos = (id) => QFR.videos.filter((v) => v.artistId === id);
  QFR.artistGallery = (id) => QFR.gallery.filter((g) => g.artistId === id);

  QFR.filterNews = (kind) => {
    const list = [...QFR.news].sort((a, b) => b.date.localeCompare(a.date));
    if (kind === "label") return list.filter((n) => n.category === "Label");
    if (kind === "releases") return list.filter((n) => n.category === "Release");
    if (kind === "artist") {
      return list.filter((n) => n.category !== "Label" && n.category !== "Release" && n.artistIds.length > 0);
    }
    return list;
  };

  QFR.mostStreamedArtist = (tf) => {
    const pin = QFR.trending && QFR.trending.artistId;
    const pinned = pin ? QFR.getArtist(pin) : undefined;
    if (pinned) return pinned;
    return [...QFR.artists].sort((a, b) => b.stats[tf] - a.stats[tf])[0];
  };
  QFR.mostStreamedSong = (tf) => {
    const pin = QFR.trending && QFR.trending.songId;
    const pinned = pin ? QFR.getSong(pin) : undefined;
    if (pinned) return pinned;
    return [...QFR.songs].sort((a, b) => b.streams[tf] - a.streams[tf])[0];
  };
  QFR.mostStreamedAlbum = (tf) => {
    const pin = QFR.trending && QFR.trending.albumId;
    const scores = new Map();
    for (const s of QFR.songs) scores.set(s.releaseId, (scores.get(s.releaseId) || 0) + s.streams[tf]);
    const pinned = pin ? QFR.getRelease(pin) : undefined;
    if (pinned) return { release: pinned, streams: scores.get(pinned.id) || 0 };
    const sorted = [...QFR.releases].sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0));
    return { release: sorted[0], streams: scores.get(sorted[0].id) || 0 };
  };
  QFR.mostViewedVideo = (tf) => {
    const pin = QFR.trending && QFR.trending.videoId;
    const pinned = pin ? QFR.videos.find((v) => v.id === pin) : undefined;
    if (pinned) return pinned;
    return [...QFR.videos].sort((a, b) => b.views[tf] - a.views[tf])[0];
  };

  QFR.artistDna = (id) => {
    const axes = ["Energy", "Melody", "Lyric", "Production", "Live", "Range"];
    let h = 2166136261;
    for (let i = 0; i < id.length; i++) {
      h ^= id.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return axes.map((label, i) => ({ label, value: 58 + ((h >>> (i * 5)) % 38) }));
  };

  QFR.pageHero = ({ kicker, title, sub, image, actions = "" }) => `
    <section class="page-hero">
      <img class="bg" src="${QFR.asset(image)}" alt="">
      <div class="veil"></div>
      <div class="wrap inner">
        <p class="kicker">${kicker}</p>
        <h1 class="hero-title" style="margin-top:.5rem">${title}</h1>
        ${sub ? `<p class="muted" style="max-width:36rem;margin-top:1rem">${sub}</p>` : ""}
        ${actions ? `<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.5rem">${actions}</div>` : ""}
      </div>
    </section>`;

  QFR.tickerHTML = () => {
    const logos = [...QFR.artists, ...QFR.artists]
      .map((a) => `<a href="${QFR.artistUrl(a.id)}" title="${a.name}"><img src="${QFR.asset(a.logo)}" alt="${a.name}"></a>`)
      .join("");
    return `<div class="ticker" id="ticker"><div class="ticker-track">${logos}</div></div>`;
  };

  QFR.bindTicker = () => {
    const el = document.getElementById("ticker");
    if (!el) return;
    el.onmouseenter = () => el.classList.add("paused");
    el.onmouseleave = () => el.classList.remove("paused");
  };

  QFR.routeLink = (link) => {
    if (!link) return QFR.page("pages/home.html");
    if (link.startsWith("/artist/")) return QFR.artistUrl(link.replace("/artist/", ""));
    const map = {
      "/news": "pages/news.html",
      "/music": "pages/music.html",
      "/videos": "pages/videos.html",
      "/gallery": "pages/gallery.html",
      "/about": "pages/about.html",
      "/contact": "pages/contact.html",
      "/store": "pages/store.html",
      "/home": "pages/home.html",
      "/artists": "pages/artists.html",
    };
    return QFR.page(map[link] || "pages/home.html");
  };

  function pool() {
    let list = QFR.songs;
    if (playerState.artistFilter) list = list.filter((s) => s.artistId === playerState.artistFilter);
    if (playerState.genreFilter) {
      const ids = new Set(
        QFR.artists
          .filter((a) => a.genre === playerState.genreFilter || a.genres.includes(playerState.genreFilter))
          .map((a) => a.id),
      );
      list = list.filter((s) => ids.has(s.artistId) || s.genre === playerState.genreFilter);
    }
    return list;
  }

  function applyDock() {
    const np = document.getElementById("np");
    if (!np) return;
    np.classList.toggle("collapsed", !!playerState.collapsed);
    document.body.classList.toggle("np-docked", !!playerState.collapsed);
    const min = document.getElementById("np-min");
    if (min) min.textContent = playerState.collapsed ? "⇤" : "⇥";
    if (min) min.setAttribute("aria-label", playerState.collapsed ? "Expand player" : "Dock player to the side");
  }

  function paintMeta(song) {
    const art = song ? QFR.getArtist(song.artistId) : null;
    const meta = document.getElementById("np-meta");
    const img = document.getElementById("np-art");
    if (!meta) return;
    if (song) {
      meta.innerHTML = `<b>${song.title}</b><span>${art ? art.name : ""}</span>`;
      if (img) {
        img.src = QFR.asset(song.artwork);
        img.hidden = false;
      }
    } else {
      meta.innerHTML = `<b>Select an artist or genre</b><span>Now Playing</span>`;
      if (img) img.hidden = true;
    }
  }

  QFR.playSong = (id) => {
    const song = QFR.getSong(id);
    if (!song) return;
    playerState.songId = id;
    playerState.playing = true;
    playerState.artistFilter = song.artistId;
    savePlayer();
    const audio = document.getElementById("np-audio");
    paintMeta(song);
    audio.src = QFR.asset(song.audio);
    audio.play().catch(() => {});
    document.getElementById("np-toggle").textContent = "❚❚";
    const artistSel = document.getElementById("np-artist");
    if (artistSel) artistSel.value = song.artistId;
  };

  QFR.playRandom = (opts = {}) => {
    if (opts.artistId) playerState.artistFilter = opts.artistId;
    if (opts.genre) playerState.genreFilter = opts.genre;
    const list = pool();
    if (!list.length) return;
    QFR.playSong(list[Math.floor(Math.random() * list.length)].id);
  };

  function bindPlayer() {
    const audio = document.getElementById("np-audio");
    const seek = document.getElementById("np-seek");
    document.getElementById("np-toggle").onclick = () => {
      if (!playerState.songId) return QFR.playRandom();
      if (audio.paused) {
        audio.play();
        playerState.playing = true;
        document.getElementById("np-toggle").textContent = "❚❚";
      } else {
        audio.pause();
        playerState.playing = false;
        document.getElementById("np-toggle").textContent = "▶";
      }
    };
    document.getElementById("np-rand").onclick = () => QFR.playRandom();
    document.getElementById("np-min").onclick = () => {
      playerState.collapsed = !playerState.collapsed;
      savePlayer();
      applyDock();
    };
    document.getElementById("np-genre").onchange = (e) => {
      playerState.genreFilter = e.target.value;
      playerState.artistFilter = "";
      if (e.target.value) QFR.playRandom({ genre: e.target.value });
    };
    document.getElementById("np-artist").onchange = (e) => {
      playerState.artistFilter = e.target.value;
      playerState.genreFilter = "";
      if (e.target.value) QFR.playRandom({ artistId: e.target.value });
    };
    audio.addEventListener("timeupdate", () => {
      seek.max = audio.duration || 0;
      seek.value = audio.currentTime || 0;
    });
    audio.addEventListener("ended", () => QFR.playRandom());
    seek.addEventListener("input", () => {
      audio.currentTime = Number(seek.value);
    });
    if (playerState.songId) {
      const song = QFR.getSong(playerState.songId);
      if (song) {
        paintMeta(song);
        audio.src = QFR.asset(song.audio);
      }
    }
    applyDock();
  }

  function bindChrome() {
    const drawer = document.getElementById("drawer");
    document.querySelectorAll(".menu-btn").forEach((b) => {
      b.onclick = () => {
        drawer.classList.add("open");
        document.body.classList.add("lock");
      };
    });
    drawer.querySelectorAll("[data-close]").forEach((b) => {
      b.onclick = () => {
        drawer.classList.remove("open");
        document.body.classList.remove("lock");
      };
    });
    const hdr = document.getElementById("site-header-el");
    const collapse = document.getElementById("hdr-collapse");
    if (collapse && hdr) {
      try {
        if (localStorage.getItem("qfr-header-collapsed") === "1") {
          hdr.classList.add("collapsed");
          collapse.textContent = "▾";
        }
      } catch {}
      collapse.onclick = () => {
        hdr.classList.toggle("collapsed");
        const on = hdr.classList.contains("collapsed");
        collapse.textContent = on ? "▾" : "▴";
        try {
          localStorage.setItem("qfr-header-collapsed", on ? "1" : "0");
        } catch {}
      };
    }
    const nl = document.getElementById("nl-form");
    if (nl) {
      nl.onsubmit = (e) => {
        e.preventDefault();
        nl.hidden = true;
        const done = document.getElementById("nl-done");
        if (done) done.hidden = false;
      };
    }
  }

  QFR.ready = async function ready(pageId, { hideFooter } = {}) {
    await loadData();
    document.getElementById("site-header").innerHTML = headerHTML(pageId);
    if (!hideFooter) document.getElementById("site-footer").innerHTML = footerHTML();
    document.getElementById("now-playing").innerHTML = playerHTML();
    bindChrome();
    bindPlayer();
    QFR.newsletterHTML = newsletterHTML;
  };
})();
