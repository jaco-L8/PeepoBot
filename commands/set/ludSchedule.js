const cron = require('node-cron');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


let randomColor = () => {
    // 16777215 is the max decimal value for a color in RGB
    return Math.floor(Math.random() * 16777215);
};

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
                option.setName('description')
                    .setDescription('discription of the schedule')
                    .setRequired(false)),
                    

    async execute(interaction) { 
        const name = interaction.options.getString('name').toUpperCase();
        const date = interaction.options.getString('date');
        const description = interaction.options.getString('description') || ' - ';

        const channel = await interaction.guild.channels.fetch('1166882966841085962');

        //  check if the date is a valid date
        const dateRegex = /^([1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(date)) {
            return interaction.reply({ content: 'Invalid date format. Please provide a valid date (M-DD).', ephemeral: true });
        }

        // Convert the date string to a Date object
        function getDateObject(date) {
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1; // getMonth() returns month index starting from 0
            let dateParts = date.split("-");
            let year = currentYear;
        
            // If the month from the date is less than the current month, increment the year by one
            if (parseInt(dateParts[0]) < currentMonth) {
                year++;
            }
            
            return new Date(year, dateParts[0] - 1, dateParts[1]);
        };

        //create a simple embed that has the name and date of the schedule
        const embed = {
            color: randomColor(),
            title: name,
            description: description,
            timestamp: getDateObject(date),
            footer: {
                text: 'Date:'
            }
        }


        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: `Your schedule has been set to ${name} on ${date}.`, ephemeral: true });
    }
};