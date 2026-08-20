# QFR website — files to replace and how the system works

This repository is a **static GitHub Pages site**. JSON is the content database. HTML is the template. JavaScript renders the current catalog.

Live interactive preview of the same universe also exists as the Grok-built app; this folder is the Pages-ready handoff matching the spec.

## Enable GitHub Pages

1. Open **Settings → Pages** on this repository.
2. Source: **Deploy from a branch**.
3. Branch: `main` / folder: `/ (root)`.
4. Save. The site will publish at `https://quantumfrequencyrecords.github.io/QFRMusic/`.
5. Optional: add a custom domain later in the same Pages settings.

Do **not** put SMTP passwords, API secrets, or private email credentials in this repo. Contact forms post to the `form.endpoint` in `data/site.json` (Formspree or similar).

## How to add an artist (no page rewrite)

1. Add a record to `data/artists.json` with a unique `id` slug (example: `buckshot-bourbon`).
2. Add related records in `releases.json`, `songs.json`, `videos.json`, `news.json`, `gallery.json` using that same `artistId`.
3. Drop artwork into the paths listed below, using the same filenames the JSON points at.
4. Commit and push. GitHub Pages publishes the update. The artist appears in the ticker, Artists page, Music, Videos, News, Gallery, Contact dropdowns, Home trending, and `pages/artist.html?id=their-slug`.

## JSON files

| File | Purpose | What to include |
|---|---|---|
| `data/site.json` | Label identity | Name, tagline, headline, subtitle words, social URLs, contact emails, footer/legal, mission grid, inquiry types, Formspree endpoint, latest IDs, About copy |
| `data/artists.json` | Canonical roster | `id`, name, genre(s), hometown, formed, type (group/solo), tagline, description, biography, image/hero/logo paths, members[], stats, signedDate |
| `data/releases.json` | Albums / EPs / singles | `id`, `artistId`, title, type, date, artwork, `songIds`, description |
| `data/songs.json` | Playable catalog | `id`, title, `artistId`, `releaseId`, trackNumber, date, genre, artwork, audio path, lyrics, streams, duration, optional spotifyUrl |
| `data/videos.json` | Video discovery | `id`, `artistId`, title, platform, `youtubeId` (add real IDs), thumbnail, date, views, category, description |
| `data/news.json` | Editorial | `id`, date, headline, category, image, excerpt, body, `artistIds`, `releaseIds`, featured |
| `data/gallery.json` | Photography | `id`, `artistId`, image, category, date, location, caption |

### Example artist record

```json
{
  "id": "buckshot-bourbon",
  "name": "Buckshot Bourbon",
  "genre": "Country Rock",
  "genres": [
    "Country Rock",
    "Southern Rock",
    "Americana"
  ],
  "hometown": "Anywhere, NY",
  "formed": 2019,
  "type": "group",
  "tagline": "Dust, steel strings, and a second chance at midnight.",
  "description": "A country-rock outfit that treats the open road like a studio. Buckshot Bourbon writes bar-room hymns with arena-sized choruses \u2014 whiskey-warm guitars, stacked harmonies, and stories that refuse to sand off their edges.",
  "biography": "Buckshot Bourbon started as a Friday-night residency in a converted feed mill north of the city. What began as three-hour sets for regulars became a catalog of songs about work, weather, loyalty, and the kind of love that leaves boot prints. Quantum Frequency Records signed the group after a live tape of 'Last Call Gravity' circulated through the label's A&R circle. They remain proudly analog in spirit \u2014 tracking live when it serves the song \u2014 while using the label as a launchpad to take country-rock somewhere less expected.",
  "image": "/assets/images/artists/buckshot-bourbon.jpg",
  "hero": "/assets/images/artists/buck
  ...
]
```

### Example song record

```json
{
  "id": "bb-last-call-t1",
  "title": "Last Call Gravity",
  "artistId": "buckshot-bourbon",
  "releaseId": "bb-last-call",
  "trackNumber": 1,
  "date": "2025-03-21",
  "genre": "Country Rock",
  "artwork": "/assets/images/releases/bb-last-call.jpg",
  "audio": "/assets/audio/buckshot-bourbon.wav",
  "spotifyUrl": "",
  "duration": 180,
  "streams": {
    "week": 13815,
    "month": 69928,
    "ytd": 418459
  }
}
```

