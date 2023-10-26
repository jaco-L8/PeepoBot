const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

const birthdayFilePath = path.join(__dirname, '../../birthdayData.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Set your birthday')
        .addStringOption(option =>
            option.setName('birthday')
                .setDescription('Your birthday (mm-dd)')
                .setRequired(true)),

    async execute(interaction) {
        const birthday = interaction.options.getString('birthday');

        // Check if the birthday is a valid date
        const dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(birthday)) {
            return interaction.reply({ content: 'Invalid date format. Please provide a valid date (MM-DD).', ephemeral: true });
        }

        // load the birthdayData.json file
        let birthdayData;
        try {
            birthdayData = JSON.parse(fs.readFileSync(birthdayFilePath));
        } catch (err) {
            console.error(err);
            return interaction.reply({ content: 'An error occurred while reading the birthday data file.', ephemeral: true });
        }

        // save bithday data to birthdayData.json file
        birthdayData[interaction.user.id] = birthday;
        try {
            fs.writeFileSync(birthdayFilePath, JSON.stringify(birthdayData));
        } catch (err) {
            console.error(err);
            return interaction.reply({ content: 'An error occurred while writing to the birthday data file.', ephemeral: true });
        }

        // Reply to the user
        await interaction.reply({ content: `Your birthday has been set to ${birthday}.`, ephemeral: true });
    }
};