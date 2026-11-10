const $=id=>document.getElementById(id);
const state={artists:null,songs:null,releases:null,files:{audio:null,art:null},zip:null,checks:[]};
const slug=s=>(s||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const readJSON=async f=>{const x=JSON.parse(await f.text());if(!Array.isArray(x))throw Error("Expected a JSON array.");return x;};
function setStatus(){const n=["artists","songs","releases"].filter(k=>Array.isArray(state[k])).length;$("catalogStatus").textContent=n===3?`Catalog loaded: ${state.artists.length} artists · ${state.songs.length} songs · ${state.releases.length} releases.`:`${n}/3 catalog files loaded. Load all three to enable full cross-reference checks.`;populateArtists();}
function populateArtists(){const s=$("artistId");const prev=s.value;s.innerHTML='<option value="">Choose an artist</option>';(state.artists||[]).forEach(a=>{const o=document.createElement("option");o.value=a.id;o.textContent=a.name;s.append(o)});if(prev)s.value=prev;}
["artists","songs","releases"].forEach(k=>$(k+"File").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{state[k]=await readJSON(f);setStatus();runChecks();}catch(err){state[k]=null;setStatus();alert(`${k}.json could not be read: ${err.message}`)}}));
$("audioFile").addEventListener("change",e=>{state.files.audio=e.target.files[0]||null;$("audioName").textContent=state.files.audio?.name||"No audio selected";if(state.files.audio&&!$("audioFilename").value)$("audioFilename").value=slug($("title").value||state.files.audio.name.replace(/\.[^.]+$/,""))+"."+safeExt(state.files.audio.name,"mp3");runChecks()});
$("artFile").addEventListener("change",e=>{state.files.art=e.target.files[0]||null;$("artName").textContent=state.files.art?.name||"No artwork selected";if(state.files.art&&!$("artFilename").value)$("artFilename").value=slug($("title").value||state.files.art.name.replace(/\.[^.]+$/,""))+"."+((state.files.art.name.split(".").pop()||"jpg").toLowerCase());runChecks()});
$("title").addEventListener("input",()=>{if(!$("releaseTitle").value)$("releaseTitle").placeholder=$("title").value||"Defaults to song title for a single";});
function safeExt(name,fallback){const m=(name||"").match(/\.([a-z0-9]{2,5})$/i);return m?m[1].toLowerCase():fallback}
function buildRecords(){
 const artistId=$("artistId").value,title=$("title").value.trim(),date=$("date").value,genre=$("genre").value.trim();
 const artist=(state.artists||[]).find(a=>a.id===artistId);
 const sid=slug((artist?.id||"artist")+"-"+title),rid=$("releaseType").value==="single"?sid:slug((artist?.id||"artist")+"-"+($("releaseTitle").value.trim()||title));
 const artRaw=$("artFilename").value||`${sid}.jpg`,audioRaw=$("audioFilename").value||`${sid}.mp3`;
 const artName=`${slug(artRaw.replace(/\.[^.]+$/,""))}.${safeExt(artRaw,state.files.art?safeExt(state.files.art.name,"jpg"):"jpg")}`;
 const audioName=`${slug(audioRaw.replace(/\.[^.]+$/,""))}.${safeExt(audioRaw,state.files.audio?safeExt(state.files.audio.name,"mp3"):"mp3")}`;
 const artPath=`/assets/images/releases/${artName}`;
 const audioPath=`/assets/audio/${audioName}`;
 const oldSong=(state.songs||[]).find(x=>x.id===sid);
 const song={...(oldSong||{}),id:sid,title,artistId,releaseId:rid,trackNumber:Number($("trackNumber").value||1),date,genre,artwork:artPath,audio:audioPath,lyrics:$("lyrics").value,streams:oldSong?.streams||{week:0,month:0,ytd:0},spotifyUrl:$("spotifyUrl").value.trim(),duration:Number($("duration").value||0)};
 const oldRelease=(state.releases||[]).find(x=>x.id===rid);
 const release={...(oldRelease||{}),id:rid,artistId,title:$("releaseTitle").value.trim()||title,type:$("releaseType").value,date,artwork:artPath,songIds:[...new Set([...(oldRelease?.songIds||[]),sid])],description:$("description").value.trim()||oldRelease?.description||""};
 const songs=[...(state.songs||[]).filter(x=>x.id!==sid),song];
 const releases=[...(state.releases||[]).filter(x=>x.id!==rid),release];
 return {artist,song,release,songs,releases,sid,rid,artName:artPath.split("/").pop(),audioName:audioPath.split("/").pop()};
}
function runChecks(){
 const out=[];const add=(ok,msg,warning=false)=>out.push({ok,msg,warning});
 const loaded=!!(state.artists&&state.songs&&state.releases);add(loaded,"All three current QFR JSON files loaded.");
 const artist=(state.artists||[]).find(a=>a.id===$("artistId").value);add(!!artist,"Selected artist exists in artists.json.");
 const title=$("title").value.trim();add(!!title,"Song title is entered.");
 const date=$("date").value;add(!!date&&/^\d{4}-\d{2}-\d{2}$/.test(date),"Release date uses YYYY-MM-DD.");
 add(!!$("genre").value.trim(),"Genre is entered.");
 add(!!state.files.audio,"Web audio file selected.",true);
 add(!!state.files.art,"Release artwork selected.",true);
 add(!!$("duration").value&&Number($("duration").value)>0,"Duration entered in seconds.",true);
 if(loaded&&artist&&title){try{const r=buildRecords();add(state.songs.filter(s=>s.id===r.sid).length<=1,"Song ID is unique or updates the matching existing song.");add(state.artists.some(a=>a.id===r.song.artistId),"Song artistId resolves to artists.json.");add(r.release.songIds.includes(r.sid),"Release songIds includes the song ID.");add(r.song.releaseId===r.release.id,"Song releaseId matches release id.");}catch(e){add(false,"Unable to build draft records: "+e.message)}}
 state.checks=out;$("checks").innerHTML=out.map(x=>`<div class="check ${x.ok?"ok":x.warning?"warn":"bad"}"><b>${x.ok?"✓":x.warning?"!":"×"}</b><span>${x.msg}</span></div>`).join("");
 return out;
}
$("validateBtn").onclick=runChecks;
["artistId","title","date","genre","trackNumber","duration","lyrics","releaseType","releaseTitle","spotifyUrl","description","artFilename","audioFilename"].forEach(id=>$(id).addEventListener("input",runChecks));
function jsonFile(x){return JSON.stringify(x,null,2)+"\n";}
function newsRecord(r){const {artist,song,release}=r;return {id:`${artist.id}-news-${song.id}`,date:song.date,headline:`${artist.name} releases ${song.title}`,category:"Release",image:song.artwork,excerpt:`${artist.name} shares ${song.title}, a new release through Quantum Frequency Records.`,body:$("description").value.trim()||`${artist.name} introduces ${song.title}, available now through Quantum Frequency Records.`,artistIds:[artist.id],releaseIds:[release.id],featured:false};}
function latestRecord(r){return {id:"latest-song",type:"song",kicker:"Latest Song Release",title:r.song.title,subtitle:`${r.artist.name} · ${r.release.type}`,date:r.song.date,image:r.song.artwork,excerpt:$("description").value.trim()||`${r.artist.name} introduces ${r.song.title}.`,body:$("description").value.trim()||`${r.song.title} is the latest release from ${r.artist.name}.`,link:"/music",linkLabel:"Play the song",meta:r.artist.name,artistId:r.artist.id,songId:r.song.id};}
function utf8(s){return new TextEncoder().encode(s)}
function crc32(bytes){let c=~0;for(let b of bytes){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return (~c)>>>0}
function u16(n){return [n&255,(n>>>8)&255]}function u32(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]}
function makeZip(files){let local=[],central=[],offset=0;for(const f of files){const name=utf8(f.name),data=f.data instanceof Uint8Array?f.data:utf8(f.data),crc=crc32(data),lh=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0),...name]);local.push(lh,data);const ch=new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset),...name]);central.push(ch);offset+=lh.length+data.length;}const csize=central.reduce((a,b)=>a+b.length,0),end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(csize),...u32(offset),...u16(0)]);return new Blob([...local,...central,end],{type:"application/zip"})}
$("releaseForm").addEventListener("submit",async e=>{e.preventDefault();const checks=runChecks();const hard=checks.filter(x=>!x.ok&&!x.warning);if(hard.length){alert("Please fix the required checks before preparing the package.");return;}if(!state.artists||!state.songs||!state.releases){alert("Load artists.json, songs.json and releases.json first.");return;}
 const r=buildRecords();const files=[];const add=(name,data)=>files.push({name,data});
 add("data/songs.json",jsonFile(r.songs));add("data/releases.json",jsonFile(r.releases));
 add("release-draft/record-preview/song.json",jsonFile(r.song));add("release-draft/record-preview/release.json",jsonFile(r.release));
 if($("makeNews").checked)add("data/news.json — APPEND THIS RECORD.json",jsonFile([newsRecord(r)]));
 if($("makeLatest").checked)add("data/latest/song.json — REPLACE AFTER REVIEW.json",jsonFile(latestRecord(r)));
 if(state.files.audio)add(`assets/audio/${r.audioName}`,new Uint8Array(await state.files.audio.arrayBuffer()));
 if(state.files.art)add(`assets/images/releases/${r.artName}`,new Uint8Array(await state.files.art.arrayBuffer()));
 const readme=`# QFR release draft — ${r.song.title}\n\nThis is a proposed release package. It has NOT been published.\n\n## Approval checklist\n- [ ] Listen to the final web audio file on phone and desktop.\n- [ ] Confirm final master, edit, start/end silence and metadata.\n- [ ] Confirm artwork, rights, credits and artist approval.\n- [ ] Review song.json and release.json.\n- [ ] Merge the song record into the existing data/songs.json array.\n- [ ] Merge the release record into the existing data/releases.json array.\n- [ ] If included, merge the news record into existing data/news.json (do not replace the file with the one-record draft).\n- [ ] If included, review and replace data/latest/song.json intentionally.\n- [ ] Confirm every referenced asset path exists with exact capitalization.\n- [ ] Test the release on a preview before merging to the live website.\n\n## Existing QFR schema retained\nSong fields: id, title, artistId, releaseId, trackNumber, date, genre, artwork, audio, lyrics, streams, spotifyUrl, duration.\nRelease fields: id, artistId, title, type, date, artwork, songIds, description.\n\n## Archive reminder\nKeep lossless masters, stems, DAW sessions, source artwork and private notes on your external archive drive. Only approved public-facing web assets belong in the website repository.\n`;
 add("README-REVIEW-BEFORE-PUBLISHING.md",readme);
 add("release-draft/manifest.json",jsonFile({workflow:"QFR Music Release Manager",status:"draft-awaiting-human-approval",createdAt:new Date().toISOString(),artistId:r.artist.id,songId:r.sid,releaseId:r.rid,repository:"quantumfrequencyrecords/QFRMusic",publishing:"manual approval required"}));
 state.zip=makeZip(files);$("result").hidden=false;$("resultSummary").textContent=`${r.artist.name} — ${r.song.title}. ${files.length} files prepared. ${state.files.audio?"Audio included. ":"Audio not attached. "}${state.files.art?"Artwork included. ":"Artwork not attached. "}No GitHub changes have been made.`;$("result").scrollIntoView({behavior:"smooth",block:"start"});
});
$("downloadBtn").onclick=()=>{if(!state.zip)return;const a=document.createElement("a");a.href=URL.createObjectURL(state.zip);a.download=`QFR-${slug($("artistId").selectedOptions[0]?.textContent||"artist")}-${slug($("title").value||"release")}-DRAFT.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),30000);};
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
