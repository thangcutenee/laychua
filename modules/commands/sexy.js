module.exports.config = {
	name: "sexy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Trung Kiên",
	description: "",
	commandCategory: "Random-img",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var money = (await Currencies.getData(event.senderID)).money
	if (money >= 500) {
	axios.get('http://api.vangbanlanhat.tk/image?type=sexy').then(res => {
	var image = res.data.data;
	let callback = function () {
					api.sendMessage({
						body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
				};
				request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
				Currencies.setData(event.senderID, options = {money: money - 500})
			})
	} else return api.sendMessage("Bạn cần 500 đô ?hãy làm việc đi",event.threadID,event.messageID);
}