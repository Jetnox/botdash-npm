const Client = require('./src/Client');
const BaseIntegration = require('./src/integration/BaseIntegration');
const DiscordJS14 = require('./src/integration/impl/DiscordJS14');
const WebPath = require('./src/WebPath');
const useRestAPI = require('./src/useRestAPI');
const WSPath = require('./src/WSPath');

module.exports = {
    Client,
    APIclient: Client,
    BaseIntegration,
    DiscordJS14,
    BotdashAPIPath: WebPath,
    useRestAPI: useRestAPI,
    BotdashWSPath: WSPath
}