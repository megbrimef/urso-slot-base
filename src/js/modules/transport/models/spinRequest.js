const BaseModel = require('../baseModel.js');

class SpinRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('SpinRequest', sessionId, data);
    }
}

module.exports = SpinRequest;
