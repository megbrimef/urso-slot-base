class PickBonusRequest extends Urso.SlotBase.Modules.Transport.BaseModel {
    constructor({ sessionId, data }) {
        super('PickBonusRequest', sessionId, data);
    }
}

module.exports = PickBonusRequest;
