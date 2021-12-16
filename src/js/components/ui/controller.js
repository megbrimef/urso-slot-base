class ComponentsUiController extends Urso.Core.Components.Base.Controller {
    _uiElements = {};

    _stateUpdate(data) {
        const objNames = Object.keys(data);
        objNames.forEach(this._applyState(data));
    }

    _applyState(data) {
        return (objName) => {
            const { visible, enabled } = data[objName];
            const obj = Urso.findOne(`^${objName}`);

            if(!obj) {
                return Urso.logger.error(`Object with name '${objName}' was not found!`);
            }

            if(typeof visible !== 'undefined') {
                obj.visible = visible;
            }

            if(typeof enabled !== 'undefined' && obj.enable && obj.disable) {
                const method = enabled ? 'enable': 'disable';
                obj[method]();
            }
        }
    }
        
    _stateUpdateHandler = (data) => this._stateUpdate(data);

    _subscribeOnce(){
        this.addListener('components.ui.state.update', this._stateUpdateHandler);
    };
}

module.exports = ComponentsUiController;
