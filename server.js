const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require("path");
const fs = require('fs');
const events = require('events');
const aoijs = require("aoi.js")
const timestamp = require('time-stamp');

const { Database } = require("nukleon");
let db = new Database("./data/zuzia.json");
var renk = db.get('zuzist');
var img = db.get('img');
const bot = new aoijs.AoiClient({
token: process.env.token,
prefix: "-",
intents: "all"
})

//Events
bot.onMessage()

//Command Example (ping)
bot.command({
name: "ping",
code: `Pong! $pingms
$onlyForIDs[$botOwnerID;🤔:middle_finger:]

`
})
bot.command({
name: "eval",
code: `$eval[$message]
$onlyForIDs[$botOwnerID;🤔:middle_finger:]

`
})
bot.command({
name: "ayarla1",
code: `$djsEval[const { Database } = require("nukleon");
let db = new Database("./data/zuzia.json");
db.set('$message[1]', "$messageSlice[1]");
;no]
$onlyIf[$message==;db.set('\`veri\`', "\`değer\`")]
$onlyForIDs[$botOwnerID;🤔:middle_finger:]
`
})
bot.loopCommand({
  $if: "v4",
code: `
$djsEval[const { Database } = require("nukleon");
let db = new Database("./data/zuzia.json");
db.set('zuzist', "$get[renk]");
db.set('img', "$get[img]")
;no]
$if[$status[$botOwnerID]==online]
$let[renk;green]
$endif
$if[$status[$botOwnerID]==idle]
$let[renk;#ffd000]
$endif
$if[$status[$botOwnerID]==dnd]
$let[renk;#86000b]
$endif
$if[$status[$botOwnerID]==offline]
$let[renk;#a0a0a0]
$endif
$let[img;$randomText[https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-1?v=1666809504827;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-2?v=1666810291948;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-3?v=1666810292030;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-5?v=1666811062561;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-4?v=1666810294205;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-6?v=1666811143123]]
$attachment[$randomText[https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-1?v=1666809504827;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-2?v=1666810291948;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-3?v=1666810292030;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-5?v=1666811062561;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-4?v=1666810294205;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-6?v=1666811143123;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-15?v=1666813084238;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-14?v=1666813084090;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-13?v=1666813081985;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-12?v=1666813081686;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-11?v=1666813080536;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-10?v=1666813073385;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-7?v=1666813069686;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-8?v=1666813069857;https://cdn.glitch.global/d2525bcf-8281-4674-8a7c-e7b1dda67cf0/404-9?v=1666813070832];error-404.png]
**DB güncellendi.**
`,
channel: "963451072725262378",
executeOnStartup: true,
every: 500000
})

bot.variables({
eco:"0"
})

bot.status({
  text: "Bir test sitesine bağlıdır.",
  type: "PLAYING",
  status: "idle",
  time: 12
})


//View Engine 
const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

//PORT
const port = 8080;

//Body-parse 
app.use(bodyParser.json())
.use(bodyParser.urlencoded({
extended: true
}));

//Statik
app.use(express.static('public'));
app.set("src", "path/to/views");
//Eventler

//Sayfalar
//Anasayfa
app.get('/', (req, res)=>{
res.render("index.ejs", {"renk": renk
})
db.add("sayaç",1)
var s = db.get("sayaç")
console.log(s, "Looding... | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})
app.get('/anasayfa', (req, res)=>{
res.render("anasayfa.ejs", {"renk": renk
})
  db.add("anasayfa",1)
var s = db.get("anasayfa")
console.log(s, "Anasayfa | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})
app.get('/hakkimda', (req, res)=>{
res.render("hakkimda.ejs", {"renk": renk
}) 
  db.add("hakkımda",1)
var s = db.get("hakkımda")
console.log(s, "Hakkımda | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})
app.get('/projelerim', (req, res)=>{
res.render("projelerim.ejs", {"renk": renk
}) 
  db.add("projeler",1)
var s = db.get("projeler")
console.log(s, "Projelerim | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})
app.get('/iletisim', (req, res)=>{
res.render("iletisim.ejs", {"renk": renk
}) 
  db.add("iletişim",1)
var s = db.get("iletişim")
console.log(s, "İletişim | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})
app.get('/*', (req, res)=>{
res.render("404.ejs", {"renk": renk,
                       "img": img
}) 
  db.add("404",1)
var s = db.get("404")
console.log(s, "404 | ", timestamp.utc('HH:mm:ss:ms'), "saatinde girildi.")
})

//Server listen
server.listen(port , () => {
console.log(port, " Portu dinleniyor");
});