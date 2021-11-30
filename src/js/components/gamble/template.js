class ComponentsGambleTemplate {
    constructor() {
        this.objects = [
            {
                type: Urso.types.objects.CONTAINER,
                name: 'gambleContainer',
                visible: false,
                contents: [
                    {
                        type: Urso.types.objects.COMPONENT,
                        componentName: 'bonusBg',
                        options: {
                            name: 'gamble'
                        }
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_stone',
                        anchorX: 0.5,
                        x: 960,
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_winText',
                        anchorX: 0.5,
                        x: 960,
                        y: 100
                    },
                    {
                        type: Urso.types.objects.TEXT,
                        name: 'gambleWinText',
                        text: '',
                        fontSize: 70,
                        fill: '#C0C0C0',
                        stroke: '#000',
                        strokeThickness: 5,
                        fontWeight: 'bold',
                        anchorX: 0.5,
                        anchorY: 0.5,
                        x: 960,
                        y: 195,
                        wordWrapWidth: 440
                    },
                    {
                        type: Urso.types.objects.CONTAINER,
                        name: 'gambleCardsContainer',
                        x: 220,
                        y: 400,
                        width: 1340,
                        contents: []
                    }
                ]
            }
        ];
    };

};

module.exports = ComponentsGambleTemplate;
