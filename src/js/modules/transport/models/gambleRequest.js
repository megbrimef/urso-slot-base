import BaseModel from '../baseModel.js';

class GambleRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('GambleRequest', sessionId, data);
    }
}

export default GambleRequest;