Replace `youtubeId` in `videos.json` with real YouTube video IDs to enable playback. Replace `form.endpoint` in `site.json` with your Formspree URL (example: `https://formspree.io/f/xxxxxx`). Replace `social` URLs with the live accounts.

## Images — full replacement list

All current files are **cinematic placeholders**. Keep the filename and path. Drop in the real file. Recommended: JPG for photos/artwork (1600px+ on the long edge), PNG for logos (512×512).

### Global / brand

| Path | What it is |
|---|---|
| `assets/images/qfr-logo.png` | Primary QFR circular logo (header/footer fallback; SVG mark is coded) |
| `assets/images/qfr-logo-256.png` | Smaller logo |
| `favicon.svg` | Browser tab icon |
| `og.jpg` | 1200×630 share card |
| `assets/images/backgrounds/landing.jpg` | Full-screen landing atmosphere |
| `assets/images/backgrounds/music-studio.jpg` | Home page studio photo (spec path) |
| `assets/images/backgrounds/about.jpg` | About hero |
| `assets/images/backgrounds/contact.jpg` | Contact hero |
| `assets/images/backgrounds/store.jpg` | Store coming-soon hero |

### Artist portraits, heroes, logos

| Path | Artist | Use |
|---|---|---|
| `assets/images/artists/buckshot-bourbon.jpg` | Buckshot Bourbon | Vertical portrait for artist cards |
| `assets/images/artists/buckshot-bourbon-hero.jpg` | Buckshot Bourbon | Wide hero on artist page + news |
| `assets/images/logos/buckshot-bourbon.png` | Buckshot Bourbon | Square logo for the moving ticker |
| `assets/images/artists/sawyer-kennedy.jpg` | Sawyer Kennedy | Vertical portrait for artist cards |
| `assets/images/artists/sawyer-kennedy-hero.jpg` | Sawyer Kennedy | Wide hero on artist page + news |
| `assets/images/logos/sawyer-kennedy.png` | Sawyer Kennedy | Square logo for the moving ticker |
| `assets/images/artists/fractal-hearts.jpg` | Fractal Hearts | Vertical portrait for artist cards |
| `assets/images/artists/fractal-hearts-hero.jpg` | Fractal Hearts | Wide hero on artist page + news |
| `assets/images/logos/fractal-hearts.png` | Fractal Hearts | Square logo for the moving ticker |
| `assets/images/artists/grassroots-rebellion.jpg` | Grassroots Rebellion | Vertical portrait for artist cards |
| `assets/images/artists/grassroots-rebellion-hero.jpg` | Grassroots Rebellion | Wide hero on artist page + news |
| `assets/images/logos/grassroots-rebellion.png` | Grassroots Rebellion | Square logo for the moving ticker |
| `assets/images/artists/warpnotix.jpg` | Warpnotix | Vertical portrait for artist cards |
| `assets/images/artists/warpnotix-hero.jpg` | Warpnotix | Wide hero on artist page + news |
| `assets/images/logos/warpnotix.png` | Warpnotix | Square logo for the moving ticker |
| `assets/images/artists/sound-shamans.jpg` | Sound Shamans | Vertical portrait for artist cards |
| `assets/images/artists/sound-shamans-hero.jpg` | Sound Shamans | Wide hero on artist page + news |
| `assets/images/logos/sound-shamans.png` | Sound Shamans | Square logo for the moving ticker |
| `assets/images/artists/immovable-giants.jpg` | Immovable Giants | Vertical portrait for artist cards |
| `assets/images/artists/immovable-giants-hero.jpg` | Immovable Giants | Wide hero on artist page + news |
| `assets/images/logos/immovable-giants.png` | Immovable Giants | Square logo for the moving ticker |
| `assets/images/artists/jones-beach-boys.jpg` | The Jones Beach Boys | Vertical portrait for artist cards |
| `assets/images/artists/jones-beach-boys-hero.jpg` | The Jones Beach Boys | Wide hero on artist page + news |
| `assets/images/logos/jones-beach-boys.png` | The Jones Beach Boys | Square logo for the moving ticker |
| `assets/images/artists/cosmic-run.jpg` | The Cosmic Run | Vertical portrait for artist cards |
| `assets/images/artists/cosmic-run-hero.jpg` | The Cosmic Run | Wide hero on artist page + news |
| `assets/images/logos/cosmic-run.png` | The Cosmic Run | Square logo for the moving ticker |
| `assets/images/artists/moonflower-radio.jpg` | Moonflower Radio | Vertical portrait for artist cards |
| `assets/images/artists/moonflower-radio-hero.jpg` | Moonflower Radio | Wide hero on artist page + news |
| `assets/images/logos/moonflower-radio.png` | Moonflower Radio | Square logo for the moving ticker |
| `assets/images/artists/find-replace.jpg` | Find/Replace | Vertical portrait for artist cards |
| `assets/images/artists/find-replace-hero.jpg` | Find/Replace | Wide hero on artist page + news |
| `assets/images/logos/find-replace.png` | Find/Replace | Square logo for the moving ticker |
| `assets/images/artists/immortal-prophets.jpg` | Immortal Prophets | Vertical portrait for artist cards |
| `assets/images/artists/immortal-prophets-hero.jpg` | Immortal Prophets | Wide hero on artist page + news |
| `assets/images/logos/immortal-prophets.png` | Immortal Prophets | Square logo for the moving ticker |
| `assets/images/artists/firewall-nation.jpg` | Firewall Nation | Vertical portrait for artist cards |
| `assets/images/artists/firewall-nation-hero.jpg` | Firewall Nation | Wide hero on artist page + news |
| `assets/images/logos/firewall-nation.png` | Firewall Nation | Square logo for the moving ticker |

