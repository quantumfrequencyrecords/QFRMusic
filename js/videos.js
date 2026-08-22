QFR.ready("videos").then(() => {
  let cat = "all";
  const cats = [...new Set(QFR.videos.map((v) => v.category))];

  function videoBlock(v) {
    if (v.youtubeId) {
      return `<iframe title="${v.title}" style="aspect-ratio:16/9;width:100%;border:0" src="https://www.youtube-nocookie.com/embed/${v.youtubeId}" allowfullscreen></iframe>`;
    }
    return `<div style="position:relative;aspect-ratio:16/9"><img src="${QFR.asset(v.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;display:grid;place-items:center;background:color-mix(in srgb,var(--bg) 45%,transparent)">Featured video placeholder. Add a YouTube ID in data/videos.json.</div></div>`;
  }

  function paint() {
    const items = [...QFR.videos]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((v) => cat === "all" || v.category === cat);
    const feature = items[0];
    const rest = items.slice(1);
    const fa = feature ? QFR.getArtist(feature.artistId) : null;
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: "Moving image",
        title: "Videos.",
        sub: "Official videos, live cuts, and visual worlds from across the roster.",
        image: "assets/images/backgrounds/landing.jpg",
      })}
      <section class="wrap" style="padding:2rem 1.25rem">
        <div class="chips">
          <button class="chip ${cat === "all" ? "on" : ""}" data-c="all">All</button>
          ${cats.map((c) => `<button class="chip ${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join("")}
        </div>
      </section>
      ${
        feature
          ? `<section class="wrap"><div class="card">${videoBlock(feature)}<div class="body"><p class="tiny">${feature.category}</p><h2 style="font-size:2rem">${feature.title}</h2><p class="muted">${fa?.name || ""} · ${QFR.date(feature.date)} · ${QFR.fmtCompact(feature.views.month)} views</p></div></div></section>`
          : ""
      }
      <section class="wrap py"><div class="cards three">${rest
        .map((v) => {
          const a = QFR.getArtist(v.artistId);
          return `<article class="card"><img class="cover" src="${QFR.asset(v.thumbnail)}" alt=""><div class="body"><p class="tiny">${v.category}</p><h3>${v.title}</h3><p class="muted">${a?.name || ""} · ${QFR.date(v.date)}</p></div></article>`;
        })
        .join("")}</div></section>`;
    document.querySelectorAll("[data-c]").forEach((b) => {
      b.onclick = () => {
        cat = b.dataset.c;
        paint();
      };
    });
  }
  paint();
});
