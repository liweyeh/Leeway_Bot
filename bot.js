require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const command = require("./command");
const dialogue = require("./dialogue");
const users = require("./users");
const features = require("./features");
const _ = require("lodash");

client.on("message", (msg) => {
  const { prefix, property } = features.processCommand(msg.content);

  switch (!_.isEmpty(prefix) && prefix[0]) {
    case command.PING:
      msg.channel.send(`Pong from ${msg.guild.region.toUpperCase()}`);
      break;
    case command.JIMMY:
      features.sendMessageInChannel(
        msg.channel,
        users.JIMMY,
        features.generateDialogue(dialogue.FORJIMMY, property)
      );
      break;
    case command.OWEN:
      features.sendMessageInChannel(
        msg.channel,
        users.OWEN,
        features.generateDialogue(dialogue.FOROWEN, property)
      );
      break;
    case command.MUTE:
      const muteTarget = features.findMembersInVChannel(msg);
      features.setMemberMute(muteTarget, true);
      break;
    case command.UNMUTE:
      const unmuteTarget = features.findMembersInVChannel(msg);
      features.setMemberMute(unmuteTarget, false);
      break;
    default:
      break;
  }
});

client.login(process.env.BOTTOKEN);
