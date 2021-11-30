class ComponentsBackgroundController extends Urso.Core.Components.Base.Controller {

    create(){
        this.emit('background.changeBackground', 'basic');
    }

    _changeBackgoundHandler(bgName){
        const images = Urso.findAll('.backgroundImage');
        images.forEach(bgImage => {
            const mustBeVisible = bgName === bgImage._originalModel.name;
            bgImage.visible = mustBeVisible;
        });
    }

    _subscribeOnce(){
        this.addListener('background.changeBackground', this._changeBackgoundHandler);
    }
}

module.exports = ComponentsBackgroundController;
