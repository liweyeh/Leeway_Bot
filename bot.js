require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command')

client.on('message', msg => {
  if (msg.content === command.PING) {
    msg.channel.send('Pong5');
    console.log(command);
  }
});

client.login(process.env.BOTTOKEN);