class ComponentsAutoSpinTemplate {
    constructor() {
        this.objects = [
            {
                type: Urso.types.objects.BUTTON,
                name: 'auto',
                x: 244,
                y: 916,
                anchorX: 0.5,
                anchorY: 0.5,
                buttonFrames: {
                    over: 'autoUnpressed',
                    out: 'autoUnpressed',
                    pressed: 'autoPressed',
                    disabled: 'autoPressed'
                },
            },
        ];
    };
};

module.exports = ComponentsAutoSpinTemplate;
