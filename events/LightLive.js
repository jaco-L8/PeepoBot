const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const fs = require('fs');
const config = require('../config.json');
const { getUserAccessToken } = require("twitch-auth");

let isLive = false;

module.exports = {
    name: 'ready',
    isLive: isLive,
    execute: async (client) => {
        const channel = client.channels.cache.get('1152979295799615551');
        if (!channel) {
            console.warn(`Channel with ID 'channel-id-here' not found.`);
            return;
        }

        const clientId = config.twitchId;
        const clientSecret = config.twitchSecret;
        const refreshToken = config.twitchRefreshToken;

        const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
        const apiClient = new ApiClient({ authProvider });

        setInterval(async () => {
            const userId = '537554067'; // Light's user ID
            const streams = await apiClient.helix.streams.getStreams({ userId: userId });
            if (streams.data.length > 0 && !isLive) {
                channel.send(`light it currently live! \n\n https://www.twitch.tv/thelightthel`);
                console.log('light is live!');
                isLive = true;
            } else if (streams.data.length === 0 && isLive) {
                isLive = false;
            }
        }, 1000); // Check every minute
    },
};