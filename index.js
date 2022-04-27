require("dotenv").config();

const {
    Collection,
    Client
} = require("discord.js");

const client = new Client({
    allowedMentions: {
        repliedUser: true,
        parse: ["users", "roles", "everyone"]
    },
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();

require('./handler')(client);

client.login(process.env.TOKEN)