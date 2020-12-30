require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const command = require("./command");

client.on("message", (msg) => {
  const { prefix, property } = command.processCommand(msg.content);
  command.executeCommand(prefix, property, msg);
});

client.login(process.env.BOTTOKEN);
