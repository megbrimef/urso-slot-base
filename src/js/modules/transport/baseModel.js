class BaseModel {

    constructor(action, sesId, data = {}) {
        this.action = action;
        this.result = true;
        this.sesId = sesId;
        this.data = data;
    }

}

module.exports = BaseModel;
