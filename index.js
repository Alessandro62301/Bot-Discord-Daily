const Discord = require("discord.js")
const daily = require('./functions/daily.js');
const modalDaily = require('./functions/modalDaily.js');
const dotenv = require('dotenv');
const clear = require("./functions/clear.js");

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

  channel = client.channels.cache.get('1021846022999261244');
})

setTimeout(() => {
  const date = new Date();

  if(date.getHours()){
    clear.run(client, channel)
    setTimeout(() => {
      daily.run(client , channel);
    },2000)
  
    client.on('interactionCreate', interaction => {
      if (!interaction.isButton()) return;
        modalDaily.run(client , interaction);
    });
    console.log('daily on');
  } else {
    console.log('daily off');
    if(date.getHours() != 8){
      clear.run(client, channel)
    }
  }
}, 2000);




client.slashCommands = new Discord.Collection()

require('./functions/index.js')(client)

client.login(process.env.TOKEN)


process.on('multipleResolves', (type, reason, promise) => {
  console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error )
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error )
});
process.on('InteractionAlreadyReplied', (error) => {
  channelFinal = client.channels.cache.get('1021835469518020780');
  clear.run(client, channelFinal , 1);
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});