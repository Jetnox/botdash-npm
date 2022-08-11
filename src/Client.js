const { default: axios } = require("axios");
const { useRestAPI } = require("./useRestAPI");
const BaseIntegration = require("./integration/BaseIntegration");
const WebPath = require("./WebPath");
const WSPath = require("./WSPath");
const { io } = require("socket.io-client");
const Events = require("events");

class Client extends Events {
    constructor(apiToken, ...args){
        super();
        if(!apiToken) throw new Error('apiToken is required');
        this.apiToken = apiToken;
        this.$_path = `https://botdash.pro/api/v2`;
        this.$_wsPath = `http://mars.skyswift.eu:7562/`;
        this.$_useOldGetMethod = false;
        this.syncInterval = 1000 * 60;
        this.readyEventFired = false;
        this.triggers = new Events();

        this.cache = {};
        this.cacheForSettings = {};

        this.integrations = [];

        for (let i = 0; i < args.length; i++) {
            switch (args[i].constructor) {
                case WebPath: 
                    console.warn("The API Path was changed, I hope you know what you're doing!");
                    this.$_path = args[i].path;
                    break;
                case useRestAPI: 
                    console.warn("The Rest API is deprecated and might be removed in the future. Please use the new API by removing the option useRestAPI for better peformance, stabily and new features.");
                    console.warn("Thank you for your understanding, Have a nice day! ~Team Botdash");
                    this.$_useOldGetMethod = true;
                    break;
                case WSPath:
                    console.warn("The WS Path was changed, I hope you know what you're doing!")
                    this.$_wsPath = args[i].path;
                    break;
                default:
                    let integration = args[i];

                    let isReady = () => {
                        this.emit("intergrationLoad", integration);
                        this.integrations.push(integration);
                        if (integration.getServers) {
                            setInterval(() => {
                                integration.getServers(this.io)
                            }, this.syncInterval)
                            integration.getServers(this.io)
                        }
                    }

                    if (integration.isReady) {
                        isReady()
                    } else {
                        integration.on('ready', isReady);
                    }

                    break;
            }
        }

        
        this.get = this.getUsingRest;

        if (!this.$_useOldGetMethod) {
            this.io = io(this.$_wsPath, {
                reconnectionDelayMax: 10000,
                query: {
                    authToken: this.apiToken,
                } 
            });
            
            this.io.on('cache', (data) => {
                this.cacheForSettings = {};
                this.cache = {};
                data.settings.forEach((setting) => {
                    this.cacheForSettings[setting.database] = setting.default; 
                })  
                data.meta.forEach((meta) => {
                    if (!this.cache[meta.guild]) this.cache[meta.guild] = {};
                    this.cache[meta.guild][meta.key] = meta.value;
                })
            })

            this.io.on('change', (data) => {
                this.emit('change', data);
                if (!this.cache[data.guild]) this.cache[data.guild] = {};
                this.cache[data.guild][data.key] = data.value;
            })
            this.io.on('connected', (data) => {
                this.integrations.forEach((integration) => {
                    if (integration.getServers) {
                        integration.getServers(this.io)
                    }
                });
                if (this.readyEventFired) return;
                this.emit('ready', data);

                setInterval(() => {
                    if (!this.io.connected) return;
                    this.io.emit('cache');
                }, 1000 * 60 * 50)

                this.readyEventFired = true;
            });

            this.io.on('error', (err) => {
                throw new Error(err);
            })

            this.io.on('trigger', (data) => {
                this.emit('trigger', data)
                this.triggers.emit(data.name, data)
            });

            this.get = this.getUsingCache;
        }

        this.getVal = this.get;
    }
    /**
     * 
     * @param {String} guild_id 
     * @param {String} db_key 
     * @returns {Object} JSON object
     */
    async getUsingRest(guild_id, db_key){
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${this.$_path}/value/${db_key}/${guild_id}`,
                headers: {
                    'Authorization': this.apiToken
                }
            }).then(res => {
                return resolve(res.data);
            }).catch(err => {
                return resolve(err.response?.data);
            })
        })
    }

    async getUsingCache(guild_id, db_key){
        if (this.$_useOldGetMethod) throw Error("This method is only available with the new socket-based API, Please remove the useRestAPI option to use the new API.");
        if (!this.cache[guild_id]) return { code: true, msg: 'OK, Using Defaults (Guild not found)', json: { value: this.cacheForSettings[db_key] ? this.cacheForSettings[db_key] : null } };
        if (!this.cache[guild_id][db_key]) return { code: false, msg: 'DB Key Not Found', json: { value: this.cacheForSettings[db_key] ? this.cacheForSettings[db_key] : null } };
        return { code: true, msg: 'OK', json: { value: this.cache[guild_id][db_key] } };
    }

    async set(guild_id, db_key, value) {
        if (this.$_useOldGetMethod) throw Error("This method is only available with the new socket-based API, Please remove the useRestAPI option to use the new API.");
        this.io.emit('set', { guild: guild_id, key: db_key, value });
    }

    refreshCache() {
        this.io.emit('refreshCache');
    }

}

module.exports = Client;