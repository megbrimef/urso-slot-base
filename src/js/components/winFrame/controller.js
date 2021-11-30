class ComponentsWinFrameController extends Urso.Core.Components.Base.Controller {
    constructor(options) {
        super(options);

        this.view = this.getInstance('View');
    }

    _winFrameHandler(position){
        this.view.createWinFrame(position);
    }

    _animateByOneStop(){
        this.view.animationStop();
    }

    _subscribeOnce(){
        this.addListener('component.slotMachine.symbol.startAnimation', this._winFrameHandler.bind(this));
        this.addListener('components.slotMachine.spinCommand', this._animateByOneStop.bind(this));

        
    };


}

module.exports = ComponentsWinFrameController;