const BaseModel = require('../baseModel.js');
class CheckBrokenGameRequest extends BaseModel {
    constructor() {
        super('CheckBrokenGameRequest', false, {});
    }
}

module.exports = CheckBrokenGameRequest;
