let Events = require("events");

class BaseIntegration extends Events {
    constructor(name, author) {
        super();
        this.name = name;
        this.isReady = false;
        this.author = author;
    }
    fireReady() {
        this.emit("ready");
    }
    setReadyState(state) {
        this.isReady = state;
        if (state) {
            this.fireReady();
        }
    }
}

module.exports = BaseIntegration;