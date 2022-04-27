const {
    Client,
    Message,
    String,
    MessageEmbed
} = require('discord.js');
const config = require('../../config/config.json')
const {
    glob
} = require('glob');
const {
    promisify
} = require('util');
const globPromise = promisify(glob);

module.exports = {
    name: 'help',
    description: 'Shows a list of commands',
    aliases: ["cmds", "commands"],
    usage: 'warrior help [category]',
    category: "Info",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let helpEmbed = new MessageEmbed()
            .setTitle("Commands")
            .setColor("BLURPLE")
            .addFields(
                { name: "Fun", value: `warrior help fun`, inline: true },
                { name: "Information", value: `warrior help info`, inline: true },
                { name: "Utility", value: `warrior help util`, inline: true },
            )
            .setFooter({ text: "Optional - [] | Required - <>" })

        if (message.guild.id == config.guildId) {
            helpEmbed.addField("Skies", `warrior help skies`, true)
        }

        if (!args[0]) {
            message.reply({
                embeds: [helpEmbed]
            })
        }

        switch (args[0]) {
            case "fun":
                let funEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("Fun Commands")
                let funFiles = await globPromise(`${process.cwd()}/commands/fun/*.js`)
                funFiles.map(path => {
                    const file = require(path)
                    let cmdName = file.name
                    
                    funEmbed.addField(cmdName, `warrior cmdinfo ${cmdName}`, true)
                });

                message.reply({
                    embeds: [funEmbed]
                })

                break;
            case "info":
                let infoEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("Info Commands")
                let infoFiles = await globPromise(`${process.cwd()}/commands/info/*.js`)
                infoFiles.map(path => {
                    const file = require(path)
                    let cmdName = file.name
                    
                    infoEmbed.addField(cmdName, `warrior cmdinfo ${cmdName}`, true)
                });

                message.reply({
                    embeds: [infoEmbed]
                })

                break;
            // case "util":
            //     let utilEmbed = new MessageEmbed()
            //         .setColor('RANDOM')
            //         .setTitle("Util Commands")
            //     let utilFiles = await globPromise(`${process.cwd()}/commands/util/*.js`)
            //     utilFiles.map(path => {
            //         const file = require(path)
            //         let cmdName = file.name
                    
            //         utilEmbed.addField(cmdName, `warrior cmdinfo ${cmdName}`, true)
            //     });

            //     message.reply({
            //         embeds: [utilEmbed]
            //     })

            //     break;
            case "skies":
                if (message.guild.id != config.guildId) return message.reply({
                    content: `This help category can only be seen in the Skies Discord Server\n( https://discord.gg/SYsdqw2Baa )`
                })
                let skiesEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("Skies Commands")
                let skiesFiles = await globPromise(`${process.cwd()}/commands/skies/*.js`)
                skiesFiles.map(path => {
                    const file = require(path)
                    let cmdName = file.name
                    
                    skiesEmbed.addField(cmdName, `warrior cmdinfo ${cmdName}`, true)
                });

                message.reply({
                    embeds: [skiesEmbed]
                })

                break;
        }
    }
}