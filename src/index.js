const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const client = (global.client = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users"] },
}));

/* Config Files (public) */
const c = (global.c = require("./jsons/channels.json"));
const config = (global.config = require("../config.json"));

module.exports = { client };

["commands", "events", "mongoose", "error"].forEach((handler) => {
  require(`./handlers/${handler}`);
});

client.login(process.env.token).catch((e) => console.log(e));
