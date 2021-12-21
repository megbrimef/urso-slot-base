class ModulesTransportController extends Urso.Core.Modules.Transport.Controller{

    init() {
        this._updateService();
        this.setupServerCommunication();
        this._service.init();
    };

    sendRequestHandler({ requestName, data }){
        const requestNameCapitalized = Urso.helper.capitaliseFirstLetter(requestName);
        const requestModel = this.getInstance(`TransportModels.${requestNameCapitalized}`, data);

        if(!requestModel)
            return Urso.logger.error(`Transport model ${requestName} not found!`);
        
        Urso.transport.send(requestModel);
    };

    onTransportReadyHandler(){
        this.emit('modules.transport.ready', null, 100);
    };

    onTransportMessageHandler({ action, data }){
        const type = action.replace('Response', '');
        this.emit('modules.transport.receive', { type, data });
    };

    setupServerCommunication(){  
        Urso.transport.setReadyHandler(this.onTransportReadyHandler.bind(this));
        Urso.transport.setResponseHandler(this.onTransportMessageHandler.bind(this));
    };

    _subscribeOnce(){
        this.addListener('modules.transport.send', this.sendRequestHandler.bind(this), true);
    };
};

module.exports = ModulesTransportController;
