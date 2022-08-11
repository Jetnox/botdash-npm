let { Client, BotdashAPIPath, BotdashWSPath, DiscordJS14, useRestAPI } = require('./../index');
let { Client: discordClient, GatewayIntentBits } = require('discord.js');

let DiscordApp = new discordClient({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

let dashboard = new Client("-", new DiscordJS14(DiscordApp));

dashboard.on('ready', (dashboard) => {
    console.log(`Connected to dashboard: '${dashboard.name}' (${dashboard.id})`);
})

dashboard.on('change', (change) => {
    console.log('Someone changed something.')
    //details are in change
})

dashboard.on('intergrationLoad', (addon) => {
    console.log(`Integration '${addon.name}' by '${addon.author}' loaded`);
})

DiscordApp.on('ready', () => {
    console.log("Botdash testing bot is ready!");    
})

dashboard.triggers.on('triggerButton', (data) => {
    console.log("Someone pressed a button")
    //details are in data
})

DiscordApp.on('messageCreate', async(msg) => {
    if (msg.author.bot) return;
    let prefix = await dashboard.get(msg.guild.id, 'prefix');
    msg.reply(`Prefix is: ${prefix.json.value}`);
})

DiscordApp.login("--")

