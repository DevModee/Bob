const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription("Mira el ping del bot"),

    execute(client, interaction, prefix, GUILD_DATA) {
        return interaction.reply(`\`${client.ws.ping}ms\``)
    }
}