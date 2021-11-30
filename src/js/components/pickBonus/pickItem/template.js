class ComponentsPickItemTemplate {
    constructor() {
        this.objects = [
            {
                type: Urso.types.objects.CONTAINER,
                class: 'pickItemContainer',
                contents: [
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'coffin_empty'
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        class: 'loose',
                        assetKey: 'coffin_loose',
                        x: 10,
                        y: 10,
                    },
                    {
                        type: Urso.types.objects.IMAGE,
                        assetKey: 'coffin_opening_15',
                        class: 'openedImage',
                        x: -20,
                        y: -20,
                        scaleX: 0.75,
                        scaleY: 0.75
                    },
                    {
                        type: Urso.types.objects.TEXT,
                        class: 'baseUi winFieldValue winText',
                        anchorX: 0.5,
                        anchorY: 0.5,
                        x: 165,
                        y: 250,
                        text: '0'
                    },
                    {
                        type: Urso.types.objects.IMAGES_ANIMATION,
                        class: 'openAnimation',
                        assetKey: 'coffin_opening_00',
                        x: -20,
                        y: -20,
                        scaleX: 0.75,
                        scaleY: 0.75,
                        duration: 1000,
                        animationKeys: [
                            'coffin_opening_00',
                            'coffin_opening_01',
                            'coffin_opening_02',
                            'coffin_opening_03',
                            'coffin_opening_04',
                            'coffin_opening_05',
                            'coffin_opening_06',
                            'coffin_opening_07',
                            'coffin_opening_08',
                            'coffin_opening_09',
                            'coffin_opening_10',
                            'coffin_opening_11',
                            'coffin_opening_12',
                            'coffin_opening_13',
                            'coffin_opening_14',
                            'coffin_opening_15'
                        ]
                    }
                ]
            }
        ];
    };
};

module.exports = ComponentsPickItemTemplate ;
