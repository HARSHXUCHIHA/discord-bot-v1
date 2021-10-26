const { Client, Message } = require("discord.js");
const translate = require('@iamtraction/google-translate'); //npm i @iamtraction/google-translate

module.exports = {
    commands: ['translate', 'tr'],
    description: 'Sends A translate', // Optional

    callback: async (message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("please specify a text to translate");

    const translated = await translate(query, { to: 'en'}); // this will translate any language to 'en' English. 
    message.channel.send(translated.text);

  },
};

// for more information read https://www.npmjs.com/package/@iamtraction/google-translate