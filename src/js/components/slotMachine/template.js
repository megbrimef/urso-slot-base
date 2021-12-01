class ComponentsSlotMachineTemplate {
    constructor() {
        const _imagePath = 'images/symbols/';

        this.assets = [
            { type: Urso.types.assets.IMAGE, key: '00', path: _imagePath + '00.png' },
            { type: Urso.types.assets.IMAGE, key: '01', path: _imagePath + '01.png' },
            { type: Urso.types.assets.IMAGE, key: '02', path: _imagePath + '02.png' },
            { type: Urso.types.assets.IMAGE, key: '03', path: _imagePath + '03.png' },
            { type: Urso.types.assets.IMAGE, key: '04', path: _imagePath + '04.png' },
            { type: Urso.types.assets.IMAGE, key: '05', path: _imagePath + '05.png' },
            { type: Urso.types.assets.IMAGE, key: '06', path: _imagePath + '06.png' },
            { type: Urso.types.assets.IMAGE, key: '07', path: _imagePath + '07.png' },
            { type: Urso.types.assets.IMAGE, key: '08', path: _imagePath + '08.png' },
            { type: Urso.types.assets.IMAGE, key: '09', path: _imagePath + '09.png' },
            { type: Urso.types.assets.IMAGE, key: '10', path: _imagePath + '10.png' },
        ];

        this.objects = [];
    };

};

module.exports = ComponentsSlotMachineTemplate;
