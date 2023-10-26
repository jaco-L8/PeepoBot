const fs = require('fs');
const path = require('path');
const corn = require('node-cron');

const birthdayFilePath = path.join(__dirname, '../birthdayData.json');

module.exports = {
    name: 'ready',

    execute: async (client) => {
        // check once a day on 8 am UTC if it is someone's birthday
        corn.schedule('0 8 * * *', async () => {
            // load the birthdayData.json file
            let birthdayData;
            try {
                birthdayData = JSON.parse(fs.readFileSync(birthdayFilePath));
            } catch (err) {
                console.error(err);
                return;
            }

            const today = new Date();
            const todayString = `${today.getMonth() + 1}-${today.getDate()}`;

            for (const userId in birthdayData) {
                if (birthdayData[userId] === todayString) {
                    const user = await client.users.fetch(userId);
                    const channel = await client.channels.fetch('1152979295799615550');
                    if (channel) {
                        channel.send(` its , ${user.username}'s birthday! 🎉🎂`);
                    }
                }
            }
        }, {
            scheduled: true,
            timezone: 'Etc/UTC',
        });
    }
};
