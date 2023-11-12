const BaseModel = require('../baseModel.js');

class PickBonusRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('PickBonusRequest', sessionId, data);
    }
}

module.exports = PickBonusRequest;
