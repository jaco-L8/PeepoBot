const cron = require('node-cron');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
        data: new SlashCommandBuilder()
            .setName('ludshedule')
            .setDescription('set lud streams schedule')
            .addStringOption(option =>
                option.setName('name') 
                    .setDescription('name of the schedule')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('date')
                    .setDescription('The date of the reminder (MM-DD)')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('discrption')
                    .setDescription('The discription of the schedule')
                    .setRequired(false)),

    async execute(interaction) { 
        const name = interaction.options.getString('name');
        const date = interaction.options.getString('date');
        const discription = interaction.options.getString('discription') || ' - ';
        const channel = await interaction.guild.channels.fetch('1166882966841085962');

        //  check if the date is a valid date
        const dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(date)) {
            return interaction.reply({ content: 'Invalid date format. Please provide a valid date (MM-DD).', ephemeral: true });
        }
        //create a simple embed that has the name and date of the schedule
        const embed = {
            color: 0x0099ff,
            title: name,
            discription: discription,
            fields: [
                {
                    name: 'Date',
                    value: date,
                }
            ],
        }

        
        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: `Your schedule has been set to ${name} on ${date}.`, ephemeral: true });
    }
};