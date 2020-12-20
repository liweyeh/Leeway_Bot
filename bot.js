require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const command = require("./command");
const dialogue = require("./dialogue");
const _ = require('lodash');

const randomQuote = (option) => {
  const keys = Object.keys(option)
  const randomNum = Math.floor(Math.random() * keys.length);
  const resMsg = option[keys[randomNum]]
  return resMsg; 
}

client.on("message", (msg) => {
  const primRegex = /!\w+/g; 
  const secondaryRegex = /-\w+/g;
  const prefix = msg.content.match(primRegex);
  const property = msg.content.match(secondaryRegex);
  switch (!_.isEmpty(prefix) && prefix[0]) {
    case command.PING:
      msg.channel.send(`Pong from ${msg.guild.region.toUpperCase()}`);
      break;
    case command.JIMMY:
      if(property && !_.isEmpty(property)) {
        const targetProp = property[0].slice(1);
        msg.channel.send(dialogue.FORJIMMY[targetProp])
      } else {
        msg.channel.send(randomQuote(dialogue.FORJIMMY));
      }
      break;
    case command.OWEN:
      msg.channel.send(randomQuote(dialogue.FOROWEN));
      break
    default:
      break;
  }
});



client.login(process.env.BOTTOKEN);
