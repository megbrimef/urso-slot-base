class BalanceRequest extends Urso.SlotBase.Modules.Logic.Transport.BaseModel {
    constructor({ sessionId, data = {} } = {}){
        super('BalanceRequest', sessionId, data)
    }
};

module.exports = BalanceRequest;