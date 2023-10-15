const { SlashCommandBuilder } = require('discord.js');


function fakeIp() {
    // generate a random ip address
    const ip = [];
    for (let i = 0; i < 4; i++) {
        ip.push(Math.floor(Math.random() * 256));
    }
    return ip.join('.');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shameuser')
        .setDescription('Shame a user for being a liar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to shame')
                .setRequired(true)),
        
    async execute(interaction) {
        // only allow this command to be used in the #general channel
        if (interaction.channel.id !== '1152979295799615550') {
            await interaction.reply({ content: 'You can only use this command in the #general channel.', ephemeral: true });
            return;
        }
        //only allow this command to be used by users with the "bigscarymods" role
        // if (!interaction.member.roles.cache.has('1152984668073897994')) {
        //     await interaction.reply('You do not have permission to use this command.');
        //     return;
        // }


        // send a message to show that the command was received and who will be shamed
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.reply('User not found.');
            return;
        }
        await interaction.reply(`Shaming ${user.username} for being a liar...`);

        // every time the user writes something, a reply is sent to them for the next minute, then it stops
        const channel = interaction.channel;
        const filter = m => m.author.id === user.id;
        const collector = channel.createMessageCollector({ filter, time: 60000 });
        // choose randomly from a list of messages to send to the user

        const messages = [
            'YOU ARE A LIAR <:ReallyMad:1155244651331207248>',
            `everyone! ${user.username} is a liar!! shame them! <:MAJ:1157380609900028014>`,
            `you expect us to believe you after you lied to us? <:UHM:1155244206202306561>`,
            `<a:Sussy:1154851740399702056>`,
            `we trusted you and you lied to us <a:Smoge:1157381137321173023>`,
            `you Ip address is ${fakeIp()} <:peepoSit:1155243363914756207>`,
        ];

        collector.on('collect', m => {
            const message = messages[Math.floor(Math.random() * messages.length)];
            m.reply(message);
        });
    },
};
