const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('provides you with the minecraft server ip!'),
      
    async execute(interaction) {
        await interaction.reply({
            embeds: [{
              title: "The minecraft server IP is: mc.peechat.club!",
              description: "join the server and have fun!!",
              color: 0x00ff44,
              footer: {
                text: ":)"
              }
            }]
          });
    }
};