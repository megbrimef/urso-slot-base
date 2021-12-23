class ComponentsBackgroundTemplate {
    constructor() {
        this.styles = {
            '.backgroundImage.active': {
                visible: true,
            },
            '.backgroundImage': {
                visible: false,
            },
        };

        this.objects = [
            {
                type: Urso.types.objects.IMAGE,
                name: 'bonus',
                assetKey: 'bonus',
                class: 'backgroundImage',

            },
            {
                type: Urso.types.objects.IMAGE,
                name: 'basic',
                assetKey: 'basic',
                class: 'backgroundImage',
            },
        ];
    }
}

module.exports = ComponentsBackgroundTemplate;
