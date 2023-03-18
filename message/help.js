const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1.$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount, ucapanWaktu) => {
	return `*── 「 ${setting.botName} 」 ──*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

 Library : *Baileys-MD*.
 Prefix : ( ${prefix} )
 Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
 Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB

 Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
 Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
 Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
 Balance : $${toCommas(getBalance(sender, balance))}
${readmore}
 *MAIN MENU*
 *≻* ${prefix}menu
 *≻* ${prefix}botinfo
 *≻* ${prefix}owner
 *≻* ${prefix}script
 *≻* ${prefix}donasi
 *≻* ${prefix}speed
 *≻* ${prefix}runtime
 *≻* ${prefix}cekprem
 *≻* ${prefix}listprem

 *CONVERTER/TOOLS*
 *≻* ${prefix}sticker
 *≻* ${prefix}stickerwm
 *≻* ${prefix}takesticker
 *≻* ${prefix}toimg
 *≻* ${prefix}tovid
 *≻* ${prefix}tomp3
 *≻* ${prefix}emojimix
 *≻* ${prefix}stickermeme
 *≻* ${prefix}qc
 *≻* ${prefix}nulis
 *≻* ${prefix}upload

 *BAILEYS*
 *≻* ${prefix}getquotedmsg
 *≻* ${prefix}tagall
 *≻* ${prefix}hidetag

*ANONYMOUS CHAT*
 *≻* ${prefix}anonymous
 *≻* ${prefix}start
 *≻* ${prefix}stop
 *≻* ${prefix}skip
 *≻* ${prefix}sendprofile
 *≻* ${prefix}menfess

 *DOWNLOADER*
 *≻* ${prefix}play
 *≻* ${prefix}tiktok
 *≻* ${prefix}ytmp4
 *≻* ${prefix}ytmp3
 *≻* ${prefix}getvideo
 *≻* ${prefix}getmusic
 *≻* ${prefix}instagram
 *≻* ${prefix}igstory
 *≻* ${prefix}mediafire
 *≻* ${prefix}spotifydl

*MAKER MENU*
 *≻* ${prefix}neon
 *≻* ${prefix}black
 *≻* ${prefix}circuit
 *≻* ${prefix}glitch
 *≻* ${prefix}fiction
 *≻* ${prefix}blackpink
 *≻* ${prefix}neonligth
 *≻* ${prefix}toxic
 *≻* ${prefix}matrix
 *≻* ${prefix}neonpl
 *≻* ${prefix}breakwall
 *≻* ${prefix}grafity
 *≻* ${prefix}grafity2
 *≻* ${prefix}gameover
 *≻* ${prefix}pornhub
 *≻* ${prefix}wolf

 *RANDOM MENU*
 *≻* ${prefix}quote
 *≻* ${prefix}randomfakta
 *≻* ${prefix}cecan
 *≻* ${prefix}cogan
 *≻* ${prefix}waifu
 *≻* ${prefix}darkjokes

 *SEARCH MENU*
 *≻* ${prefix}grupwa
 *≻* ${prefix}pinterest
 *≻* ${prefix}ytsearch

 *GAME MENU*
 *≻* ${prefix}tebakgambar
 *≻* ${prefix}kuis
 *≻* ${prefix}tebakbendera
 *≻* ${prefix}tebakkata
 *≻* ${prefix}tebakkalimat
 *≻* ${prefix}asahotak
 *≻* ${prefix}susunkata
 *≻* ${prefix}siapakahaku
 *≻* ${prefix}nyerah

 *PAYMENT BANK*
 *≻* ${prefix}topbalance
 *≻* ${prefix}buylimit
 *≻* ${prefix}buyglimit
 *≻* ${prefix}transfer
 *≻* ${prefix}limit
 *≻* ${prefix}balance

 *GROUP MENU*
 *≻* ${prefix}linkgrup
 *≻* ${prefix}setppgrup
 *≻* ${prefix}setnamegc
 *≻* ${prefix}setdesc
 *≻* ${prefix}group
 *≻* ${prefix}revoke
 *≻* ${prefix}delete
 *≻* ${prefix}promote
 *≻* ${prefix}demote
 *≻* ${prefix}add
 *≻* ${prefix}kick
 *≻* ${prefix}antilink
 *≻* ${prefix}welcome

 *OWNER MENU*
 *≻* > evalcode
 *≻* x evalcode-2
 *≻* $ executor
 *≻* ${prefix}exif
 *≻* ${prefix}self
 *≻* ${prefix}public
 *≻* ${prefix}leave
 *≻* ${prefix}join
 *≻* ${prefix}setppbot
 *≻* ${prefix}addprem
 *≻* ${prefix}delprem
 *≻* ${prefix}resetlimit
 *≻* ${prefix}broadcast`
}