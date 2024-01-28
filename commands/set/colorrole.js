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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emote')
                .setDescription('The emote or url image to use for the role')
                .setRequired(false)),
    async execute(interaction) {
        const color = interaction.options.getString('color');
        const name = interaction.options.getString('name');
        const emote = interaction.options.getString('emote');

        // Check if the color is a valid hex code
        const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (!hexRegex.test(color)) {
            return interaction.reply({ content: 'Invalid color format. Please provide a valid hex code.', ephemeral: true });
        }

        // Check if the emote string is a URL
        const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
        const isUrl = urlRegex.test(emote);

        let icon;
        if (isUrl) {
            // If the emote string is a URL, use it as the icon
            icon = emote;
        } else {
            // If the emote string is not a URL, try to resolve it as an emoji
            const emoteId = emote ? emote.match(/\d+/)[0] : null;
            const guildEmote = emoteId ? interaction.guild.emojis.cache.get(emoteId) : null;
            icon = guildEmote ? guildEmote.url : null;
        }

        // Get the position of Peechat-bot
        const position = interaction.guild.roles.cache.find(role => role.name === 'Peechat-bot').position;

        // Check if the user has any of the roles created by this command
        const memberRoles = interaction.member.roles.cache;
        const rolesToDelete = memberRoles.filter(role => role.name.startsWith('g-'));
        for (const role of rolesToDelete.values()) {
            await role.delete();
        }

        // Create the role with 'g-' prefix
        const role = await interaction.guild.roles.create({
            name: 'g-' + name,
            color: color,
            icon: icon,
            position: position - 1,
            mentionable: false
        });

        // Add the role to the user
        await interaction.member.roles.add(role);

        // Send a confirmation message
        await interaction.reply({ content: `Created role ${role}`, ephemeral: true });
    }
};