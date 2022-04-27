const {
    Client,
    Message,
    String,
    MessageEmbed
} = require('discord.js');
const {
    glob
} = require('glob'); // Importing Glob from glob
const {
    promisify
} = require('util'); // Importing promisify from util
const globPromise = promisify(glob);

module.exports = {
    name: 'cmdinfo',
    description: 'Show the command info of the specified command',
    aliases: ["cinfo"],
    usage: 'warrior cmdinfo <cmd>',
    category: "Info",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let cmd = args[0]

        const command = client.commands.get(cmd) || client.commands.find(c => c.aliases?.includes(cmd));

        const commandsList = await globPromise(`${process.cwd()}/commands/*/*.js`);

        if (!command) {
            return message.reply({
                content: "You must specify a valid command to look up!"
            })
        }

        let embed = new MessageEmbed()
            .setColor('GOLD')
            .setFooter({ text: "Optional - [] | Required - <>" })

        commandsList.map(path => {
            const file = require(path)

            if (command.name != file.name) return;

            embed.addFields(
                { name: "Name", value: `${command.name}`, inline: true },
                { name: "Description", value: `${command.description}`, inline: true },
                { name: "Usage", value: `${command.usage}`, inline: true },
                { name: "Category", value: `${command.category}`, inline: true },
            )

            if (command.aliases) {
                embed.addField("Aliases", command.aliases.join(' | '), true)
            } else {
                embed.addField("Aliases", "None", true)
            }
        })

        message.reply({
            embeds: [embed]
        })
    }
}