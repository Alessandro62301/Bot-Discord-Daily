const Discord = require("discord.js")

module.exports = {
  name: "clear", // Coloque o nome do comando
  description: "Limpe o canal de texto", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  // options: [{
  //   name: 'quantidade',
  //   description: 'Número de mensagens para serem apagadas.',
  //   type: Discord.ApplicationCommandOptionType.Number,
  //   required: true,
  // }],

  run: async (client, channel) => {

    channel.bulkDelete(99)
    .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
    .catch(console.error);

  }
}