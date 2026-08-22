QFR.ready("home").then(() => {
  const s = QFR.site;
  const cards = QFR.latestCards;
  let latest = 0;
  let pinned = false;
  let tf = "month";
  const tfLabel = { week: "Weekly", month: "Monthly", ytd: "Yearly" };
  let cycle;

  function startCycle() {
    clearInterval(cycle);
    cycle = setInterval(() => {
      if (pinned) return;
      latest = (latest + 1) % cards.length;
      paint();
    }, 5200);
  }

  function paint() {
    const d = cards[latest];
    const a = QFR.mostStreamedArtist(tf);
    const song = QFR.mostStreamedSong(tf);
    const album = QFR.mostStreamedAlbum(tf);
    const vid = QFR.mostViewedVideo(tf);
    const albumArtist = QFR.getArtist(album.release.artistId);
    const values = QFR.values;
    const activeVal = values.find((v) => v.number === (window._qfrVal || 1)) || values[0];

    document.getElementById("app").innerHTML = `
      <section class="studio-hero">
        <img class="bg" src="${QFR.asset("assets/images/backgrounds/studio-home.png")}" alt="QFR studio">
        <div class="veil"></div>
        <div class="wrap inner">
          <h1 class="hero-title">A New Wave<br>Of Sound.</h1>
          <p style="margin-top:1.25rem;max-width:28rem;font-size:1.05rem;line-height:1.6;color:color-mix(in srgb,var(--fg) 85%, transparent)">${s.homeSub}</p>
          <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2rem">
            <a class="btn btn-primary" href="${QFR.page("pages/artists.html")}">Explore Artists</a>
            <a class="btn btn-line" href="${QFR.page("pages/about.html")}">Explore Label</a>
          </div>
        </div>
        <div class="freq"></div>
      </section>

      <section class="wrap section">
        <p class="kicker">The Frequency</p>
        <h2 style="font-size:clamp(2.2rem,5vw,3.2rem);margin-top:.5rem">Nine values. One deal.</h2>
        <p class="muted" style="max-width:32rem;margin-top:.75rem">Cards cycle on their own. Press any value to hold it in the center.</p>
        <div class="values-ring" id="values-ring">
          ${values
            .map(
              (v) => `<button type="button" data-box="${v.number}" data-val="${v.number}" class="${v.number === activeVal.number ? "on" : ""}">
            <span class="tiny">${String(v.number).padStart(2, "0")}</span>
            <span style="display:block;margin-top:.25rem;font-family:var(--font-display);font-size:1.7rem;letter-spacing:.08em">${v.title}</span>
          </button>`,
            )
            .join("")}
          <div class="values-mid" id="values-mid">
            <p class="kicker">${activeVal.title}</p>
            <p style="margin-top:.75rem;line-height:1.6">${activeVal.description}</p>
          </div>
        </div>
      </section>

      <div class="wrap"><div class="freq"></div></div>

      <section class="wrap section">
        <p class="kicker">Latest Releases</p>
        <h2 style="font-size:clamp(2.2rem,5vw,3.2rem);margin-top:.5rem">Right now on the roster</h2>
        <div class="latest-cards">
          ${cards
            .map(
              (c, i) => `<button type="button" data-l="${i}" class="${i === latest ? "on" : ""}">
            <img src="${QFR.asset(c.image)}" alt="">
            <span class="cap">
              <span class="tiny">${c.kicker}</span>
              <span style="display:block;margin-top:.25rem;font-family:var(--font-display);font-size:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.title}</span>
              <span class="muted" style="display:block;margin-top:.25rem;font-size:.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.excerpt}</span>
            </span>
          </button>`,
            )
            .join("")}
        </div>
        <a class="latest-detail" href="${QFR.routeLink(d.link)}">
          <img src="${QFR.asset(d.image)}" alt="">
          <div class="cap">
            <p class="tiny">${d.kicker}</p>
            <h3 style="font-size:clamp(1.8rem,4vw,3rem);margin-top:.4rem">${d.title}</h3>
            <p class="muted" style="margin-top:.4rem;font-size:.8rem">${d.meta || ""}</p>
            <p style="margin-top:1rem;line-height:1.6">${d.body}</p>
            <span class="tiny" style="margin-top:1.5rem">${d.linkLabel} →</span>
          </div>
        </a>
      </section>

      <div class="wrap"><div class="freq"></div></div>

      <section class="wrap section">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;align-items:end">
          <div>
            <p class="kicker">Hottest & Trending</p>
            <h2 style="font-size:clamp(2.2rem,5vw,3.2rem);margin-top:.5rem">What is moving</h2>
          </div>
          <div class="seg">${["week", "month", "ytd"]
            .map((k) => `<button data-tf="${k}" class="${k === tf ? "on" : ""}">${tfLabel[k]}</button>`)
            .join("")}</div>
        </div>
        <div class="trend">
          <a href="${QFR.page("pages/music.html")}" data-play="${song.id}">
            <img src="${QFR.asset(song.artwork)}" alt="">
            <div class="cap"><p class="tiny">Most Streamed Song</p><p style="font-family:var(--font-display);font-size:1.6rem">${song.title}</p><p>${QFR.fmtCompact(song.streams[tf])} <span class="muted">${tfLabel[tf]}</span></p></div>
          </a>
          <a href="${QFR.page("pages/music.html")}">
            <img src="${QFR.asset(album.release.artwork)}" alt="">
            <div class="cap"><p class="tiny">Most Streamed Album</p><p style="font-family:var(--font-display);font-size:1.6rem">${album.release.title}</p><p>${QFR.fmtCompact(album.streams)} <span class="muted">${albumArtist ? albumArtist.name : ""} · ${tfLabel[tf]}</span></p></div>
          </a>
          <a href="${QFR.artistUrl(a.id)}">
            <img src="${QFR.asset(a.image)}" alt="">
            <div class="cap"><p class="tiny">Most Streamed Artist</p><p style="font-family:var(--font-display);font-size:1.6rem">${a.name}</p><p>${QFR.fmtCompact(a.stats[tf])} <span class="muted">${tfLabel[tf]}</span></p></div>
          </a>
          <a href="${QFR.page("pages/videos.html")}">
            <img src="${QFR.asset(vid.thumbnail)}" alt="">
            <div class="cap"><p class="tiny">Most Watched Video</p><p style="font-family:var(--font-display);font-size:1.6rem">${vid.title}</p><p>${QFR.fmtCompact(vid.views[tf])} <span class="muted">${tfLabel[tf]}</span></p></div>
          </a>
        </div>
      </section>

      <div class="wrap"><div class="freq"></div></div>
      ${QFR.socialSection()}`;

    document.querySelectorAll("[data-l]").forEach((b) => {
      b.onclick = () => {
        latest = Number(b.dataset.l);
        pinned = true;
        paint();
      };
    });
    document.querySelectorAll("[data-tf]").forEach((b) => {
      b.onclick = () => {
        tf = b.dataset.tf;
        paint();
      };
    });
    document.querySelectorAll("[data-play]").forEach((b) => {
      b.addEventListener("click", () => QFR.playSong(b.dataset.play));
    });
    bindValues();
  }

  let valPinned = false;
  window._qfrVal = 1;
  let valCycle;

  function bindValues() {
    document.querySelectorAll("[data-val]").forEach((b) => {
      b.onclick = () => {
        window._qfrVal = Number(b.dataset.val);
        valPinned = true;
        paint();
      };
    });
  }

  function startValCycle() {
    clearInterval(valCycle);
    valCycle = setInterval(() => {
      if (valPinned) return;
      window._qfrVal = (window._qfrVal % QFR.values.length) + 1;
      const v = QFR.values.find((x) => x.number === window._qfrVal);
      const ring = document.getElementById("values-ring");
      const mid = document.getElementById("values-mid");
      if (!ring || !mid || !v) return;
      ring.querySelectorAll("[data-val]").forEach((b) => b.classList.toggle("on", Number(b.dataset.val) === v.number));
      mid.innerHTML = `<p class="kicker">${v.title}</p><p style="margin-top:.75rem;line-height:1.6">${v.description}</p>`;
    }, 4200);
  }

  paint();
  startCycle();
  startValCycle();
});
