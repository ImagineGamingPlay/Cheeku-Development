const {blackListCache} = require("../utils/Cache");
const Blacklist = require("../schema/blacklist");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        //<------- AUTO CHANGING STATUS START ------->
        const statusData = [
            {
                name: "Imagine Gaming Play on youtube!",
                type: "WATCHING",
                status: "ONLINE",
            },
            {
                name: "over IGP Discord Server",
                type: "WATCHING",
                status: "ONLINE",
            },
        ];

        function pickStatus() {
            const random = Math.floor(Math.random() * statusData.length);

            try {
                client.user.setPresence({
                    activities: [
                        {
                            name: statusData[random].name,
                            type: statusData[random].type,
                        },
                    ],
                    status: statusData[random].status,
                });
            } catch (err) {
                console.error(err);
            }
        }

        setInterval(pickStatus, 10 * 1000);
        //<------- AUTO CHANGING STATUS END ------->
        Blacklist.find({}, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                /**
                 * @param blacklist {Blacklist[]}
                 */
                data.forEach((blacklist) => {
                    blackListCache.set(blacklist.UserId, true);
                });
            }
        });
    },
};
