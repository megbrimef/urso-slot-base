
class ModulesLogicController extends Urso.Core.Modules.Logic.Controller {
    getAdditionalLogicBlocks(){
        return [
            'Ui.Controller',
            'Transport.Controller',
            'main'
        ];
    };
}

module.exports = ModulesLogicController;