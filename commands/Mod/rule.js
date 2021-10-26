const { MessageEmbed } = require('discord.js')
module.exports = {
    commands: ['rules',], // You Can Keep Any Name
    permissions: 'ADMINISTRATOR', // You Can Keep Any Permission
    permissionError: 'You Cant Use It',
    description: 'rules Message', //Optional
    callback: (message, args) => {
        const embed = new MessageEmbed()
            // .setAuthor(`${user.user.username} Added Money`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            #1) No offensive profile pictures.

            #2) No Politics talks or topics should be raised.
            
            #3) No Racism, No Homophobia, and No Pedophilia, usernames, and statuses that have it will be an instant ban, and any jokes made about it will be an instant ban.
            
            #4) No inappropriate usernames, they will be changed.
            
            #5) No spamming in the discord server under any circumstance. 
            (No arguing with mods on what is or is not spam)
            
            #6) No talking disrespectfully of other content creators.
            
            #7) Please keep the server to English or Nepali, this is for our moderation team, if you can’t keep to English or Nepali it will be a kick.
            
            #8) If we found someone under 13 y/o, simply that member would be banned according to Discord TOS.
            
            #9) Keep language and topics friendly, we want everyone to feel safe in this community.
            
            #10) Just listen to mods, arguing or harassing mods will lead to a kick/ban.
            
            #11) If any of the above rules are violated then staff reserves the right to take the necessary action against the offender.
            
            #12: Follow - https://discordapp.com/terms & https://discordapp.com/guidelines
#13) Do not advertise
Do not post your server invite link in any chat. We are not a fan of advertising in this server.

#14) Keep all messages and content in their respective channels
Please keep content and discussions in their appropriate channels. For example, paste videos in #media-dump, not #general or other channels.

#15) Be respectful to other users
We do not tolerate harassment, discrimination, or invading other people's privacy. Result in doing so may be a temporary mute.

#16) No phishing links to malware, screamers, etc.
This should be obvious. We do not tolerate phishing links.

#17) No excessive swearing or mic spamming.
Mic spamming or consistent swearing may result in a temporary mute.

#18) No caps lock
This is simple, we can allow certain words to be capitalized, just not a whole message. You will be given a warning if your whole message is capitalized.

#19) All of Discord's Terms of Service apply to this server.
You are held accountable for any and all actions performed on your account, regardless of the individual involved. More details are available at https://discordapp.com/tos.

#20) No spam
We do not tolerate spam unless in certain text channels. Please check the topic of each text channel if spam is allowed.
            

			
		Be sure to follow the rules above and have fun! 
		Feel free to give us some suggestions to add to our server! :)
        `)
        message.channel.send(embed)
          message.channel.send('@everyone');
    }
}