class ComponentsUiController extends Urso.Core.Components.Base.Controller {
    _uiElements = {};

    _stateUpdate(data) {
        const selectors = Object.keys(data);
        selectors.forEach(this._applyState(data));
    }

    _applyState(data) {
        return (selector) => {
            const { visible, enabled } = data[selector];
            const objs = Urso.findAll(selector);

            objs.forEach((obj) => {
                if(!obj) {
                    return Urso.logger.error(`Object with name '${selector}' was not found!`);
                }
    
                if(typeof visible !== 'undefined') {
                    obj.visible = visible;
                }
    
                if(typeof enabled !== 'undefined' && obj.enable && obj.disable) {
                    const method = enabled ? 'enable': 'disable';
                    obj[method]();
                }
            });
        }
    }
        
    _stateUpdateHandler = (data) => this._stateUpdate(data);

    _subscribeOnce(){
        this.addListener('components.ui.state.update', this._stateUpdateHandler);
    };
}

module.exports = ComponentsUiController;
