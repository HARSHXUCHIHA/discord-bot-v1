const { Client } = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['ping'],
    description: 'A ping command that shows the BOT & API ping!', 
    callback:  (message, args, text, client) => {

        message.reply('Calculating Ping...').then((resultMessage => {

        const ping = resultMessage.createdTimestamp - message.createdTimestamp  
        
        const embed = new MessageEmbed()
        .setTitle('Bot & API Ping')
        .setDescription(`Bot Latency: ${ping}, API Latency: ${client.ws.ping}`)
        .addField('Command Used By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
        }))
    },
}