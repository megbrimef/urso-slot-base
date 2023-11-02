const BaseModel = require('../baseModel.js');

class AuthRequest extends BaseModel {
    constructor() {
        super('AuthRequest', false, {});
    }
}

module.exports = AuthRequest;
