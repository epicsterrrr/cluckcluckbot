const {
    Client,
    Message,
    String,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'test',
    description: 'description',
    usage: 'warrior test',
    category: "Fun",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        
    }
}