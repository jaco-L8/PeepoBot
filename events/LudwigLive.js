const { Innertube, UniversalCache, YTNodes, YT } = require('youtubei.js');

let isLive = false;

function getIsLive() {
    return isLive;
}



module.exports = {
    name: 'ready',
    getIsLive: getIsLive,
    execute: async (client) => {
                const channel = client.channels.cache.get('1152979295799615551'); //discord stream announcement channel
                
                //check if discord channel exists
                if (!channel) {
                    console.warn(`Channel with ID 'channel-id-here' not found.`);
                    return;
                }

                const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });

                const ludwig = await yt.getChannel('UCrPseYLGpNygVi34QpGNqpA'); //ludwig's channel id


                setInterval(async () => {
                    const livestream = await ludwig.getLiveStreams();
                         
                    if (livestream.videos[0].is_live && !isLive) {

                        const title = livestream.videos[0].title;
                        channel.send(`@everyone PEECHAT IS UP!! https://www.youtube.com/@ludwig/live \n\n${title}`);
                        console.log('PEECHAT IS UP!!');
                        isLive = true;
                    } else if (!livestream.videos[0].is_live && isLive) {
                        isLive = false;
                    }
                }, 30000); // check every 30 seconds 
            }
};

        




// const fetch = require('node-fetch');
// const cheerio = require('cheerio');

// let isLive = false;

// function getIsLive() {
//     return isLive;
// }

// module.exports = {
//     name: 'ready',
//     getIsLive: getIsLive,
//     execute: async (client) => {
//         const channel = client.channels.cache.get('1152979295799615551');
//         if (!channel) {
//             console.warn(`Channel with ID 'channel-id-here' not found.`);
//             return;
//         }

//         setInterval(async () => {
//             const url = 'https://www.youtube.com/@ludwig/live';
//             const response = await fetch(url);
//             const body = await response.text();
//             const $ = cheerio.load(body);

//             if (response.status === 200 && $('body').text().includes('Top chat') && !isLive) {
//                 //grabs the title of the stream
//                 const title = $('title').text();
//                 channel.send(`@/everyone PEECHAT IS UP!! https://www.youtube.com/@ludwig/live \n\n${title}`);
//                 console.log('PEECHAT IS UP!!');
//                 isLive = true;
//             } else if (response.status === 200 && !$('body').text().includes('Top chat') && isLive) {
//                 isLive = false;
//             }
//         }, 1500); // check every 1.5 seconds
//     }
// };