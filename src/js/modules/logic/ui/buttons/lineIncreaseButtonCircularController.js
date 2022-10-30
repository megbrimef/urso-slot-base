// eslint-disable-next-line max-len

const LineIncreaseButtonController = require('./lineIncreaseButtonController');
class ModulesLogicBaseUiButtonsLineIncreaseCircularButtonController extends LineIncreaseButtonController {
    _class = 'lineIncreaseCircularButton';

    get _needBlock() {
        return false;
    }

    get _nextValue() {
        const { lines, value } = Urso.localData.get('lines');
        const nextValue = lines[lines.indexOf(value) + 1];
        return typeof nextValue !== 'undefined' ? nextValue : lines[0];
    }
}

module.exports = ModulesLogicBaseUiButtonsLineIncreaseCircularButtonController;
