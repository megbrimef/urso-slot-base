class ComponentsWinCounterTemplate {
    constructor() {

        this.objects = [
            {
                type: Urso.types.objects.TEXT,
                name: 'counterText',
                text: '',
                fontSize: 100,
                alpha: 0,
                fill: '#C0C0C0',
                stroke: '#000',
                strokeThickness: 5,
                fontWeight: 'bold',
                anchorX: 0.5,
                anchorY: 0.5,
                x: 1000, y: 500,
                wordWrapWidth: 440,
                visible: true,
                scaleX: 0.2,
                scaleY: 0.2
            },
        ];
    };

};

module.exports = ComponentsWinCounterTemplate;