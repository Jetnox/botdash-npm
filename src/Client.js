const { default: axios } = require("axios");

class Client {
    constructor(apiToken){
        if(!apiToken) throw new Error('apiToken is required');
        this.apiToken = apiToken;
        this.$_path = `https://botdash.pro/api/v2`;
        this.getVal = this.get;
    }

    /**
     * 
     * @param {String} guild_id 
     * @param {String} db_key 
     * @returns {Object} JSON object
     */
    async get(guild_id, db_key){
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
}

module.exports = Client;