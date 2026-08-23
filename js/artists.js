QFR.ready("artists").then(() => {
  const intro = QFR.site.artistsIntro;
  const genres = [...new Set(QFR.artists.map((a) => a.genre))];
  let genre = "all";

  function rowsFor(list) {
    return list
      .map(
        (a) => `
    <article class="artist-banner" style="margin-bottom:1.5rem">
      <img class="bg" src="${QFR.asset(a.hero)}" alt="" loading="lazy">
      <div class="veil"></div>
      <div class="inner">
        <div style="max-width:36rem">
          <p class="tiny">${a.genre} · ${a.hometown}</p>
          <h2 style="font-size:clamp(2.4rem,6vw,4.5rem);margin-top:.4rem">${a.name}</h2>
          <p style="margin-top:.75rem;max-width:28rem;line-height:1.6;color:color-mix(in srgb,var(--fg) 85%, transparent)">${a.description}</p>
          <p class="muted" style="margin-top:.75rem;font-size:.8rem">Est. ${a.formed} · ${QFR.fmtCompact(a.stats.ytd)} streams YTD</p>
        </div>
        <div class="row-actions" style="display:flex;flex-wrap:wrap;gap:.5rem">
          <a class="btn btn-ghost" href="${QFR.artistUrl(a.id, "members")}">${a.type === "solo" ? "Meet The Artist" : "Meet The Band"}</a>
          <a class="btn btn-line" href="${QFR.artistUrl(a.id)}">Visit Artist</a>
          <button class="btn btn-primary" type="button" data-listen="${a.id}">Listen Now</button>
        </div>
      </div>
    </article>`,
      )
      .join("");
  }

  function groupsHtml() {
    const list =
      genre === "all"
        ? QFR.artists
        : QFR.artists.filter((a) => a.genre === genre || a.genres.includes(genre));
    const map = new Map();
    for (const a of list) {
      const arr = map.get(a.genre) || [];
      arr.push(a);
      map.set(a.genre, arr);
    }
    return [...map.entries()]
      .map(([label, roster]) => `<section style="margin-bottom:2.5rem"><p class="kicker" style="margin-bottom:1rem">${label}</p>${rowsFor(roster)}</section>`)
      .join("");
  }

  function paint() {
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: intro.kicker,
        title: intro.heading,
        sub: intro.sub,
        image: "assets/images/backgrounds/landing.jpg",
      })}
      ${QFR.tickerHTML()}
      <section class="wrap" style="padding-top:2rem">
        <p class="kicker">Filter by genre</p>
        <div class="chips" style="margin-top:1rem">
          <button class="chip ${genre === "all" ? "on" : ""}" data-g="all">All</button>
          ${genres.map((g) => `<button class="chip ${g === genre ? "on" : ""}" data-g="${g}">${g}</button>`).join("")}
        </div>
      </section>
      <div class="wrap py">${groupsHtml()}</div>`;
    QFR.bindTicker();
    document.querySelectorAll("[data-g]").forEach((b) => {
      b.onclick = () => {
        genre = b.dataset.g;
        paint();
      };
    });
    document.querySelectorAll("[data-listen]").forEach((b) => {
      b.onclick = () => QFR.playRandom({ artistId: b.dataset.listen });
    });
  }

  paint();
});
