class GambleRequest extends Urso.SlotBase.Modules.Logic.Transport.BaseModel {
    constructor({ sessionId, data }){
        super('GambleRequest', sessionId, data)
    }
};

module.exports = GambleRequest;