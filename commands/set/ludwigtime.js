const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment-timezone');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ludwigtime')
        .setDescription('Replies with the current time ludwig is in '),

    async execute(interaction) {
        const time = moment().tz("America/Los_Angeles").format('h:mm:ss a');
        await interaction.reply(`The current time for Ludwig is ${time}`);
    }
};