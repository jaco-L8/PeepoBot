const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const eventStatesPath = path.join(__dirname, '../../eventStates.json');
const eventsPath = path.join(__dirname, '../../events');


const alwaysEnabledEvents = ['interactionCreate', 'Autocomplete', 'ready'];

module.exports = {
    data : new SlashCommandBuilder()
        .setName('events')
        .setDescription('choose which events to enable/disable')
        .addStringOption(option =>
            option.setName('event')
                .setDescription('The event to enable/disable')
                .setRequired(true)
                .setAutocomplete(true)),
        
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        const choices = eventFiles.map(file => file.slice(0, -3)); // Remove the .js extension
        const filteredChoices = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25);
        await interaction.respond(
            filteredChoices.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'BIGSCARYMODS')) {
            return interaction.reply({ content: 'You do not have the required role to use this command!' , ephemeral: true });
        }
        const event = interaction.options.getString('event');
        const eventStates = JSON.parse(fs.readFileSync(eventStatesPath));
        const isEnabled = eventStates[event];

        if (alwaysEnabledEvents.includes(event)) {
            await interaction.reply({ content: 'You cannot disable this event.', ephemeral: true });
            return;
        }

        if (isEnabled === undefined) {
            await interaction.reply({ content: 'Event not found.', ephemeral: true });
            return;
        }
        eventStates[event] = !isEnabled;
        fs.writeFileSync(eventStatesPath, JSON.stringify(eventStates));
        await interaction.reply(`${event} is now ${!isEnabled ? 'enabled' : 'disabled'}.`);
    },
};