class ComponentsSlotMachineTemplate {
    constructor() {
        const _imagePath = 'images/symbols/';

        this.assets = [
            { type: Urso.types.assets.IMAGE, key: '00', path: _imagePath + 'letter1.png' },
            { type: Urso.types.assets.IMAGE, key: '01', path: _imagePath + 'letter2.png' },
            { type: Urso.types.assets.IMAGE, key: '02', path: _imagePath + 'letter3.png' },
            { type: Urso.types.assets.IMAGE, key: '03', path: _imagePath + 'letter4.png' },
            { type: Urso.types.assets.IMAGE, key: '04', path: _imagePath + 'special1.png' },
            { type: Urso.types.assets.IMAGE, key: '05', path: _imagePath + 'special2.png' },
            { type: Urso.types.assets.IMAGE, key: '06', path: _imagePath + 'special3.png' },
            { type: Urso.types.assets.IMAGE, key: '07', path: _imagePath + 'special4.png' },
            { type: Urso.types.assets.IMAGE, key: '08', path: _imagePath + 'special5.png' },
            { type: Urso.types.assets.IMAGE, key: '09', path: _imagePath + 'special6.png' },
            { type: Urso.types.assets.IMAGE, key: '10', path: _imagePath + 'special7.png' },
        ];

        this.objects = [];
    };

};

module.exports = ComponentsSlotMachineTemplate;
