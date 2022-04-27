const {
    Client,
    Message,
    String,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'suggestion',
    description: 'Suggest things to be added to the Skies Discord Server',
    usage: 'warrior suggestion',
    category: "Skies",
    aliases: ["suggest"],
    skies: true,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let submitChannel = "925453381106016297"
        let recieveChannel = "956276590499758190"

        let suggestion = args.join(" ")
        if (!args[0]) return message.reply({ content: "You must provide an actual suggestion!" })

        if (message.channel.id != submitChannel) return message.reply({ content: `You can only suggest things in the <#${submitChannel}> channel` })
        
        let embed = new MessageEmbed()
            .setTitle(`Suggestion From ${message.author.username}`)
            .setDescription(`\`${suggestion}\``)
            .setColor("BLURPLE")
            .setTimestamp(Date.now())

        message.reply({
            content: "You have successfully submitted your suggestion!"
        })

        message.guild.channels.cache.get(recieveChannel).send({ embeds: [embed] })
    }
}