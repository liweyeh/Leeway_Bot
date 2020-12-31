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
  try {
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
        const muteTarget = features.determineMuteTarget(properties, msg);
        features.setMemberMute(muteTarget, true, msg.channel);
        break;
      case command.UNMUTE:
        const unmuteTarget = features.determineMuteTarget(properties, msg);
        features.setMemberMute(unmuteTarget, false, msg.channel);
        break;
      default:
        break;
    }
  } catch (error) {
    msg.channel.send(
      error
        ? error
        : "Welp, I don't know what happened. Seems like Liwei fucked up"
    );
  }
};

module.exports = {
  processCommand: processCommand,
  executeCommand: executeCommand,
};
