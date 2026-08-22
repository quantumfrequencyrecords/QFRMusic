QFR.ready("about").then(() => {
  const s = QFR.site;
  const a = s.about;
  document.getElementById("app").innerHTML = `
    ${QFR.pageHero({
      kicker: "The label",
      title: a.heroTitle,
      sub: a.heroSub,
      image: "assets/images/backgrounds/about.jpg",
      actions: `<a class="btn btn-primary" href="${QFR.page("pages/contact.html")}">Join the frequency</a>
                <a class="btn btn-ghost" href="${QFR.page("pages/artists.html")}">Meet the roster</a>`,
    })}

    <section class="wrap section" style="display:grid;gap:2.5rem">
      <div class="about-split">
        <div>
          <p class="kicker">Our story</p>
          <h2 style="font-size:2.4rem;margin-top:.4rem">Not a traditional label</h2>
          <p class="muted" style="margin-top:1.25rem;line-height:1.7">${a.origin}</p>
          <p style="margin-top:1rem;line-height:1.7">${a.artistFirst}</p>
        </div>
        <img src="${QFR.asset("assets/images/backgrounds/music-studio.jpg")}" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border:1px solid var(--border)">
      </div>
    </section>

    <div class="wrap">
      <div class="timeline">${s.timeline
        .map(
          (t) => `<div>
        <p style="font-family:var(--font-display);font-size:2rem;color:var(--accent)">${t.year}</p>
        <p style="margin-top:.5rem">${t.title}</p>
        <p class="muted" style="margin-top:.5rem;font-size:.8rem;line-height:1.5">${t.note}</p>
      </div>`,
        )
        .join("")}</div>
    </div>

    <div class="wrap" style="padding:2.5rem 1.25rem"><div class="freq"></div></div>

    <section class="wrap">
      <p class="kicker">Our mission</p>
      <h2 style="font-size:2.4rem;margin-top:.4rem">How we actually operate</h2>
      <div class="cards three" style="margin-top:2rem">${s.missionPillars
        .map(
          (p) => `<article class="card"><div class="body"><h3 style="font-size:2rem">${p.title}</h3><p class="muted" style="margin-top:.75rem;line-height:1.6">${p.note}</p></div></article>`,
        )
        .join("")}</div>
    </section>

    <section class="wrap section" style="text-align:center">
      <p class="kicker">The frequency philosophy</p>
      <blockquote style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,3rem);max-width:48rem;margin:1rem auto 0">“${a.quote}”</blockquote>
      <div class="cards three" style="margin-top:2.5rem;text-align:left">${s.philosophySteps
        .map(
          (p) => `<div class="card"><div class="body"><p style="font-family:var(--font-display);font-size:2rem;color:var(--accent)">${p.title}</p><p class="muted" style="margin-top:.75rem">${p.note}</p></div></div>`,
        )
        .join("")}</div>
    </section>

    <div class="wrap"><div class="freq"></div></div>

    <section class="wrap section">
      <p class="kicker">Meet the team</p>
      <h2 style="font-size:2.4rem;margin-top:.4rem">The people behind the platform</h2>
      <div class="members">${s.team
        .map(
          (m) => `<figure>
        <img src="${QFR.asset(m.image)}" alt="${m.name}">
        <figcaption>
          <p style="font-family:var(--font-display);font-size:1.5rem">${m.name}</p>
          <p class="tiny">${m.role}</p>
          <p class="muted" style="margin-top:.5rem;font-size:.9rem">${m.bio}</p>
        </figcaption>
      </figure>`,
        )
        .join("")}</div>
    </section>

    <section class="wrap">
      <div class="cards" style="grid-template-columns:1fr 1fr">${s.numbers
        .map(
          (n) => `<div class="card" style="text-align:center;padding:1.5rem 1rem">
        <p style="font-family:var(--font-display);font-size:3rem;color:var(--accent)">${n.value}</p>
        <p class="tiny" style="margin-top:.5rem">${n.label}</p>
      </div>`,
        )
        .join("")}</div>
    </section>

    <section class="wrap section">
      <p class="kicker">What artists say</p>
      <div class="cards three" style="margin-top:1.5rem">${s.quotes
        .map(
          (q) => `<blockquote class="card"><div class="body"><p style="line-height:1.6">“${q.quote}”</p><footer class="tiny" style="margin-top:1rem">${q.artist}</footer></div></blockquote>`,
        )
        .join("")}</div>
    </section>

    <section class="wrap" style="padding-bottom:4rem">
      <div class="card" style="text-align:center;padding:3rem 1.5rem;border-color:color-mix(in srgb,var(--accent) 40%, transparent)">
        <h2 style="font-size:clamp(2rem,5vw,3.2rem)">Ready to join the frequency?</h2>
        <p class="muted" style="max-width:32rem;margin:1rem auto 0">${a.mission}</p>
        <p style="margin-top:2rem"><a class="btn btn-primary" href="${QFR.page("pages/contact.html")}">Contact us</a></p>
      </div>
    </section>`;

  const split = document.querySelector(".about-split");
  if (split && window.matchMedia("(min-width:768px)").matches) {
    split.style.display = "grid";
    split.style.gridTemplateColumns = "1fr 1fr";
    split.style.gap = "2.5rem";
    split.style.alignItems = "center";
  }
  const nums = document.querySelector(".wrap .cards[style*='1fr 1fr']");
  if (nums && window.matchMedia("(min-width:768px)").matches) {
    nums.style.gridTemplateColumns = "repeat(4,1fr)";
  }
});
