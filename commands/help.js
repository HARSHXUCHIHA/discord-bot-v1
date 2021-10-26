module.exports = {
    name: 'help',
    commands: ['help', 'h'], // You Can Keep Any Name
    description: "this a help command",
    callback: (message, args) => {
        message.reply(`
        (Mod) kick, mute, purge, tempban, tempmute, unban, unmute, warn, unwarn,
        (Music) np, pause, play, queue, remove,resume,skip,stop,
        (Economy) balance, beg, daily, deposit, monthly, rob, weekly,withdraw,
        (Fun) chatbot, meme, translate
        (info) bot-info, ping, server-info, uptime, user-info, 
        (Per-Server_commands/reset) resetcahtbot, resetlevelup, reset-prefix 
        (Per-Server_commands/set) setcahtbot, setlevelup, set-prefix 
        (Search) Wiki, yt-s
        (rank) addlevel, Addxp, removelevel, removexp
        (prefix)= '!'
        
`)
    }

}