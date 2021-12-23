class ComponentsLoaderController extends Urso.Core.Components.StateDriven.Controller {
    configStates = {
        INIT_GAME: {
            guard: () => this._guardInitGame(),
        },
    };

    configActions = {
        hideLoaderAction: {
            run: (finishClbk) => this._runHideLoader(finishClbk),
        },
    };

    _gameWasInited = false;

    _guardInitGame() {
        return !this._gameWasInited;
    }

    _runHideLoader(finishClbk) {
        this._hideLoader();
        this._gameWasInited = true;
        finishClbk();
    }

    _hideLoader() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.style.display = 'none';
    }
}

module.exports = ComponentsLoaderController;
