class SpinRequest extends Urso.SlotBase.Modules.Transport.BaseModel {
    constructor({ sessionId, data }) {
        super('SpinRequest', sessionId, data);
    }
}

module.exports = SpinRequest;
