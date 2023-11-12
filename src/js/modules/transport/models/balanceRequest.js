const BaseModel = require('../baseModel.js');

class BalanceRequest extends BaseModel {
    constructor({ sessionId, data = {} } = {}) {
        super('BalanceRequest', sessionId, data);
    }
}

module.exports = BalanceRequest;
