const { Client, Intents } = require('discord.js');

// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const {token} = require('./config.json')
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    if (interaction.commandName === 'ping') {
		await interaction.reply('Pong! 🏓');
	}
    else if (interaction.commandName === 'invite') {
		await interaction.reply('[**Click Here To Invite me**](https://discord.com/oauth2/authorize?client_id=876761541481992212&permissions=2182212737&scope=bot%20applications.commands "invite me")'); //replace with your client id
	}
    else if(interaction.commandName == 'activity'){
        const channel = interaction.options.getChannel('channel');
        const string = interaction.options.getString('activity');
        if (channel.type !=='GUILD_VOICE'){ 
           return  interaction.reply("The chosen channel must be a voice channel ").catch(console.error);}
         if(string == 'yt'){
            client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                return interaction.reply(`[**Click here to join YouTube Together**](${invite.code} "Join YouTube Together")`);})
         }
         else if(string == 'poker'){
            client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
                return interaction.reply(`[**Click here to join Poker Night**](${invite.code} "Join Poker Night")`);})
        }
        else if(string == 'fish'){
            client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
                return interaction.reply(`[**Click here to join Fishington.io**](${invite.code} "Join fishington.io")`);})
        }
        else if(string == 'bet'){
            client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
                return interaction.reply(`[**Click here to join Betrayal.io**](${invite.code} "Join betrayal.io")`);})
        }
        else if(string == 'chess'){
            client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
                return interaction.reply(`[**Click here to join Chess**](${invite.code} "Join A game of Chess")`);})
        }
       
    }
});
// login to Discord with your app's token
client.login(token);