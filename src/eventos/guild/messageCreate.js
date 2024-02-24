module.exports = async (client, message) => {

    if (!message.guild || !message.channel || message.author.bot) return;

    const GUILD_DATA = await client.db.getGuildData(message.guild.id);
    const prefix = GUILD_DATA.prefix.toLowerCase();

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const ARGS = message.content.slice(prefix.length).trim().split(/ +/);
    const CMD = ARGS.shift().toLowerCase();

    const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    if (COMANDO) {
        if (COMANDO.OWNER) {
            if (!process.env.OWNER_IDS.split(" ").includes(message.author.id)) return message.reply(`❌ **Only developers of this bot can run this command!**\n**Bot developers:** ${process.env.OWNER_IDS.split(" ").map(OWNER_ID => `<@${OWNER_ID}>`)}`)
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply(`❌ **I do not have enough permissions to run this command!**\nI need the following permissions ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`)
        }

        if (COMANDO.PERMISSIONS) {
            if (!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply(`❌ **You do not have enough permissions to run this command!**\nYou need the following permissions ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`)
        }

        try {
            COMANDO.execute(client, message, ARGS, GUILD_DATA.prefix, GUILD_DATA);
        } catch (e) {
            message.reply(`**Ha ocurrido un error al ejecutar el comando \`${COMANDO.NAME}\`**`);
            console.log(e);
            return;
        }

    }
}