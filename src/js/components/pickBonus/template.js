class ComponentsPickBonusTemplate {
    constructor() {
        this.objects = [
            {
                type: Urso.types.objects.CONTAINER,
                name: 'pickBonusContainer',
                contents: [
                    {
                        type: Urso.types.objects.COMPONENT,
                        componentName: 'bonusBg',
                        options: {
                            name: 'pickBonus'
                        }
                    },
                    {
                        type: Urso.types.objects.CONTAINER,
                        name: 'pickItemsContainer',
                        x: 80,
                        y: 350,
                        contents: [
                            {
                                type: Urso.types.objects.COMPONENT,
                                componentName: 'PickBonus.PickItem',
                                class: 'pickItem',
                                options: {
                                    id: 0,
                                    event: 'components.pickItem.clicked'
                                }
                            },
                            {
                                type: Urso.types.objects.COMPONENT,
                                componentName: 'PickBonus.PickItem',
                                class: 'pickItem',
                                x: 357.5,
                                options: {
                                    id: 1,
                                    event: 'components.pickItem.clicked'
                                }
                            },
                            {
                                type: Urso.types.objects.COMPONENT,
                                componentName: 'PickBonus.PickItem',
                                class: 'pickItem',
                                x: 357.5*2,
                                options: {
                                    id: 2,
                                    event: 'components.pickItem.clicked'
                                }
                            },
                            {
                                type: Urso.types.objects.COMPONENT,
                                componentName: 'PickBonus.PickItem',
                                class: 'pickItem',
                                x: 357.5*3,
                                options: {
                                    id: 3,
                                    event: 'components.pickItem.clicked'
                                }
                            }, 
                            {
                                type: Urso.types.objects.COMPONENT,
                                componentName: 'PickBonus.PickItem',
                                class: 'pickItem',
                                x: 1430,
                                options: {
                                    id: 4,
                                    event: 'components.pickItem.clicked'
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    };

};

module.exports = ComponentsPickBonusTemplate;
