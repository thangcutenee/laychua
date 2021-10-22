module.exports.config = {
 name: "nghỗng",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "JRT",
 description: "Như tên modu", //nhập thứ bạn muốn
 commandCategory: "Random-img", //Phần hiển thị trên help
 usages: "nghỗng", //cách sử dụng
 cooldowns: 1, //thời gian chờ cách nhau
 
 };
   
module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 axios.get('https://nekos.life/api/v2/img/goose').then(res => { //nhập api từ nekos.life
 let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 
 let callback = function () {
     api.sendMessage({
      body: " Con này ngon,phải được mấy đĩa tiếc là tôi ăn chay",
      attachment: fs.createReadStream(__dirname + `/cache/dog.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dog.${ext}`)).on("close", callback);
   })
}