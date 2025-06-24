class ModulesLogicController extends Urso.Core.Modules.Logic.Controller {
    getAdditionalLogicBlocks() {
        return [
            'Ui.Controller',
            'Main'
        ];
    }
}

export default ModulesLogicController;
