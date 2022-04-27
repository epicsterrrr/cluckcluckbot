const {
    Client,
    Message,
    String,
    MessageEmbed
} = require('discord.js');
const config = require('../../config/config.json')
require('dotenv').config()

const fetch = require('node-fetch')

const ytkey = process.env.YTKEY

module.exports = {
    name: 'youtube',
    description: 'Show the statistics of the Skies youtube channel',
    // skies: true,
    aliases: ["yt"],
    skies: true,
    usage: 'warrior youtube',
    category: "Skies",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("ItsSkies YouTube Statistics")
            .setColor('AQUA')

        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${config.skiesYtId}&key=${ytkey}`)
        const data = await response.json();

        const stats = data["items"][0].statistics

        embed.addFields(
            { name: "Link", value: `https://youtube.com/c/ItsSkies`, inline: true },
            { name: "Subscriber Count", value: `${stats.subscriberCount}`, inline: true },
            { name: "View Count", value: `${stats.viewCount}`, inline: true },
            { name: "Video Count", value: `${stats.videoCount}`, inline: true },
        )

        await message.reply({
            embeds: [embed],
        })
    }
}