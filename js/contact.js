QFR.ready("contact").then(() => {
  const types = QFR.site.inquiryTypes;
  let reason = types[0].id;
  let artistId = "";
  let sent = false;
  let openFaq = 0;

  function paint() {
    const cur = types.find((t) => t.id === reason) || types[0];
    const f = new Set(cur.fields);
    const albums = artistId ? QFR.artistReleases(artistId) : [];
    const songs = artistId ? QFR.artistSongs(artistId) : [];
    const vids = artistId ? QFR.artistVideos(artistId) : [];
    const sel = (name, label, opts, req = true) =>
      `<label class="field">${label}<select name="${name}" ${req ? "required" : ""}><option value="">Select</option>${opts}</select></label>`;

    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: "Transmission",
        title: "Let’s Create Something Amazing.",
        sub: "Questions, licensing, collaborations, partnerships, feedback — tell us how we can help.",
        image: "assets/images/backgrounds/contact.jpg",
      })}
      <section class="wrap section">
        <p class="kicker">How can we help today?</p>
        <div class="purpose" style="margin-top:1.25rem">${types
          .map(
            (t) =>
              `<button type="button" data-r="${t.id}" class="${t.id === reason ? "on" : ""}">${t.label}</button>`,
          )
          .join("")}</div>
      </section>
      <section class="wrap" style="display:grid;gap:2.5rem;padding-bottom:2rem" id="contact-grid">
        ${
          sent
            ? `<div class="card"><div class="body"><h2 style="font-size:2rem">Thank you</h2><p class="muted" style="margin-top:.75rem">Your message is in the queue. If you included a catalog selection, it will travel with the rest of the form.</p><button class="btn btn-ghost" id="again" style="margin-top:1.5rem">Send another</button></div></div>`
            : `<form class="form" id="cf">
          <p class="tiny">You selected · ${cur.label}</p>
          <div style="display:grid;gap:1rem" class="name-row">
            <label class="field">First name<input name="firstName" required></label>
            <label class="field">Last name<input name="lastName" required></label>
          </div>
          <label class="field">Email<input type="email" name="email" required></label>
          ${f.has("artist") ? sel("artist", "Artist", QFR.artists.map((a) => `<option value="${a.id}" ${a.id === artistId ? "selected" : ""}>${a.name}</option>`).join("")) : ""}
          ${f.has("album") ? sel("album", "Album / release", albums.map((r) => `<option value="${r.id}">${r.title}</option>`).join("")) : ""}
          ${f.has("song") ? sel("song", "Song", songs.map((s) => `<option value="${s.id}">${s.title}</option>`).join("")) : ""}
          ${f.has("contentType") ? `<label class="field">Content type<select name="contentType"><option value="song">Song</option><option value="video">Video</option></select></label>` : ""}
          ${f.has("video") ? sel("video", "Video", vids.map((v) => `<option value="${v.id}">${v.title}</option>`).join(""), false) : ""}
          ${f.has("videoTitle") ? `<label class="field">Video title / description<input name="videoTitle"></label>` : ""}
          ${f.has("role") ? `<label class="field">Your role<input name="role"></label>` : ""}
          ${f.has("links") ? `<label class="field">Links / references<input name="links"></label>` : ""}
          <label class="field">Message<textarea name="message" required rows="6"></textarea></label>
          <input type="hidden" name="reason" value="${reason}">
          <button class="btn btn-primary" type="submit">Send transmission</button>
          <p class="muted" style="font-size:.75rem">${QFR.site.form.note}</p>
        </form>`
        }
        <aside class="card" style="height:fit-content"><div class="body">
          <p class="tiny">Direct</p>
          <p class="muted" style="margin-top:1rem">General<br><a href="mailto:${QFR.site.contact.email}">${QFR.site.contact.email}</a></p>
          <p class="muted" style="margin-top:.75rem">Press<br><a href="mailto:${QFR.site.contact.press}">${QFR.site.contact.press}</a></p>
          <p class="muted" style="margin-top:.75rem">Bookings<br><a href="mailto:${QFR.site.contact.bookings}">${QFR.site.contact.bookings}</a></p>
          ${QFR.socialIcons("social-row")}
        </aside>
      </section>
      <section class="wrap" style="padding-bottom:4rem">
        <p class="kicker">Frequently asked</p>
        <div class="card" style="margin-top:1.25rem">${QFR.site.faqs
          .map(
            (faq, i) => `<button type="button" class="faq" data-faq="${i}" style="display:block;width:100%;text-align:left;padding:1rem 1.25rem;border-bottom:1px solid var(--border)">
          <p style="font-family:var(--font-display);font-size:1.3rem">${faq.q}</p>
          ${openFaq === i ? `<p class="muted" style="margin-top:.5rem;line-height:1.6">${faq.a}</p>` : ""}
        </button>`,
          )
          .join("")}</div>
        <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2.5rem">
          <a class="btn btn-ghost" href="${QFR.page("pages/artists.html")}">Explore artists</a>
          <a class="btn btn-line" href="${QFR.page("pages/store.html")}">Visit the store</a>
        </div>
      </section>`;

    const grid = document.getElementById("contact-grid");
    if (grid && window.matchMedia("(min-width:768px)").matches) {
      grid.style.gridTemplateColumns = "1fr 280px";
    }
    const names = document.querySelector(".name-row");
    if (names && window.matchMedia("(min-width:640px)").matches) {
      names.style.gridTemplateColumns = "1fr 1fr";
    }
    document.querySelectorAll("[data-r]").forEach((b) => {
      b.onclick = () => {
        reason = b.dataset.r;
        paint();
      };
    });
    const artistSel = document.querySelector('select[name="artist"]');
    if (artistSel)
      artistSel.onchange = (e) => {
        artistId = e.target.value;
        paint();
      };
    const form = document.getElementById("cf");
    if (form)
      form.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const endpoint = QFR.site.form.endpoint;
        if (endpoint) {
          try {
            await fetch(endpoint, {
              method: "POST",
              headers: { Accept: "application/json", "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
          } catch {
            alert("Could not send just now. Try again, or email the label directly.");
            return;
          }
        }
        sent = true;
        paint();
      };
    const again = document.getElementById("again");
    if (again)
      again.onclick = () => {
        sent = false;
        paint();
      };
    document.querySelectorAll("[data-faq]").forEach((b) => {
      b.onclick = () => {
        const i = Number(b.dataset.faq);
        openFaq = openFaq === i ? null : i;
        paint();
      };
    });
  }
  paint();
});
