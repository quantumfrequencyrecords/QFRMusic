QFR.ready("artists").then(() => {
  const intro = QFR.site.artistsIntro;
  const rows = QFR.artists
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

  document.getElementById("app").innerHTML = `
    ${QFR.pageHero({
      kicker: intro.kicker,
      title: intro.heading,
      sub: intro.sub,
      image: "assets/images/backgrounds/landing.jpg",
    })}
    ${QFR.tickerHTML()}
    <div class="wrap py">${rows}</div>`;
  QFR.bindTicker();
  document.querySelectorAll("[data-listen]").forEach((b) => {
    b.onclick = () => QFR.playRandom({ artistId: b.dataset.listen });
  });
});
