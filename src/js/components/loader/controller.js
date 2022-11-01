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
        finishGameInitAction: {
            run: (finishClbk) => this._runFinishGameInit(finishClbk)
        }
    };

    _gameWasInitiated = false;

    _guardInitGame() {
        return !this._gameWasInitiated;
    }

    _runHideLoader(finishClbk) {
        this._hideLoader();
        finishClbk();
    }

    _runFinishGameInit(finishClbk) {
        this._gameWasInitiated = true;
        finishClbk();
    } 

    _hideLoader() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.style.display = 'none';
    }
}

module.exports = ComponentsLoaderController;
