module.exports = {
    DESCRIPTION: "Mira el ping del bot",
    execute(client, message, args, prefix, GUILD_DATA) {
        return message.reply(`\`${client.ws.ping}ms\``);
    }
}