### Member portraits

| Path | Person | Role |
|---|---|---|
| `assets/images/members/bb-cole.jpg` | Cole Harlan (Buckshot Bourbon) | Vocals / Guitar |
| `assets/images/members/bb-mae.jpg` | Mae Riven (Buckshot Bourbon) | Vocals / Fiddle |
| `assets/images/members/bb-dutch.jpg` | Dutch Keller (Buckshot Bourbon) | Bass |
| `assets/images/members/bb-rex.jpg` | Rex Lang (Buckshot Bourbon) | Drums |
| `assets/images/members/sk-sawyer.jpg` | Sawyer Kennedy (Sawyer Kennedy) | Vocals / Guitar / Writer |
| `assets/images/members/fh-nova.jpg` | Nova Ellison (Fractal Hearts) | Guitar / Vocals |
| `assets/images/members/fh-iris.jpg` | Iris Venn (Fractal Hearts) | Keys / Synths |
| `assets/images/members/fh-kal.jpg` | Kal Dreher (Fractal Hearts) | Bass |
| `assets/images/members/fh-jin.jpg` | Jin Park (Fractal Hearts) | Drums / Visuals |
| `assets/images/members/gr-tia.jpg` | Tia Morales (Grassroots Rebellion) | Vocals / Guitar |
| `assets/images/members/gr-benji.jpg` | Benji Crowe (Grassroots Rebellion) | Guitar |
| `assets/images/members/gr-pam.jpg` | Pam Okoye (Grassroots Rebellion) | Bass / Vocals |
| `assets/images/members/gr-otto.jpg` | Otto Finch (Grassroots Rebellion) | Drums |
| `assets/images/members/wn-wren.jpg` | Wren Nox (Warpnotix) | Producer / DJ |
| `assets/images/members/ss-rowan.jpg` | Rowan Hale (Sound Shamans) | Vocals / Guitar |
| `assets/images/members/ss-leah.jpg` | Leah Voss (Sound Shamans) | Guitar / Pedals |
| `assets/images/members/ss-mik.jpg` | Mik Santos (Sound Shamans) | Bass |
| `assets/images/members/ss-ada.jpg` | Ada Quinn (Sound Shamans) | Drums |
| `assets/images/members/ig-ellen.jpg` | Ellen Marsh (Immovable Giants) | Vocals / Guitar |
| `assets/images/members/ig-theo.jpg` | Theo Brant (Immovable Giants) | Guitar |
| `assets/images/members/ig-nori.jpg` | Nori Blake (Immovable Giants) | Bass / Vocals |
| `assets/images/members/ig-cam.jpg` | Cam Ruiz (Immovable Giants) | Drums |
| `assets/images/members/jb-nick.jpg` | Nick Ellery (The Jones Beach Boys) | Lead Guitar |
| `assets/images/members/jb-sam.jpg` | Sam Prieto (The Jones Beach Boys) | Vocals / Rhythm |
| `assets/images/members/jb-dewey.jpg` | Dewey Hart (The Jones Beach Boys) | Bass |
| `assets/images/members/jb-kit.jpg` | Kit Ambrose (The Jones Beach Boys) | Drums |
| `assets/images/members/cr-june.jpg` | June Calder (The Cosmic Run) | Vocals / Acoustic |
| `assets/images/members/cr-eli.jpg` | Eli Navarro (The Cosmic Run) | Electric Guitar |
| `assets/images/members/cr-posey.jpg` | Posey Lin (The Cosmic Run) | Bass / Vocals |
| `assets/images/members/cr-hart.jpg` | Hart Benson (The Cosmic Run) | Drums / Percussion |
| `assets/images/members/mr-lark.jpg` | Lark Emerson (Moonflower Radio) | Vocals / Guitar |
| `assets/images/members/mr-suki.jpg` | Suki Arden (Moonflower Radio) | Keys / Vocals |
| `assets/images/members/mr-paulie.jpg` | Paulie Trent (Moonflower Radio) | Bass |
| `assets/images/members/mr-dove.jpg` | Dove Kim (Moonflower Radio) | Drums |
| `assets/images/members/fr-hex.jpg` | Hex Calder (Find/Replace) | Vocals / Programming |
| `assets/images/members/fr-vex.jpg` | Vex Moreau (Find/Replace) | Guitar / Noise |
| `assets/images/members/fr-null.jpg` | Null Reyes (Find/Replace) | Bass / Synths |
| `assets/images/members/fr-tick.jpg` | Tick Abram (Find/Replace) | Drums |
| `assets/images/members/ip-cain.jpg` | Cain Vesper (Immortal Prophets) | Vocals |
| `assets/images/members/ip-joss.jpg` | Joss Halek (Immortal Prophets) | Guitar |
| `assets/images/members/ip-mira.jpg` | Mira Solt (Immortal Prophets) | Bass / Vocals |
| `assets/images/members/ip-rook.jpg` | Rook Danner (Immortal Prophets) | Drums |
| `assets/images/members/fn-ace.jpg` | Ace Calderon (Firewall Nation) | Vocals / Rap |
| `assets/images/members/fn-rye.jpg` | Rye Patton (Firewall Nation) | Vocals / Scream |
| `assets/images/members/fn-gio.jpg` | Gio Hart (Firewall Nation) | Guitar |
| `assets/images/members/fn-zee.jpg` | Zee Okonkwo (Firewall Nation) | Bass / Production |
| `assets/images/members/fn-pix.jpg` | Pix Renner (Firewall Nation) | Drums |

