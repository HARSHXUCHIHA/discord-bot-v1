// const Discord = require('discord.js');
// const { MessageEmbed } = require('discord.js')
// const command = require('/command')
const ownerId = '736585111889510400' // my discord user ID
const channelId = '866529068291194920' // private channel ID

module.exports = (client) => {
  command(client, 'eval', (message) => {
    const { member, channel, content } = message

    if (member.id === ownerId && channel.id === channelId) {
      const result = eval(content.replace('!eval ', ''))
      channel.send(result)
    }
  })
}
