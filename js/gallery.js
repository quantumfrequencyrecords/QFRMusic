QFR.ready("gallery").then(() => {
  let cat = "All";
  const cats = ["All", "Live Performances", "Band Members", "Studio", "Events", "Behind The Scenes"];

  function paint() {
    const items = QFR.gallery.filter((g) => cat === "All" || g.category === cat);
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: "Visuals",
        title: "Gallery.",
        sub: "Live performances, members, studio, events, and behind the scenes — from the same JSON catalog that powers every artist page.",
        image: "assets/images/backgrounds/about.jpg",
      })}
      <section class="wrap" style="padding:2rem 1.25rem">
        <div class="chips">${cats.map((c) => `<button class="chip ${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join("")}</div>
      </section>
      <section class="wrap" style="padding-bottom:4rem"><div class="gal">${items
        .map((g) => {
          const a = QFR.getArtist(g.artistId);
          return `<button type="button" data-lb="${QFR.asset(g.image)}"><img src="${QFR.asset(g.image)}" alt="${g.caption}" style="aspect-ratio:3/2;width:100%;object-fit:cover"><span style="display:block;background:var(--surface);padding:.75rem;text-align:left"><span class="tiny">${g.category}</span><span style="display:block">${a?.name || ""}</span></span></button>`;
        })
        .join("")}</div></section>`;
    document.querySelectorAll("[data-c]").forEach((b) => {
      b.onclick = () => {
        cat = b.dataset.c;
        paint();
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
  }
  paint();
});
