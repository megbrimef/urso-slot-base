class ComponentsPickBonusPickItemController extends Urso.Core.Components.Base.Controller {

    constructor(params){
        super(params);
        this._id = params.id;
        this._event = params.event;
    }
    
    create(){
        super.create();
        this.reset();
    }

    get _looseImage(){
        return this.common.findOne('.loose');
    }

    get _pickItemContainer(){
        return this.common.findOne('.pickItemContainer');
    }

    get _openAnimation(){
        return this.common.findOne('.openAnimation');
    }

    get _winText(){
        return this.common.findOne('.winText');
    }

    get id(){
        return this._id;
    }
    
    get _openedImage(){
        return this.common.findOne('.openedImage');
    }

    set interactive(isInteractive){
        this._pickItemContainer._baseObject.interactive = isInteractive;
        this._pickItemContainer._baseObject.buttonMode = isInteractive;
        
        if(isInteractive){
            this._pickItemContainer._baseObject.on('click', this._onClick.bind(this));
            this._pickItemContainer._baseObject.on('tap', this._onClick.bind(this));
        }
        else 
            this._pickItemContainer._baseObject.removeAllListeners();
    }

    set winTextValue(text = 0){
        this._winText.visible = text > 0;
        this._winText.text = text;
    }

    set loose(needLoose){
        this._looseImage.visible = needLoose;
    }

    set opened(isOpened) {
        this._openAnimation.visible = !isOpened;
        this._openedImage.visible = isOpened;
    }

    _onClick(){
        this.emit(this._event, this._id);
        this.open();
    }

    _onComplete(){
        this.opened = true;
    }

    open(){
        this._openAnimation.onComplete = this._onComplete.bind(this);
        this._openAnimation.start();
    }

    reset() {
        this.loose = false;
        this.interactive = !false;
        this.opened = false;
        this.winTextValue = 0;
    }
}

module.exports = ComponentsPickBonusPickItemController;
