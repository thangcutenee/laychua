module.exports.config = {
  name: "chitanda",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Tiadals với api của Kadeer",
  description: "Vợ tôi",
  commandCategory: "Random-img alime",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apichitanda.ocvat2810.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `🌸Vợ tôi nè <3`,
            attachment: fs.createReadStream(__dirname + `/cache/violet.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/violet.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/violet.${ext}`)).on("close", callback);
      })
}