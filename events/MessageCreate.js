const client = require("../index");
const {
    owners,
    prefix,
    guildId
} = require('../config/config.json');

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases?.includes(cmd));

    if (!command) return;
    if (command) {
        if (!message.member.permissions.has(command.userPermissions || [])) return message.reply({
            content: `You need \`${command.userPermissions || []}\` permissions to run this command`,
            ephemeral: true,
        });

        if (command.maintenance) {
            if (!owners.includes(message.user.id)) {
                return message.reply({
                    content: `This command is in maintenance mode please try again later. Thank you!`
                })
            }
        }

        if (!message.guild.me.permissions.has(command.botPermissions || []))
            return message.reply({
                content: `I need \`${cmd.botPermissions || []}\` permissions to run this command`,
                ephemeral: true
            });

        if (command.ownerOnly) {
            if (!owners.includes(message.author.id)) {
                return message.reply({
                    content: `Only the Bot Developers are allowed to run this command!`
                })
            }
        };

        if (command.skies) {
            if (message.guild.id != guildId) {
                return message.reply({
                    content: `This command can only be ran in the Skies's Sky Castle Discord Server\n( https://discord.gg/SYsdqw2Baa )`
                })
            }
        }

        await command.run(client, message, args)
    }
});