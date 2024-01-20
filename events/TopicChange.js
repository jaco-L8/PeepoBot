
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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
            const response = await fetch(url);
            const body = await response.text();
            const $ = cheerio.load(body);

            if (response.status === 200 && $('body').text().includes('Top chat')) {
                channel.setTopic(' :red_circle: Ludwig is currently live <a:MewSpin:1153384976356737125> :red_circle: ');
                //console.log('Ludwig is currently live');
            } else {
                channel.setTopic('Ludwig is not currently live <a:Awkward:1153334408129036378>');
                //console.log('Ludwig is not currently live');
            }
        }, 30000); // Check every 30 seconds
    },
};