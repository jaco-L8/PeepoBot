const { SlashCommandBuilder } = require('discord.js');
const ludwigIsLive = require('../../events/LudwigLive.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamcheck')
        .setDescription('checks if  Ludwig is currently live or not'),

    async execute(interaction) {

        if (ludwigIsLive.getIsLive()) {
            await interaction.reply(`Ludwig is currently live! ( or peechat is on!) <a:MewSpin:1153384976356737125>)`);
        } else {
            await interaction.reply(`Ludwig is not currently live <:BigBaby:1158858464144150550>`);
        }

    }
};