### Release / album artwork

| Path | Release | Artist |
|---|---|---|
| `assets/images/releases/bb-last-call.jpg` | Last Call Gravity (album) | Buckshot Bourbon |
| `assets/images/releases/bb-steel.jpg` | Steel Magnolia Single (single) | Buckshot Bourbon |
| `assets/images/releases/sk-glass.jpg` | Glass Off the Dashboard (album) | Sawyer Kennedy |
| `assets/images/releases/sk-river.jpg` | River In Reverse (single) | Sawyer Kennedy |
| `assets/images/releases/fh-lattice.jpg` | Lattice of Light (album) | Fractal Hearts |
| `assets/images/releases/gr-zine.jpg` | Zine Age (album) | Grassroots Rebellion |
| `assets/images/releases/gr-riot.jpg` | Riot Softly (single) | Grassroots Rebellion |
| `assets/images/releases/wn-grid.jpg` | Warped Grid (album) | Warpnotix |
| `assets/images/releases/wn-drop.jpg` | Drop Architecture (single) | Warpnotix |
| `assets/images/releases/ss-rite.jpg` | Rite of Volume (album) | Sound Shamans |
| `assets/images/releases/ig-weather.jpg` | People Who Stayed (album) | Immovable Giants |
| `assets/images/releases/jb-salt.jpg` | Salt & Spring (album) | The Jones Beach Boys |
| `assets/images/releases/cr-trail.jpg` | Upper Atmosphere (album) | The Cosmic Run |
| `assets/images/releases/mr-dial.jpg` | Station After Midnight (album) | Moonflower Radio |
| `assets/images/releases/fr-query.jpg` | Search Field (album) | Find/Replace |
| `assets/images/releases/fr-patch.jpg` | Hotfix (single) | Find/Replace |
| `assets/images/releases/ip-rite.jpg` | Mortal Volume (album) | Immortal Prophets |
| `assets/images/releases/fn-packet.jpg` | Public Volume (album) | Firewall Nation |
| `assets/images/releases/fn-port.jpg` | Open Port (single) | Firewall Nation |

