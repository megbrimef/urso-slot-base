class ModulesLogicUiController {
    _controllers = {};


    _getControllersToInit() {
        return [
            // buttons controller
            // settings controller
            // autospinPanel controller
        ];
    }

    _initContollers() {
        const controllerNames = this._getControllersToInit();
        
        controllers.forEach((controllerName) => {
            debugger;
            this;
        });
    }

    _subscribeOnce() {
        this._initContollers();
    }
}

module.exports = ModulesLogicUiController;