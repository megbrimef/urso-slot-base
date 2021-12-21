class ModulesStatesManagerActionsBaseTransportAction extends Urso.Core.Modules.StatesManager.Action {
    event = 'modules.transport.receive';
    name = null;

    guard() {
        return Urso.config.useTransport;
    }

    sendRequest(requestName, data){
        this.emit('modules.transport.send', { requestName, data });
    };

    _processEvent = (responseData) => {
        const data = responseData && responseData.data ? responseData.data : {};

        this._removeListeners();
        
        const needFinish = this._postProcessEvent(data);

        if(needFinish) {
            super._onFinish();
        }
    }

    _postProcessEvent(data) { return true; }
    _preProcessEvent() {}


    _eventHandler = (responseData) => this._processEvent(responseData);

    _onFinish() {
        if(!this.name || !this.event) {
            Urso.logger.error(`There no name: '${this.name}' or event: '${this.event}'`);
            return;
        }

        this._addListeners();
        this._preProcessEvent();
    }

    _addListeners() {
        this.addListener(this.event, this._eventHandler, true);
    }

    _removeListeners() {
        this.removeListener(this.event, this._eventHandler, true);
    }
};

module.exports = ModulesStatesManagerActionsBaseTransportAction;
