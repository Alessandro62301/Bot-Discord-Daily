const Discord = require("discord.js")

module.exports = {
  name: "welcome", // Coloque o nome do comando
  description: "Bem", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true })
  } else {
      let embed = new Discord.EmbedBuilder("user")
      .setAuthor({ name: interaction.user.username })
      .setColor("Green")
      .setDescription(`O Sistema de Boas Vindas foi Ativado em  por ${interaction.user.username}`)

      interaction.reply({ embeds: [embed]});
    }

  }
}