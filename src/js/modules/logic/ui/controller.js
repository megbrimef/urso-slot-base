class ModulesLogicUiController {
    _getInstancePath(path) {
        return `Modules.Logic.Ui${path}`;
    }

    _getControllersToInit() {
        return {
            Buttons: [
                'SpinButtonController'
            ]
        }
    }

    _initContollers() {
        const controllersToInit = this._getControllersToInit();
        this._initControllersRecursive(controllersToInit);
    }

    _initControllersRecursive(obj, pathPrefix = '') {
        if (Array.isArray(obj)) {
            obj.map((controller) => this._initControllersRecursive(controller, pathPrefix));
        } else if(typeof obj === 'object') { 
            const keys = Object.keys(obj);
            keys.map((key) => this._initControllersRecursive(obj[key], `${pathPrefix}.${key}`));
        } else if (typeof obj === 'string') {
            const fullPath = this._getInstancePath(`${pathPrefix}.${obj}`);
            const instance = Urso.getInstance(fullPath);

            if(!instance) {
                Urso.logger.error(`Wrong UI controllers path '${fullPath}'!`);
            }

            instance.init();
        } else {
            Urso.logger.error('Wrong UI controllers config!');
        }
    }

    _subscribeOnce() {
        this._initContollers();
    }
}

module.exports = ModulesLogicUiController;