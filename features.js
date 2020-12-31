const _ = require("lodash");
const dialogue = require("./dialogue");
const util = require("./util");

// Shit talk
const generateDialogue = (dialogueOption, specific) => {
  if (!dialogueOption) {
    throw dialogue.DEFAULT;
  }

  let target;
  if (specific) {
    target = specific.slice(1);
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

const sendMessageInChannel = (channel, msgProperties) => {
  if (channel) {
    if (_.isEmpty(msgProperties)) {
      throw "I don't know what you are trying to do. Can you learn how to type properly ?";
    }

    const arrLength = msgProperties.length;
    for (let i = 0; i < arrLength; i++) {
      const targetUser = msgProperties[i];

      if (util.checkUser(targetUser)) {
        throw "I don't who you are trying to shit talk. Do you not know how to mention people ?";
      }

      let specifics = [];
      let specificsCount = 0;

      while (i + specificsCount + 1 < arrLength) {
        let curWord = msgProperties[i + specificsCount + 1];
        if (curWord.startsWith("-")) {
          specifics.push(curWord);
          specificsCount++;
        } else {
          break;
        }
      }

      if (!_.isEmpty(specifics)) {
        specifics.forEach((specific) => {
          const content = generateDialogue(dialogue[targetUser], specific);
          channel.send(content);
        });
        i += specificsCount;
      } else {
        const content = generateDialogue(dialogue[targetUser]);
        channel.send(content);
      }
    }
  }
};

// Mute
const findMembersInVChannel = (msgObj) => {
  return msgObj.member.voice.channel && msgObj.member.voice.channel.members;
};

const determineMuteTarget = (props, msgObj) => {
  if (!_.isEmpty(props)) {
    const nonUsers = [];
    props.forEach((prop) => {
      if (!util.checkUser(prop)) {
        nonUsers.push(prop);
      }
    });

    if (!_.isEmpty(nonUsers)) {
      throw `I don't understand the followings: ${nonUsers.toString()}`;
    }

    return msgObj.mentions.members;
  } else {
    return findMembersInVChannel(msgObj);
  }
};

const setMemberMute = (members, mute, channel) => {
  !_.isEmpty(members) &&
    members.forEach((member) => {
      const memberVoice = member.voice;
      if (!memberVoice.channelID) {
        throw `<@!${member.user.id}> is not in voice channel`;
      }
      memberVoice.setMute(mute);
      channel.send(
        `<@!${member.user.id}> is ${mute ? "server muted" : "unmuted"}.`
      );
    });
};

module.exports = {
  generateDialogue: generateDialogue,
  sendMessageInChannel: sendMessageInChannel,
  findMembersInVChannel: findMembersInVChannel,
  setMemberMute: setMemberMute,
  determineMuteTarget: determineMuteTarget,
};
