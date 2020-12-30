const features = require("./features");

const command = {
  PING: "!ping",
  SHITTALK: "!shittalk",
  OWEN: "!owen",
  MUTE: "!mute",
  UNMUTE: "!unmute",
  GAME: "!game",
};

const processCommand = (cmd) => {
  const trimmed = cmd.trim();
  const cmdArr = trimmed.split(" ");
  return cmdArr;
};

const executeCommand = (cmdArr, msg) => {
  const action = cmdArr.shift();
  const properties = cmdArr;

  switch (action) {
    case command.PING:
      msg.channel.send(`Pong from ${msg.guild.region.toUpperCase()}`);
      break;
    case command.SHITTALK:
      features.sendMessageInChannel(msg.channel, properties);
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
