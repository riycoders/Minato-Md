/* 
     Base : Irfan H.
     Recode : riycoders
     Baca : edit owner dll. di file config.json
*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const Baileys = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { serialize, reSize, getBuffer, fetchJson, fetchText, getRandom,
              getGroupAdmins, runtime, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const _prem = require("../lib/premium");
const { tebakgmbr } = require("../lib/tebakgambar");
const { writeExif } = require("../lib/exif2");
const { yta, ytv } = require("../lib/ytdl");
const { TelegraPh, UploadFileUgu } = require("../lib/uploader");
const afk = require("../lib/afk");

const fs = require ("fs");
const cheerio = require("cheerio")
const moment = require("moment-timezone");
const util = require("util");
const qs = require("querystring");
const base64 = require("base64-img");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const acrcloud = require("acrcloud");
const axios = require("axios");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
const toMs = require("ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// DB Game
let tebakgambar = [];
let kuis = [];

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

// Auto Reset Limit
setInterval(function() {
   var jamna = new Date().toLocaleTimeString('en-US', { timeZone: "Asia/Jakarta" });
   var hasilnes = jamna.split(':')[0] < 10 ? '0' + jamna : jamna
   // hasilnes Kalo mau Jam 00 jadi 12:00:00 AM
   if(hasilnes === '12:00:00 AM') {
     limit.splice('reset')
     fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
     glimit.splice('reset')
     fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
     console.log("Limit Sudah Di Reset!")
   }
}, 1000);

module.exports = async(conn, msg, m, setting, store, welcome, _afk) => {
          try {
                let { ownerNumber, botName, lolkey, xteamkey, gamewaktu, limitCount, packname, author } = setting
                let { allmenu } = require('./help')
                if (msg.mentioned && msg.mentioned.includes('')) { Object.keys(msg.mentioned).forEach((i) => { if (msg.mentioned[i] == '') { msg.mentioned.splice(i, 1) } }) }
                const { type, isQuotedMsg, quotedMsg, now, fromMe, mentioned, isBaileys } = msg
                if (isBaileys) return
                const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
                let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
                const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
                const content = JSON.stringify(msg.message)
                const from = msg.key.remoteJid
                var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                if (chats == undefined) { chats = '' }
                var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
                var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
                const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
                var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
                var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
                const isListMessage = dataListG.length !== 0 ? dataListG : dataList
                const toJSON = j => JSON.stringify(j, null,'\t')

                if (conn.multi) {
                  var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
                } else {
                  if (conn.nopref) {
                     prefix = ''
                  } else {
                     prefix = conn.prefa
                  }
                }

                const args = chats.split(' ')
                const command = chats.toLowerCase().split(' ')[0] || ''
                const q = chats.slice(command.length + 1, chats.length)
                const isCmd = command.startsWith(prefix)
                const isGroup = msg.key.remoteJid.endsWith('@g.us')
                let sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
                const isOwner = ownerNumber.includes(sender)
                const pushname = msg.pushName
                const body = chats.startsWith(prefix) ? chats : ''
                const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
                const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
                const groupName = isGroup ? groupMetadata.subject : ''
                const groupId = isGroup ? groupMetadata.id : ''
                const groupMembers = isGroup ? groupMetadata.participants : ''
                const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
                const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
                const isGroupAdmins = groupAdmins.includes(sender)
                const isUser = pendaftar.includes(sender)
                const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
                const isAntiLink = antilink.includes(from) ? true : false
                const isAfkOn = afk.checkAfkUser(sender, _afk)

                const gcounti = setting.gcount
                const gcount = isPremium ? gcounti.prem : gcounti.user
                
                const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
                
                // Function for Send Play
                async function sendPlay(from, query) {
                  try {
                    var data = await yts(query)
                    data = data.videos[0]
                    var data_a = (await yta(data.url)).filesizeF
                    var data_v = (await ytv(data.url)).filesizeF
                    var button = [
                        { buttonId: prefix+`ytmp3 ${data.url}`, buttonText: { displayText: `🎵 Audio (${data_a})` }, type: 1 },
                        { buttonId: prefix+`ytmp4 ${data.url}`, buttonText: { displayText: `🎥 Video (${data_v})` }, type: 1 }
                    ]
                    conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality Mp3 :* 128p\n*Quality Mp4 :* 360p\n*Duration :* ${data.duration.timestamp}\n*Url :* ${data.url}`, image: await getBuffer(data.thumbnail), buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender], viewOnce: true }, { quoted: msg })
                  } catch (e) {
                    conn.sendMessage(ownerNumber, { text: 'Send play error' })
                    console.log(e)
                  }
                }
                const isUrl = (url) => {
                   return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
                }
                function jsonformat(string) {
                   return JSON.stringify(string, null, 2)
                }
                function monospace(string) {
                   return '```' + string + '```'
                }
                function randomNomor(min, max = null) {
                   if (max !== null) {
                     min = Math.ceil(min);
                     max = Math.floor(max);
                     return Math.floor(Math.random() * (max - min + 1)) + min;
                   } else {
                     return Math.floor(Math.random() * min) + 1
                   }
                }
                const pickRandom = (arr) => {
                   return arr[Math.floor(Math.random() * arr.length)]
                }
                function mentions(teks, mems = [], id) {
                   if (id == null || id == undefined || id == false) {
                     let res = conn.sendMessage(from, { text: teks, mentions: mems })
                     return res
                   } else {
                     let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                     return res
                   }
                }
                function parseMention(text = '') {
                   return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
                }
                const reply = (teks) => {
                   return conn.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
                }
                function formatDate(n, locale = 'id') {
                   let d = new Date(n)
                   return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
                }
                function toCommas(x) {
	            x = x.toString()
	            var pattern = /(-?\d+)(\d{3})/;
                while (pattern.test(x))
	            x = x.replace(pattern, "$1.$2");
	            return x;
                }
                const buttonsDefault = [
                   { urlButton: { displayText: `Source Code`, url: setting.youtube } }
                ]
                
                const isImage = (type == 'imageMessage')
                const isVideo = (type == 'videoMessage')
                const isSticker = (type == 'stickerMessage')
                const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
                const isQuotedAudio = isQuotedMsg ? (quotedMsg.type === 'audioMessage') ? true : false : false
                const isQuotedDocument = isQuotedMsg ? (quotedMsg.type === 'documentMessage') ? true : false : false
                const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
                const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false

                // Auto Read & Presence Online
                conn.readMessages([msg.key])
                conn.sendPresenceUpdate('available', from)

                if (conn.mode === 'self') {
                  if (!isOwner && !fromMe) return
                  if (fromMe && isBaileys) return
                }
                
                // Anti Link
                if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
                   if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                     if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                     reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                     .then( done => conn.groupParticipantsUpdate(from, [sender], "remove") )
                   }
                }
                
                // Auto Registrasi
                if (isCmd && !isUser) {
                   pendaftar.push(sender)
                   fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
                }
                
                // Premium
                _prem.expiredCheck(conn, premium)
                
                // To Read Game Answers
                cekWaktuGame(conn, tebakgambar) // Tebak Gambar
                if (isPlayGame(from, tebakgambar) && isUser) {
                  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
                    var htgm = randomNomor(100, 150)
                    addBalance(sender, htgm, balance)
                    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
                    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
                  }
                }
                cekWaktuGame(conn, kuis) // Kuis Game
                if (isPlayGame(from, kuis) && isUser) {
                  if (chats.toLowerCase() == getJawabanGame(from, kuis)) {
                    var htgm = randomNomor(100, 150)
                    addBalance(sender, htgm, balance)
                    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, kuis)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}kuis*`)
                    kuis.splice(getGamePosi(from, kuis), 1)
                  }
                }

                // Function for AFK
                if (isGroup && !isBaileys && !fromMe) {
                  if (mentioned.length !== 0) {
                    for (let ment of mentioned) {
                      if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        await reply(`@${ment.split('@')[0]} sedang afk\n\n*Alasan :* ${getReason}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`)
                      }
                    }
                  }
                  if (afk.checkAfkUser(sender, _afk)) {
                    _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                    fs.writeFileSync('./database/afk.json', JSON.stringify(_afk, null, 2))
                    await mentions(`@${sender.split('@')[0]} telah kembali`, [sender], true)
                  }
                }

                if (chats.startsWith("> ") && isOwner) {
                   console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                   const ev = (sul) => {
                     var sat = JSON.stringify(sul, null, 2)
                     var bang = util.format(sat)
                     if (sat == undefined) {
                       bang = util.format(sul)
                     }
                     return reply(bang)
                   }
                   try {
                     reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
                   } catch (e) {
                     reply(util.format(e))
                   }
                } else if (chats.startsWith("$ ") && isOwner) {
                   console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                   exec(chats.slice(2), (err, stdout) => {
                     if (err) return reply(`${err}`)
                     if (stdout) reply(`${stdout}`)
                   })
                } else if (chats.startsWith("x ") && isOwner) {
                   console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
                   try {
                     let evaled = await eval(chats.slice(2))
                     if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
                     reply(`${evaled}`)
                   } catch (err) {
                     reply(`${err}`)
                   }
                }

                // Logs;
                if (!isGroup && isCmd && !fromMe) {
                   addBalance(sender, randomNomor(20), balance)
                   console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
                }
                if (isGroup && isCmd && !fromMe) {
                   addBalance(sender, randomNomor(20), balance)
                   console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
                }

        switch(command) {
                // Main Menu
                case prefix+'menu':
                case prefix+'help':
                   var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount, ucapanWaktu)
                   conn.sendMessage(from, { location: { jpegThumbnail: await reSize(fs.readFileSync(setting.pathimg), 300, 170) }, caption: teks, mentions: [sender], footer: setting.footer, templateButtons: buttonsDefault, viewOnce: true }, { quoted: msg })
                   break
                case prefix+'runtime':
                   reply(runtime(process.uptime()))
                   break
                case prefix+'speed':
                   let timestamp = speed();
                   let latensi = speed() - timestamp
                   reply(`${latensi.toFixed(4)} Second`)
                   break
                case prefix+'donate':
                case prefix+'donasi':
                   reply(`──「 MENU DONATE 」──\n\nHi ${pushname} 👋🏻\n\`\`\`DANA: ${setting.donasi.dana}\`\`\`\n\`\`\`GOPAY : ${setting.donasi.gopay}\`\`\`\nTerimakasih untuk kamu yang sudah donasi untuk perkembangan bot ini _^\n──「 THX FOR YOU ! 」──`)
                   break
                case prefix+'owner':
                   var number = ownerNumber.replace(/[^0-9]/g, '')
                   var vcard = 'BEGIN:VCARD\n'
                   + 'VERSION:3.0\n'
                   + 'FN:riycoders'+ '\n'
                   + 'ORG:;\n'
                   + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
                   + 'END:VCARD'
                   conn.sendMessage(from, { contacts: { displayName: 'Owner of '+botName.split(' ')[0], contacts: [{ vcard }] }},{ quoted: msg })
                   break
                case prefix+'sc': case prefix+'script':
                case prefix+'sourcecode': case prefix+'scriptbot':
                   var teks = `Bot ini menggunakan Script dari :\nhttps://youtube.com/@riycoders`
                   reply(teks)
                   break
                case prefix+'cekprem':
                case prefix+'cekpremium':
                   if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                   if (isOwner) return reply(`Lu owner bego!`)
                   if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                   let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                   let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                   reply(premiumnya)
                   break
                case prefix+'listprem':
                   let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                   let men = [];
                   for (let i of premium) {
                     men.push(i.id)
                     txt += `*ID :* @${i.id.split("@")[0]}\n`
                     if (i.expired === 'PERMANENT') {
                       let cekvip = 'PERMANENT'
                       txt += `*Expire :* PERMANENT\n\n`
                     } else {
                       let cekvip = ms(i.expired - Date.now())
                       txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                     }
                   }
                   mentions(txt, men, true)
                   break
                case prefix+'daftarprem': case prefix+'daftarpremium':
                   var teks = `Jika kamu ingin menjadi Member Premium, kamu cukup membayar Rp5.000 untuk 1 Minggu, Rp20.000 untuk 1 Bulan dan jika ingin menjadi Member Premium Permanen kamu hanya membayar Rp50.000. Jika berminat silahkan chat Owner Bot, ketik ${prefix}owner\n\nPembayaran bisa melalui Dana/Gopay/Pulsa`
                   reply(teks)
                   break
                // Converter & Tools Menu
                case prefix+'sticker': case prefix+'stiker': case prefix+'s':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (isImage || isQuotedImage) {
                     var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                     var buffer = Buffer.from([])
                     for await(const chunk of stream) {
                       buffer = Buffer.concat([buffer, chunk])
                     }
                     var rand1 = 'sticker/'+getRandom('.jpg')
                     var rand2 = 'sticker/'+getRandom('.webp')
                     fs.writeFileSync(`./${rand1}`, buffer)
                     ffmpeg(`./${rand1}`)
                     .on("error", console.error)
                     .on("end", () => {
                       exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                         conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                         limitAdd(sender, limit)
                         fs.unlinkSync(`./${rand1}`)
                         fs.unlinkSync(`./${rand2}`)
                       })
                     })
                     .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                     .toFormat('webp')
                     .save(`${rand2}`)
                   } else if (isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && quotedMsg.videoMessage.seconds < 10) {
                     reply(mess.wait)
                     var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                     var buffer = Buffer.from([])
                     for await(const chunk of stream) {
                       buffer = Buffer.concat([buffer, chunk])
                     }
                     var rand1 = 'sticker/'+getRandom('.mp4')
                     var rand2 = 'sticker/'+getRandom('.webp')
                     fs.writeFileSync(`./${rand1}`, buffer)
                     ffmpeg(`./${rand1}`)
                     .on("error", console.error)
                     .on("end", () => {
                       exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                         conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                         limitAdd(sender, limit)
                         fs.unlinkSync(`./${rand1}`)
                         fs.unlinkSync(`./${rand2}`)
                       })
                     })
                     .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                     .toFormat('webp')
                     .save(`${rand2}`)
                   } else {
                     reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
                   }
                   break
                case prefix+'swm': case prefix+'wm': case prefix+'take': case prefix+'takestiker':
                case prefix+'stikerwm': case prefix+'stickerwm': case prefix+'takesticker':
                   if (!isPremium) return reply(mess.OnlyPrem)
                   var pname = q.split('|')[0] ? q.split('|')[0] : q
                   var athor = q.split('|')[1] ? q.split('|')[1] : ''
                   if (isImage || isQuotedImage) {
                     if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}.jpeg`)
                     var opt = { packname: pname, author: athor }
                     conn.sendImageAsSticker(from, media, msg, opt)
                     .then( res => {
                     fs.unlinkSync(media)
                     }).catch((e) => reply(mess.error.api))
                   } else if (isVideo || isQuotedVideo) {
                     if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                     reply(mess.wait)
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender}.jpeg`)
                     var opt = { packname: pname, author: athor }
                     conn.sendImageAsSticker(from, media, msg, opt)
                     .then( res => {
                       fs.unlinkSync(media)
                     }).catch((e) => reply(mess.error.api))
                   } else if (isQuotedSticker) {
                     if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                     reply(mess.wait)
                     var media = quotedMsg['stickerMessage'].isAnimated !== true ? await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender}.jpeg`) : await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender}.webp`)
                     media = quotedMsg['stickerMessage'].isAnimated !== true ? media : (await webp2mp4File(media)).data
                     var opt = { packname: pname, author: athor }
                     quotedMsg['stickerMessage'].isAnimated !== true ?
                      conn.sendImageAsSticker(from, media, msg, opt)
                       .then( res => { fs.unlinkSync(media) }).catch((e) => reply(mess.error.api))
                       : conn.sendVideoAsSticker(from, media, msg, opt)
                        .then( res => { fs.unlinkSync(`./sticker/${sender}.webp`) }).catch((e) => reply(mess.error.api))
                   } else {
                     reply(`Kirim/Balas gambar/video/sticker dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                   }
                   break
                case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'sticker/'+getRandom('.webp')
                   var rand2 = 'sticker/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                     reply(mess.wait)
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply(mess.error.api)
                       conn.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                       limitAdd(sender, limit)
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply(mess.wait)
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       conn.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                       limitAdd(sender, limit)
                     })
                   }
                   break
                case prefix+'tomp3': case prefix+'toaudio':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (isVideo || isQuotedVideo) {
                     let media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${Date.now()}.mp4`)
                     reply(mess.wait)
                     let ran = './sticker/'+getRandom('.mp3')
                     exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                       fs.unlinkSync(media)
                       if (err) { fs.unlinkSync(ran); return reply('Gagal :V') }
                       conn.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
                       limitAdd(sender, limit)
                       fs.unlinkSync(ran)
                     })
                   } else {
                     reply(`Kirim/reply video dengan caption ${command} atau ${command} --ptt`)
                   }
                   break
                case prefix+'upload': case prefix+'tourl': case prefix+'tolink':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else if (isVideo || isQuotedVideo) {
                     var fileName = 'video'+makeid(10)+'.mp4'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${fileName}`)
                   } else if (isQuotedAudio) {
                     var fileName = 'audio'+makeid(10)+'.mp3'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto/Video/Audio yang ingin dijadikan url dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply(mess.wait)
                     var data = await TelegraPh(media)
                     var teks = `*UPLOAD SUCCES*\n\n*Url :* ${util.format(data)}\n*Expired :* No expired`
                     reply(teks)
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply(mess.error.api)
                     fs.unlinkSync(media)
                   }
                   break
                // Baileys
                case prefix+'q': case prefix+'getquotedmsg':
                case prefix+'getquoted': case prefix+'quoted':
                   if (!isPremium) return reply(mess.OnlyPrem)
                   if (!isQuotedMsg) return reply(`Balas Pesannya!`)
                   var data = await store.loadMessage(from, quotedMsg.id)
                   data = serialize(conn, data)
                   if (data.isQuotedMsg !== true) return reply(`The message you replied to contained no reply`)
                   var typ = Object.keys(data.message)[0]
                   if (data.message[typ].contextInfo.quotedMessage.conversation) {
                     reply(`${data.message[typ].contextInfo.quotedMessage.conversation}`)
                   } else {
                     var anu = data.message[typ].contextInfo.quotedMessage
                     conn.sendMessageFromContent(from, anu)
                   }
                   break
                case prefix+'tagall': case prefix+'infoall':
                   if (!isGroup) return reply(mess.OnlyGrup)
				   if (!isGroupAdmins) return reply(mess.GrupAdmin)
				   let participants = msg.isGroup ? await groupMetadata.participants : ''
                   let tekss = `*👤 TAG ALL 👤*\n\n*Pesan : ${q ? q : 'Nothing'}*\n\n`
                   for (let mem of participants) {
                   tekss += `• @${mem.id.split('@')[0]}\n`
                   }
                   tekss += `\n${setting.footer}`
                   conn.sendMessage(from, { text: tekss, mentions: participants.map(a => a.id) }, { quoted: msg })
                   break
                case prefix+'hidetag':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isPremium && !isOwner) return reply(mess.OnlyPrem)
                   var memh = [];
                   groupMembers.map( i => memh.push(i.id) )
                   conn.sendMessage(from, { text: q ? q : '', mentions: memh })
                   break
                case prefix+'afk':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                   if (body.slice(100)) return reply('Alasanlu kepanjangan')
                   let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                   afk.addAfkUser(sender, Date.now(), reason, _afk)
                   reply(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`)
                   break
                // Downloader Menu
                case prefix+'tiktok':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   require('../lib/tiktok').Tiktok(args[1]).then( data => {
                     conn.sendMessage(from, {
                       video: { url: data.watermark },
                       caption: `${data.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, pencet tombol dibawah untuk mengubahnya!`,
                       buttons: [
                         { buttonId: `${prefix}tiktoknowm ${args[1]}`, buttonText: { displayText: `Without Watermark` }, type: 1 },
                         { buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: 'Audio' }, type: 1 }
                       ],
                       footer: setting.footer,
                       viewOnce: true
                     }, { quoted: msg })
                     limitAdd(sender, limit)
                   }).catch((e) => {
                     reply(mess.error.api)
                   })
                   break
                case prefix+'tiktoknowm':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   require('../lib/tiktok').Tiktok(args[1]).then( data => {
                     conn.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
                     limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'tiktokaudio':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link\nAtau ${command} link --ori`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   require('../lib/tiktok').Tiktok(args[1]).then(async(data) => {
                    if (args[2] == '--ori') {
                      conn.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: msg })
                      limitAdd(sender, limit)
                    } else {
                      var nme = `./sticker/${Date.now()}.mp4`
                      fs.writeFileSync(nme, await getBuffer(data.nowm))
                      var ran = './sticker/'+getRandom('.mp3')
                      exec(`ffmpeg -i ${nme} ${ran}`, async (err) => {
                       conn.sendMessage(from, { audio: fs.readFileSync(ran), mimetype: 'audio/mp4' }, { quoted: msg })
                       limitAdd(sender, limit)
                       fs.unlinkSync(nme)
                       fs.unlinkSync(ran)
                      })
                    }
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'play':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                   reply(mess.wait)
                   await sendPlay(from, q)
                   limitAdd(sender, limit)
                   break
                case prefix+'ytmp4': case prefix+'mp4':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
                   ytv(args[1]).then(async(data) => {
                     var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 360p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${args[1]}`
                     if (Number(data.filesize) >= 30000) {
                       var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                       teks += `\n*≻ Download :* ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       limitAdd(sender, limit)
                     } else {
                       conn.sendMessage(from, { video: { url: data.dl_link.replace("https://", "http://"), caption: teks }}, { quoted: msg })
                       limitAdd(sender, limit)
                     }
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'ytmp3': case prefix+'mp3':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
                   yta(args[1]).then(async(data) => {
                     var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 128p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${args[1]}\n\n_wait a minute sending media..._`
                     if (Number(data.filesize) >= 30000) {
                       var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                       teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 128p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${args[1]}\n*≻ Download :* ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       limitAdd(sender, limit)
                     } else {
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       conn.sendMessage(from, { document: { url: data.dl_link.replace("https://", "http://")}, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3'}, { quoted: msg })
                       limitAdd(sender, limit)
                     }
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'getvideo': case prefix+'getvidio':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
                   if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
                   if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
                   var kuoted = await quotedMsg.chats
                   var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                   var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                   if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                   if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                   if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
                   reply(mess.wait)
                   ytv(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then(async(data) => {
                     data.url = `https://youtube.com/watch?v=${arrey[args[1] -1]}`
                     var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 360p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${data.url}`
                     if (Number(data.filesize) >= 30000) {
                       var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                       teks += `\n*≻ Download :* ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       limitAdd(sender, limit)
                     } else {
                       conn.sendMessage(from, { video: { url: data.dl_link.replace("https://", "http://"), caption: teks }}, { quoted: msg })
                       limitAdd(sender, limit)
                     }
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'getmusik': case prefix+'getmusic':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
                   if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
                   if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
                   var kuoted = await quotedMsg.chats
                   var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                   var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                   if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                   if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                   if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
                   reply(mess.wait)
                   yta(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then(async(data) => {
                     data.url = `https://youtube.com/watch?v=${arrey[args[1] -1]}`
                     var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 128p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
                     if (Number(data.filesize) >= 30000) {
                       var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                       teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* 128p\n*≻ Size :* ${data.filesizeF}\n*≻ Url Source :* ${data.url}\n*≻ Download :* ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       limitAdd(sender, limit)
                     } else {
                       conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                       conn.sendMessage(from, { document: { url: data.dl_link.replace("https://", "http://") }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3'}, { quoted: msg })
                       limitAdd(sender, limit)
                     }
                   }).catch(() => reply(mess.error.api))
                   break
                // Owner Menu
                case prefix+'exif':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                   var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                   exif.create(namaPack, authorPack)
                   setting.packname = namaPack; setting.author = authorPack
                   fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
                   reply(`Sukses membuat exif`)
                   break
                case prefix+'self':
                   if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                   conn.mode = 'self'
                   reply(`Berhasil berubah ke mode Self!`)
                   break
                case prefix+'public': case prefix+'publik':
                   if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                   conn.mode = 'public'
                   reply(`Berhasil berubah ke mode Public!`)
                   break
                case prefix+'leave':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (!isGroup) return reply(mess.OnlyGrup)
                   conn.groupLeave(from)
                   break
                case prefix+'join':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   var url = args[1]
                   url = url.split('https://chat.whatsapp.com/')[1]
                   var data = await conn.groupAcceptInvite(url)
                   reply(jsonformat(data))
                   break
                case prefix+'addprem':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                   if (!args[2]) return reply(`Mau yang berapa hari?`)
                   if (mentionUser.length !== 0) {
                     _prem.addPremiumUser(mentionUser[0], args[2], premium)
                     reply('Sukses')
                   } else {
                     var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                     if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                     _prem.addPremiumUser(args[1]+'@s.whatsapp.net', args[2], premium)
                     reply('Sukses')
                   }
                   break
                case prefix+'delprem':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                   if (mentionUser.length !== 0){
                     premium.splice(_prem.getPremiumPosition(mentionUser[0], premium), 1)
                     fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                     reply('Sukses!')
                   } else {
                     premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                     fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                     reply('Sukses!')
                   }
                   break
                case prefix+'resetlimit':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   limit.splice('reset')
                   fs.writeFileSync('./database/limit.json', JSON.stringify(limit, null, 2))
                   glimit.splice('reset')
                   fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit, null, 2))
                   reply(`Sukses reset limit pengguna`)
                   break
                case prefix+'broadcast': case prefix+'bc':
                   if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                   var data = await store.chats.all()
                   var teks = `*[  ${setting.botName} Broadcast ]*\n\n${q}`
                   for (let i of data) {
                     conn.sendMessage(i.id, { text: teks })
                     await sleep(1000)
                   }
                   reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
                   break
                // Random Menu
                case prefix+'quote': case prefix+'quotes':
                case prefix+'randomquote': case prefix+'randomquotes':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var data = JSON.parse(fs.readFileSync('./database/quotes.json'))
                   data = pickRandom(data)
                   reply(data.quotes+'\n\n-- '+data.author)
                   limitAdd(sender, limit)
                   break
                case prefix+'fakta': case prefix+'randomfakta':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var data = fs.readFileSync('./database/fakta.txt', 'utf-8').split('\n')
                   reply(pickRandom(data))
                   limitAdd(sender, limit)
                   break
                case prefix+'cecan': case prefix+'cewek':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   reply(mess.wait)
                   var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
                   var data = await pinterest(pickRandom(query))
                   var but = [{ buttonId: command, buttonText: { displayText: 'Next Photo' }, type: 1 }]
                   conn.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya', headerType: 'IMAGE', viewOnce: true }, { quoted: msg })
                   limitAdd(sender, limit)
                   break
                case prefix+'cogan': case prefix+'cowok':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   reply(mess.wait)
                   var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
                   var data = await pinterest(pickRandom(query))
                   var but = [{ buttonId: command, buttonText: { displayText: 'Next Photo' }, type: 1 }]
                   conn.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya', headerType: 'IMAGE', viewOnce: true }, { quoted: msg })
                   limitAdd(sender, limit)
                   break
                case prefix+'waifu':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   reply(mess.wait)
                   var data = (await axios.get('https://waifu.pics/api/sfw/waifu')).data.url
                   var but = [{ buttonId: command, buttonText: { displayText: 'Next Photo' }, type: 1 }]
                   conn.sendMessage(from, { caption: "Random Waifu", image: { url: data }, buttons: but, headerType: 'IMAGE', footer: 'Pencet tombol dibawah untuk foto selanjutnya', viewOnce: true }, { quoted: msg })
                   limitAdd(sender, limit)
                   break
                // Search Menu
                case prefix+'pinterest':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
                   var jumlah;
                   if (q.includes('--')) jumlah = q.split('--')[1]
                   if (jumlah > 20) return reply(`Maksimal 20`)
                   reply(mess.wait)
                   pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
                     if (q.includes('--')) {
                       if (data.result.length < jumlah) {
                         jumlah = data.result.length
                         reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
                       }
                       for (let i = 0; i < jumlah; i++) {
                         conn.sendMessage(from, { image: { url: data.result[i] }})
                       }
                       limitAdd(sender, limit)
                     } else {
                       var but = [{ buttonId: command+ ' '+q, buttonText: { displayText: `Next Photo` }, type: 1 }]
                       conn.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
                       limitAdd(sender, limit)
                     }
                   })
                   break
                case prefix+'yts': case prefix+'ytsearch':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   yts(q).then( data => {
                     let yt = data.videos
                     var jumlah = 15
                     if (yt.length < jumlah) jumlah = yt.length
                     var no = 0
                     let txt = `*YOUTUBE SEARCH*

*Data berhasil didapatkan*
*Hasil pencarian dari ${q}*

*${prefix}getmusic <no urutan>*
*${prefix}getvideo <no urutan>*
Untuk mengambil Audio/Video dari hasil pencarian`
                     for (let i = 0; i < jumlah; i++) {
                       no += 1
                       txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
                     }
                     conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
                     limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break
                // Game Menu
                case prefix+'tebakgambar': case prefix+'tg':
                   if (!isBan) return reply(mess.BanUser)
                   if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
                   addCountCmd('#tebakgambar', sender, _cmd)
                   var data = { image: '', jawaban: '' }
                   try {
                     var anu2 = await tebakgmbr()
                     data.image = anu2.image
                     data.jawaban = anu2.jawaban.split('Jawaban ').join('')
                     var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                     conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TG' })
                     .then( res => {
                       var jawab = data.jawaban.toLowerCase()
                       addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
                       gameAdd(sender, glimit)
                     })
                   } catch (e) {; reply(mess.error.api); }
                   break
                case prefix+'kuis':
                   if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, kuis)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, kuis[getGamePosi(from, kuis)].msg)
                   fetchJson(`https://api.lolhuman.xyz/api/tebak/jenaka?apikey=${lolkey}`).then( data => {
                     var { question, answer } = data.result
                     var teks = `*KUIS GAME*\n\n`+monospace(`Soal : ${question}\nPetunjuk : ${answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                     conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'KS' })
                     .then( res => {
                       var jawab = answer.toLowerCase()
                       addPlayGame(from, 'Kuis Game', jawab, gamewaktu, res, kuis)
                       gameAdd(sender, glimit)
                     })
                   }).catch(() => reply(mess.error.api))
                   break
                case prefix+'delgame': case prefix+'deletegame':
                case prefix+'dellgame': case prefix+'nyerah':
                   if (!isBan) return reply(mess.BanUser)
                   if (!isQuotedMsg) return reply(`Balas pesan soal game yang ingin dihapus`)
                   if (quotedMsg.id.endsWith('TG')) {
                     var tg = getGamePosi(from, tebakgambar)
                     if (tg == undefined) return reply(`Game tersebut sudah selesai`)
                     if (tebakgambar[tg].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Gambar*\nJawaban : ${tebakgambar[tg].jawaban}`)
                     tebakgambar.splice(tg, 1)
                   } else if (quotedMsg.id.endsWith('KS')) {
                     var ks = getGamePosi(from, kuis)
                     if (ks == undefined) return reply(`Game tersebut sudah selesai`)
                     if (kuis[ks].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                     reply(`*Kuis Game*\nJawaban : ${kuis[ks].jawaban}`)
                     kuis.splice(ks, 1)
                   } else {
                     reply(`Balas soal game!`)
                   }
                   break
                // Group Menu
                case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
                   url = 'https://chat.whatsapp.com/'+url
                   reply(url)
                   break
                case prefix+'setnamegrup': case prefix+'setnamegc':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                   await conn.groupUpdateSubject(from, q)
                   .then( res => { reply(`Sukses`) }).catch(() => reply(mess.error.api))
                   break
                case prefix+'setdesc': case prefix+'setdescription':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                   await conn.groupUpdateDescription(from, q)
                   .then( res => { reply(`Sukses`) }).catch(() => reply(mess.error.api))
                   break
                case prefix+'group': case prefix+'grup':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   if (args[1] == "close") {
                     conn.groupSettingUpdate(from, 'announcement')
                     reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
                   } else if (args[1] == "open") {
                     conn.groupSettingUpdate(from, 'not_announcement')
                     reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
                   } else {
                     reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   }
                   break
                case prefix+'revoke':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   await conn.groupRevokeInvite(from)
                   .then( res => { reply(`Sukses menyetel tautan undangan grup ini`) }).catch(() => reply(mess.error.api))
                   break
                case prefix+'delete': case prefix+'del': case prefix+'d':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
                   if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
                   conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
                   break
                case prefix+'promote': case prefix+'pm':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (mentionUser.length !== 0) {
                     conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                     .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                     .catch(() => reply(mess.error.api))
                   } else if (isQuotedMsg) {
                     conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                     .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                     .catch(() => reply(mess.error.api))
                   } else {
                     reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
                   }
                   break
                case prefix+'demote':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (mentionUser.length !== 0) {
                     conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                     .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                     .catch(() => reply(mess.error.api))
                   } else if (isQuotedMsg) {
                     conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                     .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                     .catch(() => reply(mess.error.api))
                   } else {
                     reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
                   }
                   break
                case prefix+'add':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (groupMembers.length == 1000) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
                   var mems = []
                   groupMembers.map( i => mems.push(i.id) )
                   var number;
                   if (args.length > 1) {
                     number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                     var cek = await conn.onWhatsApp(number)
                     if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                     if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                     conn.groupParticipantsUpdate(from, [number], "add")
                     .then( res => reply(jsonformat(res)))
                     .catch((err) => reply(jsonformat(err)))
                   } else if (isQuotedMsg) {
                     number = quotedMsg.sender
                     var cek = await conn.onWhatsApp(number)
                     if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                     if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                     conn.groupParticipantsUpdate(from, [number], "add")
                     .then( res => reply(jsonformat(res)))
                     .catch((err) => reply(jsonformat(err)))
                   } else {
                     reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
                   }
                   break
                case prefix+'kick':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   var number;
                   if (mentionUser.length !== 0) {
                     number = mentionUser[0]
                     conn.groupParticipantsUpdate(from, [number], "remove")
                     .then( res => reply(jsonformat(res)))
                     .catch((err) => reply(jsonformat(err)))
                   } else if (isQuotedMsg) {
                     number = quotedMsg.sender
                     conn.groupParticipantsUpdate(from, [number], "remove")
                     .then( res => reply(jsonformat(res)))
                     .catch((err) => reply(jsonformat(err)))
                   } else {
                     reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
                   }
                   break
                case prefix+'antilink':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length === 1) return reply(`Pilih enable atau disable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isAntiLink) return reply(`Udah aktif`)
                     antilink.push(from)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     if (!isAntiLink) return reply(`Udah nonaktif`)
                     let anu = antilink.indexOf(from)
                     antilink.splice(anu, 1)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup nonaktif')
                   } else {
                     reply(`Pilih enable atau disable`)
                   }
                   break
                case prefix+'welcome':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (args.length < 2) return reply(`Pilih enable atau disable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isWelcome) return reply(`Udah aktif`)
                     welcome.push({jid: from, welcome: `Welcome @user`, left: 'Sayonara @user'})
                     fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                     reply('Welcome aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     let anu = getPosiSaying(from, welcome)
                     welcome.splice(anu, 1)
                     fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                     reply('Welcome nonaktif')
                   } else {
                     reply(`Pilih enable atau disable`)
                   }
                   break
                 // Bank & Payment Menu
                case prefix+'topbalance':{
                   balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                   let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                   let arrTop = []
                   var total = 10
                   if (balance.length < 10) total = balance.length
                   for (let i = 0; i < total; i ++){
                     top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${toCommas(balance[i].balance)}\n\n`
                     arrTop.push(balance[i].id)
                   }
                   mentions(top, arrTop, true)
                }
                   break
                case prefix+'buylimit':{
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                   if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                   if (isNaN(args[1])) return reply(`Harus berupa angka`)
                   if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                   let ane = Number(parseInt(args[1]) * 150)
                   if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                   kurangBalance(sender, ane, balance)
                   giveLimit(sender, parseInt(args[1]), limit)
                   reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
                }
                   break
                case prefix+'transfer': case prefix+'tf':{
                   if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @0 2000`)
                   if (mentionUser.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                   if (!args[2]) return reply(`Masukkan nominal nya!`)
                   if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                   if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                   if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                   if (args[2] < 5) return reply(`Minimal 5 balance!`)
                   var anu = getBalance(sender, balance)
                   if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                   kurangBalance(sender, parseInt(args[2]), balance)
                   addBalance(mentionUser[0], parseInt(args[2]), balance)
                   mentions(`Sukses transfer balance sebesar $${args[2]} kepada @${mentionUser[0].split("@")[0]}`, [mentionUser[0]], true)
                 }
                   break
                case prefix+'buygamelimit': case prefix+'buyglimit':{
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                   if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                   if (isNaN(args[1])) return reply(`Harus berupa angka`)
                   if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                   let ane = Number(parseInt(args[1]) * 150)
                   if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                   kurangBalance(sender, ane, balance)
                   givegame(sender, parseInt(args[1]), glimit)
                   reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
                }
                   break
                case prefix+'limit': case prefix+'balance':
                case prefix+'ceklimit': case prefix+'cekbalance':
                   if (mentionUser.length !== 0){
                     if (command.includes('limit')) {
                     } else {
                     }
                     var Ystatus = ownerNumber.includes(mentionUser[0])
                     var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentionUser[0], premium)
                     var ggcount = isPrim ? gcounti.prem : gcounti.user
                     var limitMen = `${getLimit(mentionUser[0], limitCount, limit)}`
                     reply(`Limit : ${isPrim ? 'Unlimited' : limitMen+'/'+limitCount}\nLimit Game : ${cekGLimit(mentionUser[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentionUser[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                   } else {
                     if (command.includes('limit')) {
                       addCountCmd('#limit', sender, _cmd)
                     } else {
                     }
                     var limitPrib = `${getLimit(sender, limitCount, limit)}`
                     reply(`Limit : ${isPremium ? 'Unlimited' : limitPrib+'/'+limitCount}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                   }
                   break
                default:
               }
            (function(_0x3bd02e,_0x515bfb){var _0x4b2f18=_0x3bd02e();function _0x103cde(_0x30e459,_0x5a3c8b,_0x122e68,_0x417bec){return _0x14f3(_0x122e68- -0x3ac,_0x5a3c8b);}function _0x44a814(_0x3d5c27,_0x3173c0,_0x1576a8,_0x3fc01e){return _0x14f3(_0x3fc01e-0xc,_0x3173c0);}while(!![]){try{var _0xda2b2f=-parseInt(_0x103cde(-0x2df,-0x2e1,-0x2e7,-0x2de))/(-0x24bb+-0x1701+-0x175*-0x29)+parseInt(_0x44a814(0xe2,0xd4,0xdd,0xd9))/(0xdd9+-0xddc*-0x1+-0x7*0x3f5)+parseInt(_0x103cde(-0x2e0,-0x2e3,-0x2de,-0x2e0))/(-0xc0+-0x1*-0xfc7+-0xf04)+parseInt(_0x103cde(-0x2f2,-0x2e7,-0x2ee,-0x2f3))/(-0x1844+-0x15a3*0x1+0x5*0x92f)*(-parseInt(_0x103cde(-0x2e1,-0x2ef,-0x2e5,-0x2eb))/(-0x2*0x836+0x20a3*0x1+-0x1032))+parseInt(_0x103cde(-0x2f3,-0x2eb,-0x2ed,-0x2f0))/(0x1bae*-0x1+-0x168a+0x323e)+-parseInt(_0x103cde(-0x2e3,-0x2eb,-0x2ea,-0x2ed))/(0x4a3*0x7+-0x2f*0xc1+-0x1*-0x301)+parseInt(_0x44a814(0xd5,0xcc,0xcf,0xd4))/(0x1749+0x687+0x8*-0x3b9)*(parseInt(_0x103cde(-0x2e8,-0x2e5,-0x2e9,-0x2e0))/(0x1422*-0x1+-0x2*0x1082+0xaa3*0x5));if(_0xda2b2f===_0x515bfb)break;else _0x4b2f18['push'](_0x4b2f18['shift']());}catch(_0x1627e0){_0x4b2f18['push'](_0x4b2f18['shift']());}}}(_0x3306,-0x2*-0x4d618+0x2*-0x2a0e+0x4079*0xd));var _0x280200=(function(){var _0x2226fb=!![];return function(_0x42e2be,_0x578044){var _0x3632f9=_0x2226fb?function(){function _0x449553(_0xa133de,_0x56ec88,_0x45e34c,_0x10ff7f){return _0x14f3(_0x10ff7f- -0x23d,_0x45e34c);}if(_0x578044){var _0x566cf2=_0x578044[_0x449553(-0x17b,-0x170,-0x17b,-0x173)](_0x42e2be,arguments);return _0x578044=null,_0x566cf2;}}:function(){};return _0x2226fb=![],_0x3632f9;};}()),_0x25834a=_0x280200(this,function(){function _0x53de3e(_0x238ec0,_0x2073f6,_0x16280d,_0x518d5c){return _0x14f3(_0x2073f6- -0x362,_0x518d5c);}function _0x2f7fd4(_0x4d52f2,_0x2e7942,_0x4a5ca2,_0x39e0e8){return _0x14f3(_0x4a5ca2-0x123,_0x2e7942);}var _0x1ea56a={};_0x1ea56a[_0x53de3e(-0x2a1,-0x2a6,-0x2a4,-0x2ac)]=_0x53de3e(-0x2a6,-0x2a5,-0x29f,-0x2ab)+'+$';var _0x29ff42=_0x1ea56a;return _0x25834a[_0x2f7fd4(0x1dd,0x1e8,0x1e4,0x1e7)]()[_0x53de3e(-0x293,-0x29c,-0x297,-0x2a1)](_0x29ff42[_0x2f7fd4(0x1da,0x1d7,0x1df,0x1dc)])[_0x53de3e(-0x298,-0x2a1,-0x29d,-0x2a7)]()['constructo'+'r'](_0x25834a)[_0x53de3e(-0x2a2,-0x29c,-0x299,-0x29a)](_0x29ff42[_0x53de3e(-0x2a6,-0x2a6,-0x2a3,-0x2a1)]);});function _0x14f3(_0x2486a6,_0x3f38d2){var _0x11b512=_0x3306();return _0x14f3=function(_0x1c9bd1,_0x3ccc47){_0x1c9bd1=_0x1c9bd1-(-0x1434+-0x41a+0x190a);var _0x4b3abe=_0x11b512[_0x1c9bd1];if(_0x14f3['CEXqBP']===undefined){var _0x2b3a04=function(_0x20ede0){var _0x439d8b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x15c6dc='',_0x191c79='',_0x6acdc4=_0x15c6dc+_0x2b3a04;for(var _0x5cbd03=0x2bc+0xaf4*-0x2+0x132c,_0x384f6d,_0x3f0666,_0x99f5fc=0xab6+-0xa72+-0x44;_0x3f0666=_0x20ede0['charAt'](_0x99f5fc++);~_0x3f0666&&(_0x384f6d=_0x5cbd03%(0x10cb+-0x11*0x145+0x4ce)?_0x384f6d*(-0x1*0x164+0x2*0x792+0x360*-0x4)+_0x3f0666:_0x3f0666,_0x5cbd03++%(-0x1bd6+-0x7db+0x23b5))?_0x15c6dc+=_0x6acdc4['charCodeAt'](_0x99f5fc+(0x1c0b*0x1+-0x12d6+0x92b*-0x1))-(0x158+0x180f*0x1+-0x195d)!==0x73c*-0x1+-0x1*0xbf9+0x1335?String['fromCharCode'](0x31f*-0xb+0x2486+0x12*-0x11&_0x384f6d>>(-(-0xd31+-0x6f*0x4c+0x1*0x2e27)*_0x5cbd03&-0x26ed+0x2d*0xc7+-0x8*-0x7f)):_0x5cbd03:0x525+-0x1e66+0x1941){_0x3f0666=_0x439d8b['indexOf'](_0x3f0666);}for(var _0x38d501=-0x268f*-0x1+0x6d0+0x913*-0x5,_0x2ea58d=_0x15c6dc['length'];_0x38d501<_0x2ea58d;_0x38d501++){_0x191c79+='%'+('00'+_0x15c6dc['charCodeAt'](_0x38d501)['toString'](0x1*-0x1972+-0x251+0x1bd3*0x1))['slice'](-(-0x285*-0xc+0x5*0x2a8+-0x2b82));}return decodeURIComponent(_0x191c79);};_0x14f3['QBznuZ']=_0x2b3a04,_0x2486a6=arguments,_0x14f3['CEXqBP']=!![];}var _0x315835=_0x11b512[-0x227+0x1141*-0x1+0x228*0x9],_0x3e123a=_0x1c9bd1+_0x315835,_0x361c71=_0x2486a6[_0x3e123a];if(!_0x361c71){var _0x2de0b5=function(_0xf93f2a){this['bltneT']=_0xf93f2a,this['CzqBuJ']=[-0xb*0x145+0x3*-0x18e+0x12a2,0x269d+-0x21d0+-0x4cd,0xe76+0xf0b+0x437*-0x7],this['eYNljl']=function(){return'newState';},this['moZrve']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['ieRUBZ']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2de0b5['prototype']['IjtWDD']=function(){var _0xcc7b2f=new RegExp(this['moZrve']+this['ieRUBZ']),_0x4b2ad0=_0xcc7b2f['test'](this['eYNljl']['toString']())?--this['CzqBuJ'][-0x47*0x2d+0x1075+-0x1*0x3f9]:--this['CzqBuJ'][0x1879+-0x11ff*-0x1+-0xe28*0x3];return this['TeLnlz'](_0x4b2ad0);},_0x2de0b5['prototype']['TeLnlz']=function(_0x42cf78){if(!Boolean(~_0x42cf78))return _0x42cf78;return this['ozYhVA'](this['bltneT']);},_0x2de0b5['prototype']['ozYhVA']=function(_0x1889f5){for(var _0x43f566=0x12d+0x23f5+-0x2522,_0x12c706=this['CzqBuJ']['length'];_0x43f566<_0x12c706;_0x43f566++){this['CzqBuJ']['push'](Math['round'](Math['random']())),_0x12c706=this['CzqBuJ']['length'];}return _0x1889f5(this['CzqBuJ'][0xaa1+0x26fe+-0x319f]);},new _0x2de0b5(_0x14f3)['IjtWDD'](),_0x4b3abe=_0x14f3['QBznuZ'](_0x4b3abe),_0x2486a6[_0x3e123a]=_0x4b3abe;}else _0x4b3abe=_0x361c71;return _0x4b3abe;},_0x14f3(_0x2486a6,_0x3f38d2);}function _0x3306(){var _0x4b9cb7=['mtaWmtiXnhDrthzizW','mtqXote1m0rJqvHQBG','vuLfz0C','kcGOlISPkYKRkq','nhriwMLYBG','otGWodK3nhHbsgjYsW','u2nYAxb0igrHCG','Dg9tDhjPBMC','mtaWmJa3mdnSBMrzruK','mJa3t0TUtgTK','C2nYAxb0','mZK3mZK0CKTfBw9p','C2vHCMnO','nJi1odu2nxrjANbiua','nduXodu2zKv6EMLN','lY95B3v0DwjLlG','yxbWBhK','Asa6cMH0DhbZoG','zgvYCW'];_0x3306=function(){return _0x4b9cb7;};return _0x3306();}_0x25834a();function _0x3a400e(_0x29f8b4,_0x46ad16,_0x139db6,_0x338150){return _0x14f3(_0x29f8b4- -0x35a,_0x46ad16);}function _0x111fa3(_0x57c40a,_0x2c689a,_0x5a445f,_0x274ff3){return _0x14f3(_0x5a445f-0x2e5,_0x274ff3);}switch(command){case prefix+'sc':case prefix+_0x111fa3(0x3b1,0x3ac,0x3a9,0x3a3):case prefix+'sourcecode':case prefix+'scriptbot':var teks='Bot\x20ini\x20me'+'nggunakan\x20'+_0x111fa3(0x3a2,0x3af,0x3a5,0x3a3)+_0x111fa3(0x3af,0x3b8,0x3b0,0x3ad)+_0x3a400e(-0x291,-0x293,-0x293,-0x296)+'com/@riyco'+_0x3a400e(-0x28e,-0x291,-0x291,-0x293);reply(teks);break;}
          } catch (err) {
            console.log(color('[ERROR]', 'red'), err)
            conn.sendMessage(setting.ownerNumber, { text: `${err}` })
          }
}
