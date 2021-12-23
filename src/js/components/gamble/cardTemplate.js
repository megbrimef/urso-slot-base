class ComponentsGambleCardTemplate {
    constructor() {
        this.objects = [
            {
                type: Urso.types.objects.CONTAINER,
                contents: [
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_card_closed',
                        class: 'closed',
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_card_red_opened',
                        visible: false,
                        class: 'red',
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_card_black_opened',
                        visible: false,
                        class: 'black',
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'risk_card_shadow',
                        class: 'shadow',
                        y: 700,
                        x: -170,
                    },
                ],
            },
        ];
    }
}

module.exports = ComponentsGambleCardTemplate;
