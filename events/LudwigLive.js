const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

let lastLiveCheck = 0;
let skipMessage = false;

module.exports = {
    name: 'ready',
    execute: async (client) => {
        const channel = client.channels.cache.get('1152979295799615551');
        if (!channel) {
            console.warn(`Channel with ID 'channel-id-here' not found.`);
            return;
        }

        if (!skipMessage) {
            const response = await askToSkipMessage();
            if (response.toLowerCase() === 'yes') {
                skipMessage = true;
                console.log('Skipping message');
            }
        }

        setInterval(async () => {
            const currentTime = Date.now();
            const timeSinceLastCheck = currentTime - lastLiveCheck;

            if (timeSinceLastCheck < 43200000) { // 12 hours in milliseconds
                //console.log(`.c ${timeSinceLastCheck / 60000}}`);
                return;
            }

            const url = 'https://www.youtube.com/@ludwig/live';
            const response = await axios.get(url);

            if (response.status === 200 && response.data.includes('live-chat')) {
                //grabs the title of the stream
                const title = response.data.split('<title>')[1].split('</title>')[0];

                if (!skipMessage) {
                    const response = await askToSkipMessage();
                    if (response.toLowerCase() === 'yes') {
                        skipMessage = true;
                    }
                }

                if (!skipMessage) {
                    channel.send(`@everyone PEECHAT IS UP!! https://www.youtube.com/@ludwig/live \n\n${title}`);
                    console.log('PEECHAT IS UP!!');
                }
            }/* else {
                console.log('.P');
            }*/
            lastLiveCheck = currentTime;
        }, 60000); // Check every minute
    },
};

async function askToSkipMessage() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Ludwig is currently live. Do you want to skip the message? (yes/no) ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}