QFR.ready("contact").then(() => {
  const types = QFR.site.inquiryTypes;
  let reason = types[0].id, artistId="", sent=false;
  function paint() {
    const cur = types.find(t=>t.id===reason) || types[0];
    const f = new Set(cur.fields);
    const albums = artistId ? QFR.artistReleases(artistId) : [];
    const songs = artistId ? QFR.artistSongs(artistId) : [];
    const vids = artistId ? QFR.artistVideos(artistId) : [];
    const sel = (name, label, opts, req=true) => `<label class="field">${label}<select name="${name}" ${req?"required":""}><option value="">Select</option>${opts}</select></label>`;
    document.getElementById("app").innerHTML = `
      <section style="position:relative;overflow:hidden">
        <img src="${QFR.asset("assets/images/backgrounds/contact.jpg")}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.4">
        <div style="position:absolute;inset:0;background:linear-gradient(transparent,var(--bg))"></div>
        <div class="wrap" style="position:relative;padding:4rem 1.25rem">
          <p class="kicker">Transmission</p>
          <h1 style="font-size:clamp(2.6rem,7vw,4.5rem);margin-top:.75rem">Contact Us</h1>
          <p class="muted" style="max-width:36rem">Choose a reason and the form reveals the fields we need. Email credentials never live in this site.</p>
        </div>
      </section>
      <section class="wrap py" style="display:grid;gap:2.5rem">
        ${sent?`<div class="card"><div class="body"><h2>Thank you</h2><p class="muted">Your message is in the queue.</p><button class="btn btn-ghost" id="again">Send another</button></div></div>`:`
        <form class="form" id="cf">
          <label class="field">Your name<input name="name" required></label>
          <label class="field">Email<input type="email" name="email" required></label>
          <label class="field">Reason<select name="reason" id="reason">${types.map(t=>`<option value="${t.id}" ${t.id===reason?"selected":""}>${t.label}</option>`).join("")}</select></label>
          ${f.has("artist")?sel("artist","Artist", QFR.artists.map(a=>`<option value="${a.id}" ${a.id===artistId?"selected":""}>${a.name}</option>`)):""}
          ${f.has("album")?sel("album","Album / release", albums.map(r=>`<option value="${r.id}">${r.title}</option>`)):""}
          ${f.has("song")?sel("song","Song", songs.map(s=>`<option value="${s.id}">${s.title}</option>`)):""}
          ${f.has("contentType")?`<label class="field">Content type<select name="contentType"><option>song</option><option>video</option></select></label>`:""}
          ${f.has("video")?sel("video","Video", vids.map(v=>`<option value="${v.id}">${v.title}</option>`), false):""}
          ${f.has("videoTitle")?`<label class="field">Video title / description<input name="videoTitle"></label>`:""}
          ${f.has("role")?`<label class="field">Your role<input name="role"></label>`:""}
          ${f.has("links")?`<label class="field">Links / references<input name="links"></label>`:""}
          <label class="field">Message<textarea name="message" required rows="6"></textarea></label>
          <button class="btn btn-primary" type="submit">Send transmission</button>
          <p class="muted" style="font-size:.75rem">${QFR.site.form.note}</p>
        </form>`}
        <aside class="card"><div class="body">
          <p class="tiny">Direct</p>
          <p>General<br><a href="mailto:${QFR.site.contact.email}">${QFR.site.contact.email}</a></p>
          <p>Press<br><a href="mailto:${QFR.site.contact.press}">${QFR.site.contact.press}</a></p>
          <p>Bookings<br><a href="mailto:${QFR.site.contact.bookings}">${QFR.site.contact.bookings}</a></p>
        </div></aside>
      </section>`;
    const reasonEl = document.getElementById("reason");
    if (reasonEl) reasonEl.onchange = e => { reason = e.target.value; paint(); };
    const artistSel = document.querySelector('select[name="artist"]');
    if (artistSel) artistSel.onchange = e => { artistId = e.target.value; paint(); };
    const form = document.getElementById("cf");
    if (form) form.onsubmit = async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = QFR.site.form.endpoint;
      if (endpoint) {
        try { await fetch(endpoint, { method:"POST", headers:{Accept:"application/json","Content-Type":"application/json"}, body: JSON.stringify(data)}); }
        catch { alert("Could not send just now."); return; }
      }
      sent = true; paint();
    };
    const again = document.getElementById("again");
    if (again) again.onclick = () => { sent=false; paint(); };
  }
  paint();
});
