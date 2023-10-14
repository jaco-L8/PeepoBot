const ludwigIsLive = require('./LudwigLive.js');

function levenshteinDistance(a, b) {
    const matrix = [];

    let i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    let j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }

    return matrix[b.length][a.length];
}

module.exports = {
// if the message is "ludwig is live" or "peechat is live", check if its true and reply accordingly
    name: 'messageCreate',
    execute: async (message) => {
        const possibleMessages = ['ludwig is live', 'peechat is live', 'lud is live', 'peechat up', 'prechat is up', 'peechat is up'];
        const messageContent = message.content.toLowerCase();

        if (message.channel.id === '1152979295799615551') {
            return;
        }

        if (possibleMessages.some(msg => messageContent.includes(msg) || levenshteinDistance(msg, messageContent) <= 3)) {
            if (ludwigIsLive.getIsLive()) {
                
                message.reply('TRUE <:POGGIES:1153039475295924244>');
            } else {
                message.reply('YOU ARE A LIAR <:ReallyMad:1155244651331207248>');
            }
        }
    },
}












// old code
/*client.on('messageCreate', async (message) => {
    // check for the message, regardless of case
    if (message.content === 'ludwig is live') {
            // check if ludwig is live
            if (ludwigIsLive.isLive) {
                message.reply('TRUE :POGGIES:');
            } else {
                message.reply('YOU ARE A LIAR :ReallyMad:');
            }

    }

}); */

