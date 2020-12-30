const features = require("./features");
const dialogue = require("./dialogue");
const users = require("./users");
const _ = require("lodash");

const processCommand = (cmd) => {
  const primRegex = /!\w+/g;
  const secondaryRegex = /-\w+/g;
  const prefix = cmd.match(primRegex);
  const property = cmd.match(secondaryRegex);
  return { prefix, property };
};

const command = {
  PING: "!ping",
  JIMMY: "!jimmy",
  OWEN: "!owen",
  MUTE: "!mute",
  UNMUTE: "!unmute",
};

const executeCommand = (prefix, property, msg) => {
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
};

module.exports = {
  processCommand: processCommand,
  executeCommand: executeCommand,
};
