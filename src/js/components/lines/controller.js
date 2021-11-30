class ComponentsLinesController extends Urso.Core.Components.Base.Controller {

    constructor(){
        super();
        this.NEXT = 'next';
        this.PREV = 'prev';
    }

    _setHandler(){
        const texts = Urso.findAll('.linesVal');
        const { value } = Urso.localData.get('lines');

        texts.forEach(textObj => textObj.text = value);

        this.emit('components.lines.updated');
    };

    _switchHandler({ type } = {}){
        const { lines, value } = Urso.localData.get('lines');
        const currentIndex = lines.indexOf(value); 

        const modificator = type === this.PREV ? -1 : 1;

        const newValue = this._getNextValue(currentIndex + modificator, lines);
        Urso.localData.set('lines.value', newValue);
        this._setHandler();
    };

    _getNextValue(newIndex, lines){
        if(lines[newIndex])
            return lines[newIndex];

        return lines[0];

    };

    _subscribeOnce(){
        this.addListener('components.lines.set', this._setHandler.bind(this));
        this.addListener('components.lines.switch', this._switchHandler.bind(this));
    };
}

module.exports = ComponentsLinesController;
