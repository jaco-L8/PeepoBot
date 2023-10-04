const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment-timezone');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Replies with the current time in a timezone')
        .addStringOption(option => option
            .setName('timezone')
            .setDescription('The timezone to get the time from')
            .setRequired(true)
            .setAutocomplete(true)
        ),


    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = Array.from(moment.tz.names());
        const filteredChoices = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25);
        await interaction.respond(
            filteredChoices.map(choice => ({ name: choice, value: choice })),
        );
    },
        

   async execute(interaction) {
        const timezone = interaction.options.getString('timezone');
        const time = moment().tz(timezone).format('h:mm:ss a');
        await interaction.reply(`The time in ${timezone} is ${time}`);
    }
};