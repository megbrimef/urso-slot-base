// eslint-disable-next-line max-len
const BaseUiElementController = require('../baseUiElementController.js');

class ModulesLogicUiInfoClockController extends BaseUiElementController {
    _class = 'clockVal';
    _interval = null;

    init() {
        this._startTime();
    }

    _checkVisible() {
        return true;
    }

    _startTime() {
        this._updateUiState();

        this._interval = setInterval(() => this._updateUiState(), 1000);
    }

    _getFormattedTime() {
        const date = new Date();
        const minutes = Urso.helper.ldgZero(date.getMinutes(), 2);
        const hours = Urso.helper.ldgZero(date.getHours(), 2);

        return `${hours}:${minutes}`;
    }

    _setText() {
        return this._getFormattedTime();
    }
}

module.exports = ModulesLogicUiInfoClockController;
