module.exports.config = {
  name: "latapi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Trung Kiên",
  description: "Kho Ảnh waifu",
  commandCategory: "Random-img",
  usages: "[]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  let name = await Users.getNameUser(event.senderID)
  const { threadID, messageID } = event;
  var type;
  switch (args[0]) {
    case "du":
      type = "du";
      break;
    case "nobra":
      type = "nobra";
      break;
      case "vitamingirl":
      type = "vitamin";
      break;
      case "trai":
      type = "boy";
      break;
      case "meme":
      type = "memevn";
      break;
      case "sexygirl":
      type = "sexy";
      break;
      case "cosplay":
      type = "cosplay";
      break;
      case "gái":
      type = "girlvn";
      break;
    default:
      return api.sendMessage(`❤️LIST WAIFU❤️\n»1/du\n»2/nobra\n»3/Kanna\n»4/Umaru\n»5/Kurumi\n»6/Lucy\n»7/Sagiri`, threadID, messageID);
      break;
  }
  axios.get(`https://simsimi.info/v2/image.php?api_key=leanhtruong&image=${type}`).then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function() {
      api.sendMessage({
        body: `Hi ${name}\nẢnh của bạn đây! `,
        attachment: fs.createReadStream(__dirname + `/cache/${type}.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.${ext}`)).on("close", callback);
  })
}