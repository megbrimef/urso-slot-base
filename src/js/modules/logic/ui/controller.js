class ModulesLogicUiController {
    _controllers = {};


    _getControllersToInit() {
        return [
            'Buttons.Controller'
            // settings controller
            // autospinPanel controller
        ];
    }

    _initContollers() {
        const controllerNames = this._getControllersToInit();
        
        controllerNames.forEach((controllerName) => {
            const instance = Urso.getInstance(`Modules.Logic.Ui.${controllerName}`);
            instance.init();
        });
    }

    _subscribeOnce() {
        this._initContollers();
    }
}

module.exports = ModulesLogicUiController;