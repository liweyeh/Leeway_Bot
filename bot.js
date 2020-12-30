require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const command = require("./command");

client.on("message", (msg) => {
  const cmdArr = command.processCommand(msg.content);
  command.executeCommand(cmdArr, msg);
});

client.login(process.env.BOTTOKEN);
