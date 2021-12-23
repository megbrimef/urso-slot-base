const BaseUiElementController = require('./baseUiElementController');

class ModulesLogicBaseInteraciveUiElementController extends BaseUiElementController {
    _type = null;
    _class = null;
    _canFireInteract = false;

    TYPES = {
        BUTTON: 0,
        SLIDER: 1,
        CHECKBOX: 2,
        TOGGLE: 3,
        TEXTINPUT: 4,
        HITAREA: 5,
    };

    _subscribeByType() {
        let event = '';

        switch (this._type) {
        case this.TYPES.BUTTON:
            event = Urso.events.MODULES_OBJECTS_BUTTON_PRESS;
            break;

        case this.TYPES.SLIDER:
            event = Urso.events.MODULES_OBJECTS_SLIDER_SET_NEW_VALUE;
            break;

        case this.TYPES.CHECKBOX:
            event = Urso.events.MODULES_OBJECTS_CHECKBOX_PRESS;
            break;

        case this.TYPES.TOGGLE:
            event = Urso.events.MODULES_OBJECTS_TOGGLE_PRESS;
            break;

        case this.TYPES.TEXTINPUT:
            event = Urso.events.MODULES_OBJECTS_TEXTINPUT_BLUR;
            break;

        case this.TYPES.HITAREA:
            event = Urso.events.MODULES_OBJECTS_HIT_AREA_PRESS;
            break;

        default:
            Urso.logger.error(`There is no or wrong type '${this._type}' setted!`);
            return;
        }

        this.addListener(event, this._interactHandler, true);
    }

    _interactHandler = (params) => this._interact(params);

    _interact(params) {
        const objClass = params.class || '';
        const classArray = objClass.split(' ');

        if (classArray.includes(this._class)) {
            this._interactDone(params);

            if (this._canFireInteract) {
                this.emit('modules.logic.ui.interact.done');
            }
        }
    }

    _interactDone() {}

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this._subscribeByType();
    }
}

module.exports = ModulesLogicBaseInteraciveUiElementController;
