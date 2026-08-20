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
    return ROOT + p.replace(/^\//, "");
  };
  QFR.page = (p) => ROOT + p.replace(/^\//, "");
  QFR.artistUrl = (id, view) =>
    QFR.page("pages/artist.html") + "?id=" + encodeURIComponent(id) + (view ? "&view=" + view : "");
  QFR.fmt = (n) => Number(n || 0).toLocaleString("en-US");
  QFR.date = (iso) => {
    const d = new Date(iso + (iso.length <= 10 ? "T00:00:00" : ""));
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };
  QFR.time = (s) => {
    if (!Number.isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + String(sec).padStart(2, "0");
  };
  QFR.param = (k) => new URLSearchParams(location.search).get(k);

  const MARK = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.45"/><path d="M16 36h6l3-10 4 20 4-14 3 8h8l2-6 3 10 3-8 2 4h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;

  async function loadData() {
    const names = ["site", "artists", "releases", "songs", "videos", "news", "gallery"];
    const pack = await Promise.all(names.map((n) => fetch(ROOT + "data/" + n + ".json").then((r) => r.json())));
    names.forEach((n, i) => (QFR[n] = pack[i]));
  }

  function headerHTML(pageId) {
    const overlay = pageId === "landing" ? " is-overlay" : "";
    const links = NAV.map((n) => {
      const href = QFR.page(n.href);
      const on = pageId === n.id ? " active" : "";
      return `<a class="${on}" href="${href}">${n.label}</a>`;
    }).join("");
    return `
      <header class="site-header${overlay}">
        <div class="hdr">
          <div class="hdr-left">
            <button class="icon-btn menu-btn" type="button" aria-label="Open menu">☰</button>
            <a class="wordmark" href="${QFR.page("index.html")}" aria-label="Quantum Frequency Records">
              ${MARK}
              <span><span class="wordmark-qfr">QFR</span><span class="wordmark-sub">RECORDS</span></span>
            </a>
          </div>
          <p class="hdr-center">QFR</p>
          <nav class="nav-desk">${links}</nav>
          <a class="store-btn" href="${QFR.page("pages/store.html")}">Store</a>
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

  function footerHTML() {
    const s = QFR.site;
    const nav = NAV.map((n) => `<li><a href="${QFR.page(n.href)}">${n.label}</a></li>`).join("");
    return `
      <footer class="site-footer">
        <div class="freq"></div>
        <div class="wrap ft-grid">
          <div>
            <div class="wordmark">${MARK}<span><span class="wordmark-qfr">${s.shortName}</span><span class="wordmark-sub">RECORDS</span></span></div>
            <p class="muted" style="margin-top:1rem;max-width:24rem">${s.tagline}</p>
          </div>
          <div>
            <p class="kicker">Navigate</p>
            <ul style="list-style:none;padding:0;margin:1rem 0 0">${nav}<li><a href="${QFR.page("pages/store.html")}">Store</a></li></ul>
          </div>
          <div>
            <p class="kicker">Connect</p>
            <ul style="list-style:none;padding:0;margin:1rem 0 0;color:var(--muted)">
              <li><a href="${s.social.instagram}">Instagram</a></li>
              <li><a href="${s.social.youtube}">YouTube</a></li>
              <li><a href="${s.social.spotify}">Spotify</a></li>
              <li><a href="${s.social.x}">X</a></li>
              <li><a href="mailto:${s.contact.email}">${s.contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div class="wrap ft-bar">
          <p>${s.copyright}</p>
          <div>
            <a href="${QFR.page("pages/privacy.html")}">Privacy</a>
            &nbsp;·&nbsp;
            <a href="${QFR.page("pages/terms.html")}">Terms</a>
          </div>
        </div>
      </footer>`;
  }

  function playerHTML() {
    const genres = [...new Set(QFR.artists.flatMap((a) => [a.genre, ...a.genres]))].sort();
    return `
      <div class="np" id="np">
        <audio id="np-audio" preload="metadata"></audio>
        <div class="np-inner">
          <button class="np-play" id="np-toggle" type="button" aria-label="Play">▶</button>
          <div class="np-meta" id="np-meta"><b>Select an artist or genre</b><span>Now Playing</span></div>
          <input class="np-seek" id="np-seek" type="range" min="0" max="0" value="0" step="0.1" aria-label="Seek">
          <div class="np-selects">
            <select id="np-genre"><option value="">Genre</option>${genres.map((g) => `<option>${g}</option>`).join("")}</select>
            <select id="np-artist"><option value="">Artist</option>${QFR.artists.map((a) => `<option value="${a.id}">${a.name}</option>`).join("")}</select>
            <button type="button" id="np-rand" aria-label="Random">⟳</button>
            <button type="button" id="np-min" aria-label="Collapse">▾</button>
          </div>
        </div>
      </div>`;
  }

  function newsletterHTML() {
    return `<section class="wrap section">
      <div class="freq" style="margin-bottom:2.5rem"></div>
      <p class="kicker">Stay Connected</p>
      <h2 style="font-size:2.5rem;margin-top:.5rem">Join the frequency</h2>
      <form id="nl-form" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
        <input type="email" required placeholder="you@domain.com" style="flex:1;min-width:12rem">
        <button class="btn btn-primary" type="submit">Subscribe</button>
      </form>
      <p id="nl-done" hidden class="muted">You’re on the list.</p>
    </section>`;
  }

  const playerState = {
    songId: null,
    playing: false,
    artistFilter: "",
    genreFilter: "",
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

  QFR.playSong = (id) => {
    const song = QFR.getSong(id);
    if (!song) return;
    playerState.songId = id;
    playerState.playing = true;
    playerState.artistFilter = song.artistId;
    savePlayer();
    const audio = document.getElementById("np-audio");
    const art = QFR.getArtist(song.artistId);
    document.getElementById("np-meta").innerHTML = `<b>${song.title}</b><span>${art ? art.name : ""}</span>`;
    audio.src = QFR.asset(song.audio);
    audio.play().catch(() => {});
    document.getElementById("np-toggle").textContent = "❚❚";
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
    document.getElementById("np-min").onclick = () => document.getElementById("np").classList.toggle("collapsed");
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
        const art = QFR.getArtist(song.artistId);
        document.getElementById("np-meta").innerHTML = `<b>${song.title}</b><span>${art ? art.name : ""}</span>`;
        audio.src = QFR.asset(song.audio);
      }
    }
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
    const nl = document.getElementById("nl-form");
    if (nl) {
      nl.onsubmit = (e) => {
        e.preventDefault();
        nl.hidden = true;
        document.getElementById("nl-done").hidden = false;
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
