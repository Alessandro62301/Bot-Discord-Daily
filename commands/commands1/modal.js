const  { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const Discord = require('discord.js');


module.exports = {
  name: "modal", // Coloque o nome do comando
  description: "Desc",
  type: Discord.ApplicationCommandType.ModalBuilder,

  run: async (client, interaction) => {
		const modal = new ModalBuilder()
		.setCustomId('myModal')
		.setTitle('My Modal');


	const favoriteColorInput = new TextInputBuilder()
		.setCustomId('favoriteColorInput')
		.setLabel("What's your favorite color?")
		.setStyle(TextInputStyle.Short);

	const hobbiesInput = new TextInputBuilder()
		.setCustomId('hobbiesInput')
		.setLabel("What's some of your favorite hobbies?")
		.setStyle(TextInputStyle.Paragraph);

	const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
	const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

	modal.addComponents(firstActionRow, secondActionRow);

	await interaction.showModal(modal);
		
	const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
	const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
	console.log({ favoriteColor, hobbies });

  let embed = new Discord.EmbedBuilder("user")
      .setAuthor({ name: interaction.user.username })
      .setColor("Green")
      .setDescription(`os Dados do Modal foram enviados`)

      interaction.reply({ embeds: [embed]});

  }	
}
