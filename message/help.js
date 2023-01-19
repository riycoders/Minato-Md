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
	return `_*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

╭─○「 *${setting.botName}* 」
│ • Library : *Baileys-MD*.
│ • Prefix : ( ${prefix} )
│ • Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
│ • Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
╰○

╭─○「 *Info User* 」
│ • Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
│ • Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
│ • Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
│ • Balance : $${toCommas(getBalance(sender, balance))}
╰○
${readmore}
╭─○「 *Main Menu* 」
│ • ${prefix}menu
│ • ${prefix}owner
│ • ${prefix}script
│ • ${prefix}donasi
│ • ${prefix}speed
│ • ${prefix}runtime
│ • ${prefix}cekprem
│ • ${prefix}listprem
╰○

╭─○「 *Converter/Tools* 」
│ • ${prefix}sticker
│ • ${prefix}stickerwm
│ • ${prefix}takesticker
│ • ${prefix}toimg
│ • ${prefix}tovid
│ • ${prefix}tomp3
│ • ${prefix}upload
╰○

╭─○「 *Baileys* 」
│ • ${prefix}getquotedmsg
│ • ${prefix}tagall
│ • ${prefix}hidetag
╰○

╭─○「 *Downloader* 」
│ • ${prefix}play
│ • ${prefix}tiktok
│ • ${prefix}ytmp4
│ • ${prefix}ytmp3
│ • ${prefix}getvideo
│ • ${prefix}getmusic
╰○

╭─○「 *Random Menu* 」
│ • ${prefix}quote
│ • ${prefix}randomfakta
│ • ${prefix}cecan
│ • ${prefix}cogan
│ • ${prefix}waifu
╰○
 
╭─○「 *Search Menu* 」
│ • ${prefix}pinterest
│ • ${prefix}ytsearch
╰○
 
╭─○「 *Game Menu* 」
│ • ${prefix}tebakgambar
│ • ${prefix}kuis
│ • ${prefix}nyerah
╰○
  
╭─○「 *Payment Bank* 」
│ • ${prefix}topbalance
│ • ${prefix}buylimit
│ • ${prefix}buyglimit
│ • ${prefix}transfer
│ • ${prefix}limit
│ • ${prefix}balance
╰○
  
╭─○「 *Group Menu* 」
│ • ${prefix}linkgrup
│ • ${prefix}setnamegc
│ • ${prefix}setdesc
│ • ${prefix}group
│ • ${prefix}revoke
│ • ${prefix}delete
│ • ${prefix}promote
│ • ${prefix}demote
│ • ${prefix}add
│ • ${prefix}kick
│ • ${prefix}antilink
│ • ${prefix}welcome
╰○

╭─○「 *Owner Menu* 」
│ • > evalcode
│ • x evalcode-2
│ • $ executor
│ • ${prefix}exif
│ • ${prefix}self
│ • ${prefix}public
│ • ${prefix}leave
│ • ${prefix}join
│ • ${prefix}addprem
│ • ${prefix}delprem
│ • ${prefix}resetlimit
│ • ${prefix}broadcast
╰○

╭─○「 *Thanks To* 」
│ • Irfan H.
│ • Yoga A.
│ • Faiz Frdnd
│ • Arthur
│ • Gabriel / Guntur
│ • Amirul Dev
│ • riycoders
╰○`
}