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

            const url = 'https://www.youtube.com/@ludwig/live';
            const response = await axios.get(url);

            if (response.status === 200 && response.data.includes('live-chat') && !isLive) {
                //grabs the title of the stream
                const title = response.data.split('<title>')[1].split('</title>')[0];
                channel.send(`@everyone PEECHAT IS UP!! https://www.youtube.com/@ludwig/live \n\n${title}`);
                console.log('PEECHAT IS UP!!');
                isLive = true;

            } else if (response.status === 200 && !response.data.includes('live-chat') && isLive) {
                isLive = false;
            }
        }, 1500); // check every 1.5 seconds
    }
};