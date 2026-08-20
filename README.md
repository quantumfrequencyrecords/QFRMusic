# Quantum Frequency Records

Cinematic public website for **Quantum Frequency Records** — an independent label universe, not a corporate brochure.

This repository is a **static GitHub Pages site**. JSON is the single source of truth. One universal artist template (`pages/artist.html?id=buckshot-bourbon`) serves the entire roster. Adding an artist is a data + asset change, not a new HTML site.

## Pages

| URL | Role |
|---|---|
| `/` (`index.html`) | Landing — logo, headline, glowing *Discover • Harness • Nurture • Succeed*, particles, Enter CTA |
| `/pages/home.html` | Label dashboard — mission 3×3, Latest cards, Hot & Trending |
| `/pages/artists.html` | Roster + moving logo ticker |
| `/pages/artist.html?id=` | Artist mini-site (Home / News / Members / Releases / Songs / Videos / Gallery / Biography) |
| `/pages/news.html` | Editorial |
| `/pages/music.html` | Catalog + filters + player |
| `/pages/videos.html` | Video discovery |
| `/pages/gallery.html` | Visuals |
| `/pages/about.html` | Philosophy, origin, artist-first, beyond-genre, AI context, future |
| `/pages/contact.html` | Dynamic inquiry form |
| `/pages/store.html` | Store placeholder (future commerce backend) |

Sticky header, left mobile drawer (full nav), identical footer, frequency separators, and a collapsible **Now Playing** bar persist across the universe.

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

Open `/` then **Enter the Experience**.

## Important boundaries

- GitHub Pages is not an application server. Do not put SMTP credentials, payment processing, or private databases here.
- Contact delivery: set `form.endpoint` in `data/site.json` to Formspree (or similar).
- Replace placeholder artwork, audio, lyrics, and YouTube IDs before public promotion.
- The Store is intentionally a coming-soon surface until a secure commerce backend exists.
