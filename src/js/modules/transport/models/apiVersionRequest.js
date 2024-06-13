const BaseModel = require('../baseModel.js');

class ApiVersionRequest extends BaseModel {
    constructor() {
        super('ApiVersionRequest', false, {});
    }
}

module.exports = ApiVersionRequest;
