const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment-timezone');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Set a reminder')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The reminder message')
                .setRequired(true))
        
        .addStringOption(option =>
            option.setName('date')
                .setDescription('The date of the reminder (YYYY-MM-DD)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time of the reminder (HH:mm)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('timezone')
                .setDescription('The timezone of the reminder (e.g. America/New_York)')
                .setRequired(true)
                .setAutocomplete(true))
                .addBooleanOption(option =>
            option.setName('everyone')
                .setDescription('Whether to @ everyone')
                .setRequired(false)),


    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = Array.from(moment.tz.names());
        //console.log(choices);
        const filteredChoices = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25);
        await interaction.respond(
            filteredChoices.map(choice => ({ name: choice, value: choice })),
        );
    },
                
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const everyone = interaction.options.getBoolean('everyone') || false;
        const date = interaction.options.getString('date');
        const time = interaction.options.getString('time');
        const timezone = interaction.options.getString('timezone');

        // Parse the date and time in the user's timezone
        const datetime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', timezone);

        // Convert the user's timezone to UTC
        const utcOffset = datetime.utcOffset();
        const utcTimezone = moment.tz.zone('UTC').abbr(datetime);

        // Schedule the reminder to be sent out at the specified date and time in UTC
        const scheduledTime = datetime.clone().utc().format('YYYY-MM-DD HH:mm:ss');
        console.log(`Scheduled time: ${scheduledTime} UTC`);

        // Send out the reminder message when the scheduled time arrives
        setTimeout(() => {
            const channel = interaction.channel;
            const mention = everyone ? '@everyone ' : '';
            channel.send(`${mention}${message}`);
        }, datetime - moment.utc());

        await interaction.reply(`Reminder set for ${datetime.format('llll')}(${utcOffset / 60} hours from UTC)`);
    }
};