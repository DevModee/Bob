const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription("Suicidate"),

    execute(client, interaction, prefix, GUILD_DATA) {
        return interaction.reply("Perfecto, te mataste")
    }
}