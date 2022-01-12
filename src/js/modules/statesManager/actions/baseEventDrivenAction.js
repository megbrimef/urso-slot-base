// eslint-disable-next-line max-len
class ModulesStatesManagerActionsBaseEventDrivenAction extends Urso.Core.Modules.StatesManager.Action {
    event = null;
    name = null;
    _actionFinish = super._onFinish;

    guard() {
        return true;
    }

    _processEvent(responseData) {
        const data = responseData && responseData.data ? responseData.data : {};

        const needFinish = this._postProcessEvent(data);

        if (needFinish) {
            this._removeListeners();
            super._onFinish();
        }
    }

    _postProcessEvent() { return true; }
    _preProcessEvent() {}

    _eventHandler = (responseData) => this._processEvent(responseData);

    _onFinish() {
        if (!this.name || !this.event) {
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
}

module.exports = ModulesStatesManagerActionsBaseEventDrivenAction;
