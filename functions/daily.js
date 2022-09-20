const Discord = require("discord.js");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "daily",
  description: "Crie suas Daily de forma automatica",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client , channel) => {
    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Fazer Daily!')
        .setStyle(ButtonStyle.Primary),
      );

      let emb = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({
            dynamic: true
          })
        })
        .setDescription(`Está na Hora da \`Daily\``);


        channel.send({
        embeds: [emb],
        ephemeral: true,
        components: [button]
      })
      
      
  }
  
}

