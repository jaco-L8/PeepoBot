const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    
        data: new SlashCommandBuilder()
            .setName('sendtoinfo')
            .setDescription('sends/update info to the info channel'),

    async execute(interaction) {
        channel = await interaction.guild.channels.fetch('1170463228908810300');

        // if role not BIGSCARYMOD then return

        if (!interaction.member.roles.cache.has('1152984668073897994')) {
            return interaction.reply({ content: 'you dont have permission to use this command!', ephemeral: true });
        }
        
        await channel.send({
            embeds: [{
              author: {
                name: "www.peechat.club",
                url: "https://www.peechat.club"
              },
              title: "THE PEECHAT EXCLUSIVE CLUB!",
              url: "https://www.peechat.club",
              description: "⠀\n\n\n**Welcome to the Peechat Exclusive Club Server!**\n\nA community within another bigger community!\n\n\n check out the main website at https://www.peechat.club !\n\nif you need any help send a message to <@440775711028936705>!\n\n\ndont forget to get a role in <#1156440539688874045>!!\n\n\n⠀",
              fields: [
                {
                  name: "The channels!",
                  value: "> <#1152979295799615550> - discuss everything ya want!\n\n> <#1152979295799615552> - pro gamers only \\<:WICKED:1153039871561175221>\n\n> <#1170463088693231766> - alexa play c418 sweden\n\n> <#1158153647901905006> - share the music you love! <a:catJAM:1154842647282843720>\n\n> <#1153019956527636560> - maymays\n\n> <#1153019956527636560> - art channel!!\n\n> <#1163192360210026607> - <:Michael:1159655878073520140>\n\n> <#1163269121769746462> - for the hackers <a:HACKERMANS:1160682581797376220>\n\n\n\n⠀"
                },
                {
                  name: "__AN EXHAUSTIVE LIST OF ALL THE RULES YOU MUST FOLLOW!!__",
                  value: "> 1. don't be a dick\n\nthats it <:Peepo:1153037487908860034>",
                  inline: true
                }
              ],
              image: {
                url: "https://cdn.betterttv.net/emote/6074044339b5010444cfda19/3x.gif"
              },
              thumbnail: {
                url: "https://cdn.betterttv.net/emote/6074044339b5010444cfda19/3x.gif"
              },
              color: 0xfa7abd,
              footer: {
                text: "PEECHAT FOR EVER!",
                icon_url: "https://cdn.7tv.app/emote/63d6ed00349f81ba10452fdd/4x.gif"
              }
            }]
        });

    }
};
