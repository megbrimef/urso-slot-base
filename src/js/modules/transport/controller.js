class ModulesTransportController extends Urso.Core.Modules.Transport.Controller {
    init() {
        this._updateService();
        this.setupServerCommunication();
        this._service.init();
    }

    sendRequestHandler = (request) => this.sendRequest(request);

    sendRequest({ requestName, data }) {
        const requestNameCapitalized = Urso.helper.capitaliseFirstLetter(requestName);
        const requestModel = this.getInstance(`Models.${requestNameCapitalized}`, data);

        if (!requestModel) {
            Urso.logger.error(`Transport model ${requestName} not found!`);
            return false;
        }

        Urso.transport.send(requestModel);

        return true;
    }

    onTransportReadyHandler = () => this.onTransportReady();

    onTransportReady() {
        this.emit('modules.transport.ready', null, 100);
    }

    onTransportMessage(response) {
        if (!response) {
            return false;
        }

        const { action = '', data = {} } = response;

        const type = action.replace('Response', '');
        this.emit('modules.transport.receive', { type, data });

        return true;
    }

    onTransportMessageHandler = (response) => this.onTransportMessage(response);

    setupServerCommunication() {
        Urso.transport.setReadyHandler(this.onTransportReadyHandler);
        Urso.transport.setResponseHandler(this.onTransportMessageHandler);
    }

    _subscribeOnce() {
        this.addListener('modules.transport.send', this.sendRequestHandler.bind(this), true);
    }
}

module.exports = ModulesTransportController;