### Video thumbnails + gallery stills

| Path | Use |
|---|---|
| `assets/images/gallery/buckshot-bourbon-v1.jpg` | Thumbnail for “Last Call Gravity — Live at the Mill” (Buckshot Bourbon) |
| `assets/images/gallery/buckshot-bourbon-v2.jpg` | Thumbnail for “Anywhere, NY (Official Video)” (Buckshot Bourbon) |
| `assets/images/gallery/sawyer-kennedy-v1.jpg` | Thumbnail for “Glass Off the Dashboard” (Sawyer Kennedy) |
| `assets/images/gallery/sawyer-kennedy-v2.jpg` | Thumbnail for “Writer's Round, Vol. 2” (Sawyer Kennedy) |
| `assets/images/gallery/fractal-hearts-v1.jpg` | Thumbnail for “Lattice of Light (Visualizer)” (Fractal Hearts) |
| `assets/images/gallery/fractal-hearts-v2.jpg` | Thumbnail for “Recursion — Planetarium Session” (Fractal Hearts) |
| `assets/images/gallery/grassroots-rebellion-v1.jpg` | Thumbnail for “Don't Sand The Edges” (Grassroots Rebellion) |
| `assets/images/gallery/grassroots-rebellion-v2.jpg` | Thumbnail for “Zine Age Tour Diary” (Grassroots Rebellion) |
| `assets/images/gallery/warpnotix-v1.jpg` | Thumbnail for “Drop Architecture (Official Visual)” (Warpnotix) |
| `assets/images/gallery/warpnotix-v2.jpg` | Thumbnail for “Warehouse Set 04” (Warpnotix) |
| `assets/images/gallery/sound-shamans-v1.jpg` | Thumbnail for “Rite of Volume — Full Set” (Sound Shamans) |
| `assets/images/gallery/immovable-giants-v1.jpg` | Thumbnail for “People Who Stayed” (Immovable Giants) |
| `assets/images/gallery/jones-beach-boys-v1.jpg` | Thumbnail for “Jones Beach Dawn” (The Jones Beach Boys) |
| `assets/images/gallery/jones-beach-boys-v2.jpg` | Thumbnail for “Parking Lot Harmony” (The Jones Beach Boys) |
| `assets/images/gallery/cosmic-run-v1.jpg` | Thumbnail for “Upper Atmosphere” (The Cosmic Run) |
| `assets/images/gallery/moonflower-radio-v1.jpg` | Thumbnail for “Station After Midnight” (Moonflower Radio) |
| `assets/images/gallery/moonflower-radio-v2.jpg` | Thumbnail for “Kind Explosion — Live” (Moonflower Radio) |
| `assets/images/gallery/find-replace-v1.jpg` | Thumbnail for “Search Field” (Find/Replace) |
| `assets/images/gallery/find-replace-v2.jpg` | Thumbnail for “Stamp Press Hymn” (Find/Replace) |
| `assets/images/gallery/immortal-prophets-v1.jpg` | Thumbnail for “Mortal Volume” (Immortal Prophets) |
| `assets/images/gallery/immortal-prophets-v2.jpg` | Thumbnail for “Sigil Ritual” (Immortal Prophets) |
| `assets/images/gallery/firewall-nation-v1.jpg` | Thumbnail for “Public Volume” (Firewall Nation) |
| `assets/images/gallery/firewall-nation-v2.jpg` | Thumbnail for “Nation (Performance)” (Firewall Nation) |
| `assets/images/gallery/buckshot-bourbon-g1.jpg` | Live Performances — Buckshot Bourbon — Buckshot Bourbon — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/buckshot-bourbon-g2.jpg` | Band Members — Buckshot Bourbon — Buckshot Bourbon — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/buckshot-bourbon-g3.jpg` | Studio — Buckshot Bourbon — Buckshot Bourbon — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/buckshot-bourbon-g4.jpg` | Events — Buckshot Bourbon — Buckshot Bourbon — Events. Replace this still with authorized photography. |
| `assets/images/gallery/sawyer-kennedy-g1.jpg` | Live Performances — Sawyer Kennedy — Sawyer Kennedy — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/sawyer-kennedy-g2.jpg` | Band Members — Sawyer Kennedy — Sawyer Kennedy — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/sawyer-kennedy-g3.jpg` | Studio — Sawyer Kennedy — Sawyer Kennedy — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/sawyer-kennedy-g4.jpg` | Events — Sawyer Kennedy — Sawyer Kennedy — Events. Replace this still with authorized photography. |
| `assets/images/gallery/fractal-hearts-g1.jpg` | Live Performances — Fractal Hearts — Fractal Hearts — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/fractal-hearts-g2.jpg` | Band Members — Fractal Hearts — Fractal Hearts — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/fractal-hearts-g3.jpg` | Studio — Fractal Hearts — Fractal Hearts — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/fractal-hearts-g4.jpg` | Events — Fractal Hearts — Fractal Hearts — Events. Replace this still with authorized photography. |
| `assets/images/gallery/grassroots-rebellion-g1.jpg` | Live Performances — Grassroots Rebellion — Grassroots Rebellion — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/grassroots-rebellion-g2.jpg` | Band Members — Grassroots Rebellion — Grassroots Rebellion — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/grassroots-rebellion-g3.jpg` | Studio — Grassroots Rebellion — Grassroots Rebellion — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/grassroots-rebellion-g4.jpg` | Events — Grassroots Rebellion — Grassroots Rebellion — Events. Replace this still with authorized photography. |
| `assets/images/gallery/warpnotix-g1.jpg` | Live Performances — Warpnotix — Warpnotix — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/warpnotix-g2.jpg` | Band Members — Warpnotix — Warpnotix — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/warpnotix-g3.jpg` | Studio — Warpnotix — Warpnotix — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/warpnotix-g4.jpg` | Events — Warpnotix — Warpnotix — Events. Replace this still with authorized photography. |
| `assets/images/gallery/sound-shamans-g1.jpg` | Live Performances — Sound Shamans — Sound Shamans — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/sound-shamans-g2.jpg` | Band Members — Sound Shamans — Sound Shamans — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/sound-shamans-g3.jpg` | Studio — Sound Shamans — Sound Shamans — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/sound-shamans-g4.jpg` | Events — Sound Shamans — Sound Shamans — Events. Replace this still with authorized photography. |
| `assets/images/gallery/immovable-giants-g1.jpg` | Live Performances — Immovable Giants — Immovable Giants — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/immovable-giants-g2.jpg` | Band Members — Immovable Giants — Immovable Giants — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/immovable-giants-g3.jpg` | Studio — Immovable Giants — Immovable Giants — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/immovable-giants-g4.jpg` | Events — Immovable Giants — Immovable Giants — Events. Replace this still with authorized photography. |
| `assets/images/gallery/jones-beach-boys-g1.jpg` | Live Performances — The Jones Beach Boys — The Jones Beach Boys — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/jones-beach-boys-g2.jpg` | Band Members — The Jones Beach Boys — The Jones Beach Boys — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/jones-beach-boys-g3.jpg` | Studio — The Jones Beach Boys — The Jones Beach Boys — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/jones-beach-boys-g4.jpg` | Events — The Jones Beach Boys — The Jones Beach Boys — Events. Replace this still with authorized photography. |
| `assets/images/gallery/cosmic-run-g1.jpg` | Live Performances — The Cosmic Run — The Cosmic Run — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/cosmic-run-g2.jpg` | Band Members — The Cosmic Run — The Cosmic Run — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/cosmic-run-g3.jpg` | Studio — The Cosmic Run — The Cosmic Run — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/cosmic-run-g4.jpg` | Events — The Cosmic Run — The Cosmic Run — Events. Replace this still with authorized photography. |
| `assets/images/gallery/moonflower-radio-g1.jpg` | Live Performances — Moonflower Radio — Moonflower Radio — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/moonflower-radio-g2.jpg` | Band Members — Moonflower Radio — Moonflower Radio — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/moonflower-radio-g3.jpg` | Studio — Moonflower Radio — Moonflower Radio — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/moonflower-radio-g4.jpg` | Events — Moonflower Radio — Moonflower Radio — Events. Replace this still with authorized photography. |
| `assets/images/gallery/find-replace-g1.jpg` | Live Performances — Find/Replace — Find/Replace — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/find-replace-g2.jpg` | Band Members — Find/Replace — Find/Replace — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/find-replace-g3.jpg` | Studio — Find/Replace — Find/Replace — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/find-replace-g4.jpg` | Events — Find/Replace — Find/Replace — Events. Replace this still with authorized photography. |
| `assets/images/gallery/immortal-prophets-g1.jpg` | Live Performances — Immortal Prophets — Immortal Prophets — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/immortal-prophets-g2.jpg` | Band Members — Immortal Prophets — Immortal Prophets — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/immortal-prophets-g3.jpg` | Studio — Immortal Prophets — Immortal Prophets — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/immortal-prophets-g4.jpg` | Events — Immortal Prophets — Immortal Prophets — Events. Replace this still with authorized photography. |
| `assets/images/gallery/firewall-nation-g1.jpg` | Live Performances — Firewall Nation — Firewall Nation — Live Performances. Replace this still with authorized photography. |
| `assets/images/gallery/firewall-nation-g2.jpg` | Band Members — Firewall Nation — Firewall Nation — Band Members. Replace this still with authorized photography. |
| `assets/images/gallery/firewall-nation-g3.jpg` | Studio — Firewall Nation — Firewall Nation — Studio. Replace this still with authorized photography. |
| `assets/images/gallery/firewall-nation-g4.jpg` | Events — Firewall Nation — Firewall Nation — Events. Replace this still with authorized photography. |

