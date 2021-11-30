class SpinRequest extends Urso.SlotBase.Modules.Logic.Transport.BaseModel {
    constructor({ sessionId, data }){
        super('SpinRequest', sessionId, data)
    }
};

module.exports = SpinRequest;