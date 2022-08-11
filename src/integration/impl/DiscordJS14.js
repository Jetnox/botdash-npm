let { Client } = require("discord.js");
const BaseIntegration = require("../BaseIntegration");

class DiscordJS14 extends BaseIntegration {
    constructor(client) {
        super("Discord.JS v14 (Beta)", "Team Botdash")
        if (!client instanceof Client) throw new Error("Client is not an instance of Discord.JS, Please ensure you are using Discord.JS v14 and that you are passing it to the DiscordJS14 Class.");
        this.client = client;

        if (client.readyAt) {
            this.setReadyState(true);
        } else {
            client.once("ready", () => {
                this.setReadyState(true)
            });
        }
    }   
    
    //When full data is requested
    getServers(Sock) {
        let guilds = [];
        for (let guild of this.client.guilds.cache.values()) {
            let channels = [];
            let roles = [];
            for (let channel of guild.channels.cache.values()) {
                channels.push({
                    id: channel.id,
                    name: channel.name,
                    type: channel.type,
                    position: channel.rawPosition,
                    category: channel.parent ? channel.parent.name : null,
                })
                console.log(channel.parent ? channel.parent.name : null)
            }
            for (let role of guild.roles.cache.values()) {
                roles.push({
                    id: role.id,
                    name: role.name,
                    color: role.color,
                    hoist: role.hoist
                })
            }

            guilds.push({
                id: guild.id,
                channels: channels,
                roles: roles,
            })
        }

        Sock.emit("sync", { guilds, bot: {
            connected: true,
            id: this.client.user.id,
            name: this.client.user.username,
            avatar: this.client.user.avatarURL(),
            discriminator: this.client.user.discriminator
        } })
    }
}

module.exports = DiscordJS14;