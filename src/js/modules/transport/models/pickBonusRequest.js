import BaseModel from '../baseModel.js';

class PickBonusRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('PickBonusRequest', sessionId, data);
    }
}

export default PickBonusRequest;
