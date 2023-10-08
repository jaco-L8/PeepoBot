const axios = require('axios');
const fs = require('fs');

let isLive = false;

module.exports = {
    name: 'ready',
    execute: async (client) => {
        const channel = client.channels.cache.get('1152979295799615551');
        if (!channel) {
            console.warn(`Channel with ID 'channel-id-here' not found.`);
            return;
        }

        setInterval(async () => {

            const url = 'https://www.twitch.tv/thelightthel';
            const response = await axios.get(url);

            if (response.status === 200 && response.data.includes('Live') && !isLive) {
                channel.send(`light it currently live! \n\n ${url}`);
                console.log('light is live!');
                isLive = true;
            } else if (response.status === 200 && !response.data.includes('Live') && isLive) {
                isLive = false;
            }
        }, 1000); // Check every minute
    },
};