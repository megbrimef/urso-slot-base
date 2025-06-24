import BaseModel from '../baseModel.js';

class SpinRequest extends BaseModel {
    constructor({ sessionId, data }) {
        super('SpinRequest', sessionId, data);
    }
}

export default SpinRequest;
