const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'ready',
    execute: async (client) => {
        const channel = client.channels.cache.get('1152979295799615551');
        if (!channel) {
            console.warn(`Channel with ID 'channel-id-here' not found.`);
            return;
        }
    },
};