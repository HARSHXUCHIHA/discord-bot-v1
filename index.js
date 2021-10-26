const Discord = require('discord.js');
const http = require('http');
const express = require('express');
const path = require('path');
const client = new Discord.Client({ partials: ['MESSAGE', 'USER', 'REACTION'] });
//const { MessageButton } = require('discord-buttons')(client);
const db = require('quick.db')

client.queue = new Discord.Collection()
require('events').EventEmitter.defaultMaxListeners = 80;

const { token } = require('./config.json')
const welcome = require('./commands/Mod/welcome');
const loadcommand = require('./commands/load-command');
const suggest = require('./commands/Fun/suggest');
const cahtbot = require('./commands/Fun/chatbot');
const lb = require('./commands/Economy/lb');
const uptime = require('./commands/Info/uptime');
const botInfo = require('./commands/Info/bot-info');
//const createcommon = require('./commands/Ticket/Reaction/create-command')
// const botJoinLeaveLogs = require('./commands/Per-Server-Commands/Other/bot-join-leave-logs');
// const joinMessage = require('./commands/Per-Server-Commands/Other/join-message');
//const rank = require('./commands/Rank/rank');
const create = require('./commands/Ticket/create');
//const status = require('./commands/Minecraft/status')

client.once('ready', (x) => {
  setInterval(() => {
    const statuses = [
      'Harsh op',

    ]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, { type: "WATCHING" }) // Can Be WATCHING, STREAMING, LISTENING
  }, 2000) // Second You Want to Change Status, This Cahnges Every 2 Seconds

  welcome(client)
  loadcommand(client)
  suggest(client)
  //status(client)
  cahtbot(client)
  lb(client)
  uptime(client)
  botInfo(client)
  //createcommon(client)
  // createcoding(client)

  // botJoinLeaveLogs(client)
  // joinMessage(client)

  // rank(client)
  create(client)


  console.log(`${client.user.username} is now online`);

})

client.on('voiceStateUpdate', (old, New) => {
  if (old.id !== client.user.id) return
  if (old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})





const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/express/index.html'));
});
const server = http.createServer(app);
const port = 5000;
server.listen(port);
console.debug('Server listening on http://localhost:5000');
client.login(token)