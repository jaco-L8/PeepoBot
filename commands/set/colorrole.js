const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colorrole')
        .setDescription('Set a color role')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color of the role (hex code)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the role')
                .setRequired(true)),
    async execute(interaction) {
        const color = interaction.options.getString('color');
        const name = interaction.options.getString('name');

        // Check if the color is a valid hex code
        const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (!hexRegex.test(color)) {
            return interaction.reply({ content: 'Invalid color format. Please provide a valid hex code.', ephemeral: true });
        }

        // Get the position of Peechat-bot
        const position = interaction.guild.roles.cache.find(role => role.name === 'Peechat-bot').position;

        // Load the list of roles created by this command
        let roles = [];
        try {
            roles = JSON.parse(fs.readFileSync('roles.json'));
        } catch (err) {
            console.error(err);
        }

        // Check if the user has any of the roles created by this command
        const memberRoles = interaction.member.roles.cache;
        const rolesToDelete = [];
        for (const role of roles) {
            if (memberRoles.has(role)) {
                // Add the role to the list of roles to delete
                rolesToDelete.push(role);
            }
        }

        // Delete the roles from the guild
        for (const role of rolesToDelete) {
            const guildRole = interaction.guild.roles.cache.find(r => r.name === role);
            if (guildRole) {
                await guildRole.delete();
            }

            // Remove the role from the list
            roles.splice(roles.indexOf(role), 1);
        }

        // Create the role
        const role = await interaction.guild.roles.create({
            name: name,
            color: color,
            position: position - 1,
        });

        // Add the role to the user
        await interaction.member.roles.add(role);

        // Add the role to the list
        roles.push(name);
        fs.writeFileSync('roles.json', JSON.stringify(roles));

        // Send a confirmation message
        await interaction.reply({ content: `Created role ${role}`, ephemeral: true });
    }
};