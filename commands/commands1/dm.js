// const Discord = require("discord.js")

// module.exports = {
//   name: "Dm", 
//   description: "Enviar Mensagem no privado", 
//   type: Discord.ApplicationCommandType.ChatInput,
//   options: [
//     {
//       name: "usuario", 
//       description: "", 
//       type: Discord.ApplicationCommandType.User,
//       required: true
//     },
//     {
//       name: "mensagem", 
//       description: "", 
//       type: Discord.ApplicationCommandType.String,
//       required: true
//     }
//   ],
//   run: async (client, interaction) => {

//     if(!interaction.menber.permissions.has(Discord.PermissionFlagsBits.ManageGuild)){
//       interaction.reply({ content: `Voce nao possui permissao!`, ephemeral: true})
//     } else {
//         let user = interaction.options.getUser("usuario");
//         let msg = interaction.options.getString("mensagem");

//         let embed = new Discord.EmbedBuilder()
//         .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
//         .setDescription(`${msg}`)
//         .setColor("Random");

//         try {
//           user.send({ embeds: [embed] }).then(() => {
//             let emb = new Discord.EmbedBuilder()
//           .setDescription(`Olá ${interaction.user}, a mensagem foi enviada para ${user} com sucesso"`)
//           .setColor("Green");

//             interaction.reply({ embeds: [emb]})
//           })
//         } catch (e) {
//           let emb = new Discord.EmbedBuilder()
//           .setDescription(`Olá ${interaction.user}, a mensagem nao foi enviada para ${user} pois o usuario esta com a Dm fechada!"`)
//           .setColor("Red");

//           interaction.reply({ embeds: [emb]})
//         }
//     }


//   }
// }

const Discord = require("discord.js")

module.exports = {
  name: "dm", // Coloque o nome do comando
  description: "Envie uma mensagem no privado de um usuário.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "mensagem",
        description: "Escreva algo para ser enviado.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true })
    } else {
        let user = interaction.options.getUser("usuário");
        let msg = interaction.options.getString("mensagem");

        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${msg}`);

        user.send({ embeds: [embed] }).then( () => {
            let emb = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`Olá ${interaction.user}, a mensagem foi enviada para ${user} com sucesso!`);

            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            let emb = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`Olá ${interaction.user}, a mensagem não foi enviada para ${user}, pois o usuário está com a DM fechada!`);

            interaction.reply({ embeds: [emb] })
        })
    }


  }
}