module.exports.config = {
	name: "shiba",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thanh Dz edit by Tiadal",
	description: "Random ảnh chó shiba",
	commandCategory: "random-img",
	usages: "shiba",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://shiba.ocvat2810.repl.co').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/shiba.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shiba.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/shiba.${ext}`)).on("close", callback);
			})
}