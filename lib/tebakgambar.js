const axios = require("axios")
const cheerio = require("cheerio")

exports.tebakgmbr = async() => {
   return new Promise(async(resolve, reject) => {
      axios.get('https://jawabantebakgambar.net/all-answers/')
      .then(({ data }) => {
        const $ = cheerio.load(data)
        let random = Math.floor(Math.random() * 2836) + 2;
        let link2 = 'https://jawabantebakgambar.net'
        $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
          const img = link2 + $(b).find('img').attr('data-src')
          const jwb = $(b).find('img').attr('alt')
          const result = {
            message: 'By Irfan',
            image: img,
            jawaban: jwb
          }
          resolve(result)
        })
      })
      .catch(reject)
    })
}