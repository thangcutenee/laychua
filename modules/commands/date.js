module.exports.config = {
  name: "date",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "Xem giờ bằng ảnh\nCredits: NTKhang",
  commandCategory: "other",
  usages: "",
  cooldowns: 5,
};

function wrapText(ctx, text, maxWidth) {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
}

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas, Canvas } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + "/cache/clock.png";

  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");

  var cadao = ((await axios.get("https://api.berver.tech/cadao")).data).data;
  //câu ca dao
  
  var texta = gio;
  var textb = cadao;
  
  /* var imgg = [
    "https://bit.ly/3s2ZYIJ",
    "https://bit.ly/3t21nk8",
    "https://bit.ly/3dMPV5y",
    "https://bit.ly/3uqpRUu",
    "https://bit.ly/39OVT4H",
    "https://bit.ly/3muvb6i"]*/
  var imgg = [
    "https://s1.uphinh.org/2021/04/09/PicsArt_04-09-05.44.24.jpg",
    "https://s1.uphinh.org/2021/04/09/PicsArt_04-09-05.44.06.jpg",
    "https://s1.uphinh.org/2021/04/09/4f8d78f0571f3a581f09837b007ac468.jpg",
  "https://s1.uphinh.org/2021/04/10/PicsArt_04-10-10.24.09.jpg"
  ];
  var imgrd = imgg[Math.floor(Math.random() * imgg.length)];

  let getimg = (await axios.get(`${imgrd}`, { responseType: "arraybuffer" }))
    .data;
  fs.writeFileSync(pathImg, Buffer.from(getimg, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "28px Courier New";//Courier New
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  let fontSize = 500;
  ctx.fillText(texta, (baseImage.width/2 - texta.length/2*15), baseImage.height/2);

 ctx.fillText(textb, baseImage.width/2-textb.length/2*14, baseImage.height/2 + 30);
  ctx.beginPath();
const imageBuffer = canvas.toBuffer();
  
  
fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
