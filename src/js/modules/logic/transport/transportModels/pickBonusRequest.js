class PickBonusRequest extends Urso.SlotBase.Modules.Logic.Transport.BaseModel {
    constructor({ sessionId, data }){
        super('PickBonusRequest', sessionId, data)
    }
};

module.exports = PickBonusRequest;