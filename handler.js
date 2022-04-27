const {
    Client
} = require('discord.js'); // Importing Client from discord.js module
const {
    glob
} = require('glob'); // Importing Glob from glob
const {
    promisify
} = require('util'); // Importing promisify from util
const globPromise = promisify(glob);
const chalk = require('chalk')
const config = require('./config/config.json')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands Handler
    const LegacyCommands = await globPromise(`${process.cwd()}/commands/*/*.js`);
    LegacyCommands.map(async (path) => {
        const file = require(path);
        const splitted = path.split("/");
        const dir = splitted[splitted.length - 2];
        const cmdName = file?.name;
        const cmdAliases = file?.aliases;
        const files = {
            dir,
            ...file
        }

        if (cmdName) {
            client.commands.set(cmdName, files);
            if (cmdAliases < 1) return;
            if (cmdAliases && Array.isArray(cmdAliases)) {
                cmdAliases.forEach(alias => client.aliases.set(alias, files))
            }
        }
    });

    // Events Handler
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map(async (filePaths) => require(filePaths));
}