# BotDash.pro/v2
Get started making amazing discord bot dashboard's. You're just one click away

### Get Started (Discord.JS)
1. Create an acount on https://botdash.pro/
2. Create your first project.
3. Go to the editor and add your first category
4. Create your first setting (Set database storage ID to "botprefix" so the example will work without much changes)
5. Return to your admin dashboard
6. Go to settings and copy the API token to somewhere safe.
7. Copy the code below and change bot token with your discord bot token and api token with the API token you just saved somewhere safe.
8. In the admin dashboard turn Maintenance to off.

**Enjoy**


> For newest version
```js
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
```

> For older version 2 versions (Still supported with useRestAPI client option)
```js
const botdash = require('botdash.pro'); //Require botdash.pro
const discord = require('discord.js'); //Require Discord.JS
const client = new discord.Client(); //Create a discord bot client
var dashboard = ""; //Declare variable
client.login("--- DISCORD BOT TOKEN ---"); //Login to the bot client
client.on('ready', () => { //Client is ready
    console.log("ready"); //print messageclient
    dashboard = new botdash.Client("--- BOTDASH TOKEN ---", new botdash.DiscordJS14(client)); //Connect to botdash with a discord.js instance 
});
client.on('message', async function(message) { //Discord message recieved
    const prefix = await dashboard.get(message.guild.id, "botprefix"); //Get a value (getVal still works!)
    if (message.content == `${prefix}ping`) { //Simple ping command with customizable prefix
        message.channel.send('pong'); //Send pong back 
    }
});
```

> For older versions

```js
const botdash = require('botdash.pro'); //Require botdash.pro
const discord = require('discord.js'); //Require Discord.JS
const client = new discord.APIclient(); //Create a discord bot client
var dashboard = ""; //Declare variable
client.login("--- DISCORD BOT TOKEN ---"); //Login to the bot client
client.on('ready', () => { //Client is ready
    console.log("ready"); //print messageclient
    dashboard = new botdash.Client("--- BOTDASH TOKEN ---"); //Connect to botdash with a discord.js 
});
client.on('message', async function(message) { //Discord message recieved
    const prefix = await dashboard.getVal(message.guild.id, "botprefix"); //Get a value (get works!)
    if (message.content == `${prefix}ping`) { //Simple ping command with customizable prefix
        message.channel.send('pong'); //Send pong back 
    }
});
```
