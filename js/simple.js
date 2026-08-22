QFR.ready(document.body.dataset.page).then(() => {
  const page = document.body.dataset.page;
  const map = {
    store: {
      img: "assets/images/backgrounds/store.jpg",
      kicker: "Coming online",
      title: "The Store.",
      body: "Merchandise, physical and digital releases, and artist products are a planned expansion. Payments will never run through this public site — they’ll sit on a secure commerce backend when the doors open.",
    },
    privacy: {
      title: "Privacy",
      body: "Quantum Frequency Records collects only what you choose to send — newsletter emails and contact-form submissions. We do not sell personal data. Form delivery is handled by a trusted third-party endpoint you configure (for example Formspree); SMTP credentials are never stored in this client. Replace this placeholder policy with counsel-reviewed legal copy before public launch.",
    },
    terms: {
      title: "Terms",
      body: "The QFR website presents a public catalog of artists, recordings, images, and editorial content. All catalog materials remain the property of Quantum Frequency Records and/or the credited artists. Placeholder audio, artwork, and copy on this build are for layout and workflow only and must be replaced with authorized assets before public promotion.",
    },
  };
  const d = map[page];
  if (!d) return;
  if (d.img) {
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: d.kicker,
        title: d.title,
        sub: d.body,
        image: d.img,
        actions: `<a class="btn btn-primary" href="${QFR.page("pages/contact.html")}">Store suggestions</a>
                  <a class="btn btn-ghost" href="${QFR.page("pages/music.html")}">Browse the catalog</a>`,
      })}
      <section class="wrap py" style="text-align:center;max-width:42rem">
        <p class="muted">When merch launches, artist pages will filter the store by roster member. Until then every merch tab on an artist page points here.</p>
      </section>`;
  } else {
    document.getElementById("app").innerHTML = `<article class="wrap py" style="max-width:42rem"><h1 style="font-size:3rem">${d.title}</h1><p class="muted" style="margin-top:1.25rem;line-height:1.7">${d.body}</p></article>`;
  }
});
