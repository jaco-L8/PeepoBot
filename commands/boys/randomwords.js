const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomwords')
        .setDescription('Get random words from the herokuapp random words API.')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('The number of words to retrieve.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('length')
                .setDescription('The length of the words to retrieve.')
                .setRequired(true)),


    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        const length = interaction.options.getInteger('length');
        const fetch = await import('node-fetch');
        const url = `https://random-word-api.herokuapp.com/word?number=${number}&length=${length}`;
        const response = await fetch.default(url);
        const words = await response.json();
        let reply = `Here are your ${number} random words with length ${length}:`;
        for (const word of words) {
            reply += `\n\`${word}\``;
        }
        await interaction.reply(reply);
    },
};