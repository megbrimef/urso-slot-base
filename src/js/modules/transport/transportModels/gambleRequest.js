class GambleRequest extends Urso.SlotBase.Modules.Transport.BaseModel {
    constructor({ sessionId, data }) {
        super('GambleRequest', sessionId, data);
    }
}

module.exports = GambleRequest;
