QFR.ready("music").then(() => {
  let genre = "all",
    releaseId = "all",
    year = "all";
  const years = [...new Set(QFR.songs.map((s) => s.date.slice(0, 4)))].sort().reverse();
  const genres = [...new Set(QFR.artists.flatMap((a) => [a.genre, ...a.genres]))].sort();

  function paint() {
    const list = QFR.songs.filter((s) => {
      if (releaseId !== "all" && s.releaseId !== releaseId) return false;
      if (year !== "all" && !s.date.startsWith(year)) return false;
      if (genre !== "all") {
        const a = QFR.getArtist(s.artistId);
        if (!(s.genre === genre || a?.genre === genre || a?.genres.includes(genre))) return false;
      }
      return true;
    });
    document.getElementById("app").innerHTML = `
      ${QFR.pageHero({
        kicker: "Catalog",
        title: "Music.",
        sub: "The full QFR catalog. Play authorized local audio in the persistent player, or open lyrics until a stream embed is wired in.",
        image: "assets/images/backgrounds/music-studio.jpg",
      })}
      <section class="wrap py">
        <div style="display:grid;gap:.75rem" class="cards" id="filters">
          <label class="field">Genre<select id="fg"><option value="all">All genres</option>${genres.map((g) => `<option ${g === genre ? "selected" : ""}>${g}</option>`).join("")}</select></label>
          <label class="field">Release<select id="fr"><option value="all">All releases</option>${QFR.releases.map((r) => `<option value="${r.id}" ${r.id === releaseId ? "selected" : ""}>${r.title}</option>`).join("")}</select></label>
          <label class="field">Year<select id="fy"><option value="all">All years</option>${years.map((y) => `<option ${y === year ? "selected" : ""}>${y}</option>`).join("")}</select></label>
        </div>
      </section>
      <section class="wrap" style="padding-bottom:4rem"><ul class="list">${list
        .map((s) => {
          const a = QFR.getArtist(s.artistId);
          const r = QFR.getRelease(s.releaseId);
          return `<li class="row"><img src="${QFR.asset(s.artwork)}" alt=""><div style="flex:1;min-width:0"><b>${s.title}</b><div class="muted" style="font-size:.75rem">${a?.name || ""} · ${r?.title || ""} · ${QFR.date(s.date)}</div></div><button class="btn btn-ghost" data-ly="${s.id}">Lyrics</button><button class="play-mini" data-play="${s.id}" aria-label="Play">▶</button></li><pre class="lyrics" id="ly-${s.id}" hidden>${s.lyrics}</pre>`;
        })
        .join("")}</ul></section>`;
    document.getElementById("filters").style.gridTemplateColumns = "repeat(auto-fit,minmax(12rem,1fr))";
    document.getElementById("fg").onchange = (e) => {
      genre = e.target.value;
      paint();
    };
    document.getElementById("fr").onchange = (e) => {
      releaseId = e.target.value;
      paint();
    };
    document.getElementById("fy").onchange = (e) => {
      year = e.target.value;
      paint();
    };
    document.querySelectorAll("[data-play]").forEach((b) => (b.onclick = () => QFR.playSong(b.dataset.play)));
    document.querySelectorAll("[data-ly]").forEach((b) => {
      b.onclick = () => {
        const el = document.getElementById("ly-" + b.dataset.ly);
        el.hidden = !el.hidden;
      };
    });
  }
  paint();
});
