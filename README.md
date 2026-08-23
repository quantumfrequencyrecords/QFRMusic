# Quantum Frequency Records

Cinematic public website for **Quantum Frequency Records** — an independent label universe, not a corporate brochure.

This repository is a **static GitHub Pages site**. JSON is the single source of truth. One universal artist template (`pages/artist.html?id=buckshot-bourbon`) serves the entire roster. Adding an artist is a data + asset change, not a new HTML site.

## Pages

| URL | Role |
|---|---|
| `/` (`index.html`) | Landing — no chrome, watermarked QF mark, particles, sequential glow *Discover · Harness · Partner · Succeed*, Explore → home |
| `/pages/home.html` | Studio hero, 9-value ring, 5 Latest cards, Hottest & Trending (Weekly / Monthly / Yearly) |
| `/pages/artists.html` | Roster + moving logo ticker (hover pause, left/right, genre filter) |
| `/pages/artist.html?id=` | Artist mini-site (Profile / News / Music / Videos / Members / Gallery / Merch) |
| `/pages/news.html` | Editorial — filters All / Label / Artist / Releases |
| `/pages/music.html` | Catalog + genre / release / year filters + player |
| `/pages/videos.html` | Video discovery |
| `/pages/gallery.html` | Visuals |
| `/pages/about.html` | Story, timeline, mission, Discover / Develop / Deliver, team, numbers, quotes |
| `/pages/contact.html` | Purpose tiles that reshape the form |
| `/pages/store.html` | Store placeholder (future commerce backend) |

Sticky collapsible header (menu + favicon mark + “Quantum Frequency Records” + Store), left drawer, flat Stay Connected footer, frequency separators, and a **Now Playing** bar that docks to the side persist across the universe.

## Data

JSON in `/data` drives the site. Latest home cards live as separate files:

- `data/values.json` — nine values
- `data/latest/label-news.json`
- `data/latest/artist-news.json`
- `data/latest/signed-artist.json`
- `data/latest/album.json`
- `data/latest/song.json`
- `data/trending/song.json`
- `data/trending/album.json`
- `data/trending/artist.json`
- `data/trending/video.json`

## Publish on GitHub Pages

1. Repo **Settings → Pages**
2. Deploy from branch **`main`**, folder **`/ (root)`**
3. Site: `https://quantumfrequencyrecords.github.io/QFRMusic/`

Full replacement lists (every image, JSON, audio file, and what to put in it) live in **[ASSETS.md](ASSETS.md)**.

## Local preview

Any static server from the repo root, for example:

```bash
python3 -m http.server 8080
```

Open `/` then **Explore**.

## Important boundaries

- GitHub Pages is not an application server. Do not put SMTP credentials, payment processing, or private databases here.
- Contact delivery: set `form.endpoint` in `data/site.json` to Formspree (or similar).
- Replace placeholder artwork, audio, lyrics, and YouTube IDs before public promotion.
- The Store is intentionally a coming-soon surface until a secure commerce backend exists.
