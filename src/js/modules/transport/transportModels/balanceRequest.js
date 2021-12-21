class BalanceRequest extends Urso.SlotBase.Modules.Transport.BaseModel {
    constructor({ sessionId, data = {} } = {}){
        super('BalanceRequest', sessionId, data)
    }
};

module.exports = BalanceRequest;