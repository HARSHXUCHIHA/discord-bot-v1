const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms') // npm i parse-ms@2.1.0
const { Capitalize } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest

module.exports = {
    commands: ['search'], // You Can Keep Any Name
    description: 'Search For Money', // Optional

    callback: async (message, args, client) => {

        const user = message.member

        const timeout = 120000 // 120000 = 2 Mins
        const seacrtime = db.fetch(`seacrtime_${user.id}`)
        if (seacrtime !== null && timeout - (Date.now() - seacrtime) > 0) { // CoolDown
            const timeleft = ms(timeout - (Date.now() - seacrtime))

            const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Searched`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
Already Searched, Search Again In **${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **2 Minutes**
            `)
            message.channel.send(embed)
        } else {
            const locations = [ // Places To Search For Money
                "car",
                "sock",
                "wallet",
                "box",
                "pocket",
                "bus",
                "park",
                "train",
                "lounge",
                "keyboard",
                "bathroom",
                "bed",
                "sofa",
                "backpack",
                "laptop",
                "sewer",
                "pantry",
                "shoe",
                "tree",
                "air",
                "street",
                "attic",
                "grass",
                "bus"
            ]
            let location = locations.sort(() =>
                Math.random() - Math.random()
            ).slice(0, 3) // Get 3 Options From locations

            const amount = Math.floor(Math.random() * 1500) + 500 // Minimum = 500 , Maximum = 2000

            message.channel.send(`<@${user.id}> Where Do You Want To Search?\n\`${location.join("` `")}\``) // Send Message With Options

            const filter = (m) => {
                return m.author.id === user.id // To Check Is Messages User ID Is Same As Who Used Command
            }
            const collector = message.channel.createMessageCollector(filter, {
                max: 1,
                time: 40000, // 40000 = 40 Seconds
            })

            collector.on('collect', async (m) => { // If User Gave Correct Option
            
                const searched = Capitalize({
                    Capital: m.content
                })

                const embed = new MessageEmbed()
                    .setAuthor(`${user.user.username} Searched`, user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
You Searched For Money In **${searched}** And Found **$${amount.toLocaleString()}**
                `)
                message.channel.send(embed)
                db.add(`money_${user.id}`, amount)
                db.set(`seacrtime_${user.id}`, Date.now())
                collector.stop()
            })
            collector.on('end', collected => { // If User Didn't Answer In Time
                if(collected.size === 0) {
                    message.channel.send(`<@${user.id}> Your Time Finished, Their Was **$${amount.toLocaleString()}** In Those Place`)
                    db.set(`seacrtime_${user.id}`, Date.now())
                    collector.stop()
                }
            })
        }
    }
}