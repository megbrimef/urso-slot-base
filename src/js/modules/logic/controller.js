
class ModulesLogicController extends Urso.Core.Modules.Logic.Controller {
    getAdditionalLogicBlocks(){
        return ['Transport.Controller', 'main'];
    };
}

module.exports = ModulesLogicController;