# BotDash.pro/v2
Get started making amazing discord bot dashboard's. You're just one click away

### Get Started (Discord.JS)
1. Create an acount on https://botdash.pro/premium
2. Create your first project.
3. Go to the editor and add your first category
4. Create your first setting (Set database storage ID to "botprefix" so the example will work without much changes)
5. Return to your admin dashboard
6. Go to settings and copy the API token to somewhere safe.
7. Copy the code below and change bot token with your discord bot token and api token with the API token you just saved somewhere safe.
8. In the admin dashboard turn Maintenance to off.

**Enjoy**

> For newer versions
```js
const botdash = require('@botdash.pro/v2'); //Require botdash.pro
const discord = require('discord.js'); //Require Discord.JS
const client = new discord.Client(); //Create a discord bot client
var dashboard = ""; //Declare variable
client.login("--- DISCORD BOT TOKEN ---"); //Login to the bot client
client.on('ready', () => { //Client is ready
    console.log("ready"); //print messageclient
    dashboard = new botdash.Client("--- BOTDASH TOKEN ---"); //Connect to botdash with a discord.js 
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
const botdash = require('@botdash.pro/v2'); //Require botdash.pro
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
```# botdash-npm
