const { messageWebHookURL } = require("../../config.json");
const {MessageEmbed, WebhookClient} = require("discord.js");

module.exports = {
    name: "messageDelete",
    async execute(message, client) {
        if (message.author?.bot) return;

        let deletedLogEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("A message has been deleted!")
            .setDescription(
                `**Deleted Message:**\n ${
                    message.content ? message.content : "None"
                }`.slice(0, 4096)
            )
            .setAuthor({
                name: `${message.author.tag}`,
                iconURL: `${message.author.displayAvatarURL({dynamic: true})}`,
            })
            .addFields({name: "Channel", value: `${message.channel}`})
            .setFooter({
                text: `User ID: ${message.author.id}`,
                iconURL: `${message.author.displayAvatarURL({dynamic: true})}`,
            });

        if (message.attachments.size >= 1) {
            deletedLogEmbed.addField(
                `Attachments:`,
                `${message.attachments.map((a) => a.url)}`,
                true
            );
        }

       const deleteLogger = new WebhookClient({
            url: messageWebHookURL,
        })
        
        await deleteLogger.send({embeds: [deletedLogEmbed]});
    },
};
