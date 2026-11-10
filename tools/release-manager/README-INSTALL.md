# QFR Music Release Manager

An iPhone-friendly, static Progressive Web App for preparing release packages for `quantumfrequencyrecords/QFRMusic`.

## Install in your existing GitHub Pages repository

1. Download and unzip this package.
2. In GitHub, open `quantumfrequencyrecords/QFRMusic`.
3. Create a folder named `tools/release-manager/`.
4. Upload the contents of this package into that folder, preserving the `icons/` subfolder.
5. Commit these app files. This adds the manager only; it does not change your music catalog.
6. Open: `https://quantumfrequencyrecords.github.io/QFRMusic/tools/release-manager/`
7. In Safari, use Share → Add to Home Screen to install it like an app.

## How to use

1. From your repository, download `data/artists.json`, `data/songs.json`, and `data/releases.json`.
2. Open the manager and select those three files.
3. Enter the song/release details and attach only the final public web audio and artwork.
4. Run checks, prepare the ZIP, and save it in Files. Move it to your external drive.
5. Review the ZIP's README. Merge the proposed song and release records into the existing arrays; do not overwrite catalog files with one-record draft files.
6. Publish only after you have approved the audio, artwork, credits, metadata and website preview.

## Privacy and limitations

- The app processes selected files locally in the browser. It does not upload them to a server.
- It does not ask for or store a GitHub token.
- It does not publish, commit or modify the repository.
- It does not directly connect to Suno. Download source assets from Suno and import the files you want.
- It does not master or convert audio.
- Browser storage is not used as the permanent archive. Download each ZIP and keep it on your external drive.
- The app is free static HTML/CSS/JavaScript. No paid backend or account is required.

## Current QFR website schema

Song records retain the current fields:
`id`, `title`, `artistId`, `releaseId`, `trackNumber`, `date`, `genre`, `artwork`, `audio`, `lyrics`, `streams`, `spotifyUrl`, `duration`.

Release records retain:
`id`, `artistId`, `title`, `type`, `date`, `artwork`, `songIds`, `description`.

Optional news and homepage latest-song records are supplied as separate draft JSON files. Merge the news record into the existing `data/news.json` array. The latest-song file is an intentional replacement candidate for `data/latest/song.json`, so review it before use.

## Recommended repository layout

- `tools/release-manager/` — this app
- `data/` — public website JSON
- `assets/audio/` — public website audio only
- `assets/images/releases/` — public release artwork
- External drive — full-resolution masters, stems, sessions, source artwork, lyric revisions, contracts and private working files
