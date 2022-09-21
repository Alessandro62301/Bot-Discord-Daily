const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	SelectMenuBuilder
} = require('discord.js');
const Discord = require('discord.js');


module.exports = {
	name: "modalDaily", // Coloque o nome do comando
	description: "Desc",
	type: Discord.ApplicationCommandType.ModalBuilder,

	run: async (client, interaction) => {
		const modal = new ModalBuilder()
			.setCustomId('modalDaily')
			.setTitle('Modal Daily');


		const projectNameInput = new TextInputBuilder()
			.setCustomId('projectName')
			.setLabel("Qual projeto vc trabalhou hj?")
			.setStyle(TextInputStyle.Short);

		const objetivoInput = new TextInputBuilder()
			.setCustomId('objetivo')
			.setLabel("Objetivo do dia?")
			.setStyle(TextInputStyle.Paragraph);

		const makeDoInput = new TextInputBuilder()
			.setCustomId('makeDo')
			.setLabel("Oque foi feito?")
			.setStyle(TextInputStyle.Paragraph);

		// const statusInput = new SelectMenuBuilder()
		// 	.setCustomId('statusId')
		// 	.setPlaceholder('Nothing selected')
		// 	.addOptions(
		// 		{
		// 			label: 'Select me',
		// 			description: 'This is a description',
		// 			value: 'first_option',
		// 		},
		// 		{
		// 			label: 'You can select me too',
		// 			description: 'This is also a description',
		// 			value: 'second_option',
		// 		},
		// 	);
		

		
		const firstActionRow = new ActionRowBuilder().addComponents(projectNameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(objetivoInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(makeDoInput);
		// const fourthActionRow = new ActionRowBuilder().addComponents(statusInput);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);

		client.on('interactionCreate', interaction => {
			if (!interaction.isModalSubmit()) return;
			const projectName = interaction.fields.getTextInputValue('projectName');
			const objetivo = interaction.fields.getTextInputValue('objetivo');
			const makeDo = interaction.fields.getTextInputValue('makeDo');
			// const status = interaction.options.get('statusId').value;

 	 		channelFinal = client.channels.cache.get('1021835469518020780');

			let emb = new Discord.EmbedBuilder()
			.setColor(0xFD6D30)
			.setTitle(`Projeto: ${projectName}`)
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			// .setDescription(`Objetivo do Dia: ${objetivo}`)
			.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Objetivo do Dia:', value: objetivo },
				{ name: 'Oque foi feito', value: makeDo },
				// { name: 'Status', value: status },
			)
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username} - Codezone`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

			channelFinal.send({
			embeds: [emb],
		}).then(()=>{
				let embed = new Discord.EmbedBuilder("user")
				.setAuthor({
					name: interaction.user.username
				})
				.setColor("Green")
				.setDescription(`Sua Daily foi enviada com Sucesso!`)
				.setTimestamp()

			interaction.reply({
				embeds: [embed],
				ephemeral: true
			});
		})


		});

	

	}
}