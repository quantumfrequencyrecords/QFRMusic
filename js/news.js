QFR.ready("news").then(() => {
  let kind = "all";
  const filters = [
    { id: "all", label: "All News" },
    { id: "label", label: "Label News" },
    { id: "artist", label: "Artist News" },
    { id: "releases", label: "Releases" },
  ];

  function paint() {
    const items = QFR.filterNews(kind);
    const feature = items[0];
    const rest = items.slice(1);
    const featureArtist = feature && feature.artistIds[0] ? QFR.getArtist(feature.artistIds[0]) : null;
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: "Transmissions",
        title: "The Frequency Never Stops.",
        sub: "The latest news, stories and updates from Quantum Frequency Records.",
        image: "assets/images/backgrounds/contact.jpg",
      })}
      <section class="wrap" style="padding:2rem 1.25rem">
        <div class="chips">${filters
          .map((f) => `<button class="chip ${f.id === kind ? "on" : ""}" data-k="${f.id}">${f.label}</button>`)
          .join("")}</div>
      </section>
      ${
        feature
          ? `<section class="wrap" style="display:grid;gap:1.25rem">
        <div style="display:grid;gap:1.25rem" class="news-split">
          <article class="latest-detail" style="margin:0;min-height:22rem">
            <img src="${QFR.asset(feature.image)}" alt="">
            <div class="cap">
              <p class="tiny">${feature.category} · ${QFR.date(feature.date)}</p>
              <h2 style="font-size:clamp(1.8rem,4vw,3rem);margin-top:.4rem">${feature.headline}</h2>
              <p style="margin-top:1rem;line-height:1.6">${feature.body}</p>
              ${featureArtist ? `<a class="tiny" style="display:inline-block;margin-top:1.25rem" href="${QFR.artistUrl(featureArtist.id, "news")}">${featureArtist.name} →</a>` : ""}
            </div>
          </article>
          <aside class="card"><div class="body">
            <p class="tiny">Latest</p>
            <ul style="list-style:none;padding:0;margin:1rem 0 0">
              ${rest
                .slice(0, 4)
                .map(
                  (n) => `<li style="border-bottom:1px solid var(--border);padding:0 0 1rem;margin-bottom:1rem">
                <p class="muted" style="font-size:.65rem;letter-spacing:.16em;text-transform:uppercase">${n.category} · ${QFR.date(n.date)}</p>
                <p style="font-family:var(--font-display);font-size:1.3rem;margin-top:.25rem">${n.headline}</p>
              </li>`,
                )
                .join("")}
            </ul>
          </div></aside>
        </div>
      </section>`
          : ""
      }
      <section class="wrap py"><div class="cards three">${rest
        .map((n) => {
          const a = n.artistIds[0] ? QFR.getArtist(n.artistIds[0]) : null;
          return `<article class="card"><img class="cover" src="${QFR.asset(n.image)}" alt=""><div class="body"><p class="tiny">${n.category} · ${QFR.date(n.date)}</p><h3 style="font-size:1.5rem;margin-top:.4rem">${n.headline}</h3><p class="muted" style="margin-top:.5rem">${n.excerpt}</p>${a ? `<a class="tiny" style="display:inline-block;margin-top:1rem" href="${QFR.artistUrl(a.id, "news")}">Related artist</a>` : ""}</div></article>`;
        })
        .join("")}</div></section>`;
    const split = document.querySelector(".news-split");
    if (split && window.matchMedia("(min-width:768px)").matches) {
      split.style.gridTemplateColumns = "1.4fr .8fr";
    }
    document.querySelectorAll("[data-k]").forEach((b) => {
      b.onclick = () => {
        kind = b.dataset.k;
        paint();
      };
    });
  }
  paint();
});
