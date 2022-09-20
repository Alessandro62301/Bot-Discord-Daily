const Discord = require("discord.js")
const daily = require('./functions/daily.js');
const modalDaily = require('./functions/modalDaily.js');

const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ 
  intents: [ 
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})
let channel;
client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)

  channel = client.channels.cache.get('1021792495601987655');
})

setTimeout(() => {
  daily.run(client , channel);

  client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
      modalDaily.run(client , interaction);
  });


  console.log('daily on');
}, 2000);



client.slashCommands = new Discord.Collection()

require('./functions/index.js')(client)

client.login(process.env.TOKEN)
