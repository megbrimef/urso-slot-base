import BaseModel from '../baseModel.js';

class BalanceRequest extends BaseModel {
    constructor({ sessionId, data = {} } = {}) {
        super('BalanceRequest', sessionId, data);
    }
}

export default BalanceRequest;
