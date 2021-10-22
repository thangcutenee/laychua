module.exports.config = {
	name: "nobra",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Trung Kiên edit by Tiadals",
	description: "",
	commandCategory: "random-img 18+",
	usages: "nobra",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var money = (await Currencies.getData(event.senderID)).money
	if (money >= 200) {
	axios.get('https://simsimi.info/v2/image.php?api_key=leanhtruong&image=nobra').then(res => {
	var image = res.data.data;
	let callback = function () {
					api.sendMessage({
						body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
				};
				request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
				Currencies.setData(event.senderID, options = {money: money - 200})
			})
	} else return api.sendMessage("Bạn cần 200 đô ?",event.threadID,event.messageID);
}