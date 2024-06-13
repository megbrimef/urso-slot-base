const BaseModel = require('../baseModel.js');

class GambleRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('GambleRequest', sessionId, data);
    }
}

module.exports = GambleRequest;
