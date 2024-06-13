class ModulesLogicController extends Urso.Core.Modules.Logic.Controller {
    getAdditionalLogicBlocks() {
        return [
            'Ui.Controller',
            'Main'
        ];
    }
}

module.exports = ModulesLogicController;
