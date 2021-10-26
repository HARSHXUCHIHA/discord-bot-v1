
const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    const suggestinChannel = client.channels.cache.get('859743894286630922') // Channel For Suggestion
    client.on('message', message => {
        if(message.channel === suggestinChannel) {
            if(message.author.bot) return // Doesnot Delete BOTs Messages
            message.delete() // Delete Original Message Sent By User

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
            .setDescription(`${message.content}`)
            .setFooter('Want To Suggest Something? Type In This Channel.')
            message.channel.send(embed).then(message => { // Reactions
                message.react('<:Yes:802970837065924629>') // Change Emoji
                message.react('<:No:802970836498907179>') // Change Emoji
            })
        }
    })
}