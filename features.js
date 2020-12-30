const _ = require("lodash");
const dialogue = require("./dialogue");

const generateDialogue = (dialogueOption, specific) => {
  let target;
  if (specific && !_.isEmpty(specific)) {
    target = specific[0].slice(1);
  } else {
    const keys = Object.keys(dialogueOption);
    const randomNum = Math.floor(Math.random() * keys.length);
    target = keys[randomNum];
  }

  const resMsg = dialogueOption[target]
    ? dialogueOption[target]
    : dialogue.DEFAULT;
  return resMsg;
};

const sendMessageInChannel = (channel, targetUser = null, content = "") => {
	if (channel) {
    targetUser && channel.send(`<@${targetUser}>`);
    channel.send(content);
  }
};

const findMembersInVChannel = (msgObj) =>{
	return msgObj.member.voice.channel && msgObj.member.voice.channel.members;
}


const setMemberMute = (members, mute) => {
	members.forEach(member => {
		const memberVoice = member.voice;
		memberVoice.setMute(mute)
	})
}


module.exports = {
  generateDialogue: generateDialogue,
  sendMessageInChannel: sendMessageInChannel,
	findMembersInVChannel: findMembersInVChannel,
	setMemberMute: setMemberMute,
};
