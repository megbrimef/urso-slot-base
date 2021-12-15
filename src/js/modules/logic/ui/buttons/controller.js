class ModulesLogicBaseUiButtonsController {
    _controllers = null;

    _getButtons() {
        return [
            'SpinButtonController'
        ];
    }
    
    init() {
        this._createControllers();
        this._initControllers();
    }

    _getInstancePath(path) {
        return `Modules.Logic.Ui.Buttons.${path}`;
    }

    _initControllers() {
       Object.values(this._controllers).forEach((controller) => controller && controller.init())
    }

    _createControllers() {
        const buttons = this._getButtons();

        this._controllers = buttons.reduce((acc, btnName) => {
            const instance = Urso.getInstance(this._getInstancePath(btnName));
                
            if(!instance) {
                Urso.logger.error(`Instance of '${btnName}' not found`);
            }

            return { ...acc, ...instance };
        }, {});
    }
}

module.exports = ModulesLogicBaseUiButtonsController;