QFR.ready("artists").then(() => {
  const intro = QFR.site.artistsIntro;
  const logos = [...QFR.artists, ...QFR.artists]
    .map((a, i) => `<a href="${QFR.artistUrl(a.id)}" title="${a.name}"><img src="${QFR.asset(a.logo)}" alt="${a.name}"></a>`)
    .join("");
  const rows = QFR.artists.map((a, i) => `
    <article>
      <div class="artist-row ${i%2?"flip":""}">
        <a class="pic" href="${QFR.artistUrl(a.id)}">
          <img src="${QFR.asset(a.image)}" alt="${a.name}">
          <div class="cap"><h2 style="font-size:2.2rem">${a.name}</h2><p class="tiny">${a.genre}</p></div>
        </a>
        <div class="copy">
          <p class="muted" style="letter-spacing:.22em;text-transform:uppercase;font-size:.75rem">Hometown: ${a.hometown}</p>
          <p>${a.description}</p>
          <div class="row-actions">
            <a class="btn btn-ghost" href="${QFR.artistUrl(a.id,"members")}">${a.type==="solo"?"Meet The Artist":"Meet The Band"}</a>
            <a class="btn btn-line" href="${QFR.artistUrl(a.id)}">Visit Artist</a>
            <button class="btn btn-primary" type="button" data-listen="${a.id}">Listen Now</button>
          </div>
        </div>
      </div>
      ${i < QFR.artists.length-1 ? '<div class="freq"></div>' : ""}
    </article>`).join("");
  document.getElementById("app").innerHTML = `
    <section class="wrap py">
      <p class="kicker">${intro.kicker}</p>
      <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">${intro.heading}</h1>
      <p class="muted" style="max-width:36rem">${intro.sub}</p>
    </section>
    <div class="ticker"><div class="ticker-track">${logos}</div></div>
    <div class="wrap">${rows}</div>
    ${QFR.newsletterHTML()}`;
  document.querySelectorAll("[data-listen]").forEach((b) => b.onclick = () => QFR.playRandom({ artistId: b.dataset.listen }));
  const nl = document.getElementById("nl-form");
  if (nl) nl.onsubmit = (e) => { e.preventDefault(); nl.hidden = true; document.getElementById("nl-done").hidden = false; };
});
