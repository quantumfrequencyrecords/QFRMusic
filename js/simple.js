QFR.ready(document.body.dataset.page).then(() => {
  const page = document.body.dataset.page;
  const map = {
    store: {
      img: "assets/images/backgrounds/store.jpg",
      kicker: "Coming online",
      title: "The Store",
      body: "Merchandise, physical and digital releases, and artist products are a planned expansion. Payments will never run through this static public site.",
    },
    about: null,
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
      <section style="position:relative;overflow:hidden;min-height:70vh;display:grid;place-items:center;text-align:center">
        <img src="${QFR.asset(d.img)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.45">
        <div style="position:absolute;inset:0;background:linear-gradient(transparent,var(--bg))"></div>
        <div class="wrap" style="position:relative;padding:6rem 1.25rem">
          <p class="kicker">${d.kicker}</p>
          <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">${d.title}</h1>
          <p class="muted" style="max-width:32rem;margin:1.25rem auto 0">${d.body}</p>
          <p style="margin-top:2rem"><a class="btn btn-primary" href="${QFR.page("pages/contact.html")}">Store suggestions</a></p>
        </div>
      </section>`;
  } else {
    document.getElementById("app").innerHTML = `<article class="wrap py" style="max-width:42rem"><h1 style="font-size:3rem">${d.title}</h1><p class="muted">${d.body}</p></article>`;
  }
});
