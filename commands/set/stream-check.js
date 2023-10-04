const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamcheck')
        .setDescription('checks if  Ludwig is currently live or not'),

    async execute(interaction) {
        const url = 'https://www.youtube.com/@ludwig/live';
        const response = await axios.get(url);

        if (response.status === 200 && response.data.includes('live-chat')) {
            await interaction.reply(`Ludwig is currently live! ( or peechat is on! <a:MewSpin:1153384976356737125>)`);
        } else {
            await interaction.reply(`Ludwig is not currently live <:BigBaby:1158858464144150550>`);
        }

    }
};