## Audio (authorized / local player)

Placeholder sine-wave beds so the Now Playing bar works. Replace with authorized mixes, same filenames, WAV or MP3 (update the `audio` field in `songs.json` if you change extension).

| Path | Tied to |
|---|---|
| `assets/audio/buckshot-bourbon.wav` | Placeholder bed for Buckshot Bourbon tracks |
| `assets/audio/sawyer-kennedy.wav` | Placeholder bed for Sawyer Kennedy tracks |
| `assets/audio/fractal-hearts.wav` | Placeholder bed for Fractal Hearts tracks |
| `assets/audio/grassroots-rebellion.wav` | Placeholder bed for Grassroots Rebellion tracks |
| `assets/audio/warpnotix.wav` | Placeholder bed for Warpnotix tracks |
| `assets/audio/sound-shamans.wav` | Placeholder bed for Sound Shamans tracks |
| `assets/audio/immovable-giants.wav` | Placeholder bed for Immovable Giants tracks |
| `assets/audio/jones-beach-boys.wav` | Placeholder bed for The Jones Beach Boys tracks |
| `assets/audio/cosmic-run.wav` | Placeholder bed for The Cosmic Run tracks |
| `assets/audio/moonflower-radio.wav` | Placeholder bed for Moonflower Radio tracks |
| `assets/audio/find-replace.wav` | Placeholder bed for Find/Replace tracks |
| `assets/audio/immortal-prophets.wav` | Placeholder bed for Immortal Prophets tracks |
| `assets/audio/firewall-nation.wav` | Placeholder bed for Firewall Nation tracks |

## Other files

| Path | Purpose |
|---|---|
| `index.html` | Cinematic landing |
| `pages/home.html` | Label dashboard |
| `pages/artists.html` | Roster + ticker |
| `pages/artist.html?id=SLUG` | Universal artist mini-site |
| `pages/news.html` `music.html` `videos.html` `gallery.html` | Discovery |
| `pages/about.html` `contact.html` `store.html` | Label |
| `pages/privacy.html` `terms.html` | Legal placeholders — replace with counsel copy |
| `assets/css/site.css` | Visual system |
| `js/site.js` | Shared header, footer, drawer, JSON loader, Now Playing |
| `js/*.js` | Page modules |
| `.nojekyll` | Stops GitHub Pages from ignoring folders that start with `_` or processing as Jekyll |

## Contact form

Inquiry types live in `site.json` → `inquiryTypes`. The selected reason reveals artist/album/song/video fields populated from the same catalog. To actually email the label:

1. Create a Formspree form (or Netlify Forms / Basin / a serverless function).
2. Put the endpoint URL in `data/site.json` → `form.endpoint`.
3. Never commit SMTP passwords.
