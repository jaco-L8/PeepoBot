const axios = require('axios');

module.exports = {
    name: 'ready',
    execute: async (client) => {
        const channel = client.channels.cache.get('1152979295799615550');
        if (!channel) {
            console.warn(`Channel with ID 'general-channel-id-here' not found.`);
            return;
        }

        setInterval(async () => {
            const url = 'https://www.youtube.com/@ludwig/live';
            const response = await axios.get(url);

            if (response.status === 200 && response.data.includes('live-chat')) {
                channel.setTopic(' :red_circle: Ludwig is currently live <a:MewSpin:1153384976356737125> :red_circle: ');
                //console.log('Ludwig is currently live');
            } else {
                channel.setTopic('Ludwig is not currently live <a:Awkward:1153334408129036378>');
                //console.log('Ludwig is not currently live');
            }
        }, 30000); // Check every 30 seconds
    },
};