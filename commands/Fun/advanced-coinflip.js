const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms') // npm i parse-ms@2.1.0
const { Capitalize } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest

module.exports = {
    commands: ['coinflip', 'coin-flip', 'cf'], // You Can Keep Any Name
    description: 'Flip Coin ANd Earn $', // Optional

    callback: async(message, args, client) => {

        const user = message.member
        const ht = args[0] 
        if(!ht) return message.reply(`What You Chose? heads or tails?`) // If No heads Or tails Provided
        const amount = args[1]
        if(!amount) return message.reply(`Provide Amount`) // If No Amount Provided
        const bal = db.fetch(`money_${user.id}`)
        
        const coin = ['heads', 'tails'] // Coin Options

        const timeout = 120000 // 120000 = 2 Mins
        const coinfliptime = db.fetch(`coinfliptime_${user.id}`)
        if(coinfliptime !== null && timeout - (Date.now() - coinfliptime) > 0) { // CoolDown
            const timeleft = ms(timeout - (Date.now() - coinfliptime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Already Fliped, Flip Again In **${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **2 Minutes**
            `)
            message.channel.send(embed)
        } else {
            if(!coin.includes(ht)) return message.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > bal) return message.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return message.reply(`Need To Bet Atleast $500`) // If Provided Amount Is Less Then $500

            const flip = coin[Math.floor(Math.random() * coin.length)]

            const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                Capital: flip
            })

            if(flip === ht) { // If Coin Fliped Is What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Got ${amount}
                `)
                message.channel.send(embed)
                db.add(`money_${user.id}`, amount)
                db.set(`coinfliptime_${user.id}`, Date.now())
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                message.channel.send(embed)
                db.subtract(`money_${user.id}`, amount)
                db.set(`coinfliptime_${user.id}`, Date.now())
            }
        }
    }
}