module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return;
    const GUILD_DATA = await client.db.getGuildData(interaction.guild.id);

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    if (COMANDO) {
        if (COMANDO.OWNER) {
            if (!process.env.OWNER_IDS.split(" ").includes(interaction.author.id)) return interaction.reply({ content: `❌ **Only developers of this bot can run this command!**\n**Bot developers:** ${process.env.OWNER_IDS.split(" ").map(OWNER_ID => `<@${OWNER_ID}>`)}`, ephemeral: true })
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({ content: `❌ **I do not have enough permissions to run this command!**\nI need the following permissions ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephemeral: true })
        }

        if (COMANDO.PERMISSIONS) {
            if (!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({ content: `❌ **You do not have enough permissions to run this command!**\nYou need the following permissions ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephemeral: true })
        }

        COMANDO.execute(client, interaction, "/", GUILD_DATA);
    }
}
