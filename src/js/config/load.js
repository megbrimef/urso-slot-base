// SlotBase namespace
window.Urso.SlotBase = {
    Components: {
        AutoSpin: {
            Controller: require('../components/autoSpin/controller.js'),
            Template: require('../components/autoSpin/template.js'),
        },
        Background: {
            Controller: require('../components/background/controller.js'),
            Template: require('../components/background/template.js'),
        },
        BetLines: {
            Config: require('../components/betLines/config.js'),
            Controller: require('../components/betLines/controller.js'),
        },
        Gamble: {
            Controller: require('../components/gamble/controller.js'),
            Template: require('../components/gamble/template.js'),
            View: require('../components/gamble/view.js'),
        },
        Loader: {
            Controller: require('../components/loader/controller.js'),
        },
        Paytable: {
            Controller: require('../components/paytable/controller.js'),
        },
        PickBonus: {
            Controller: require('../components/pickBonus/controller.js'),
            Template: require('../components/pickBonus/template.js'),
            PickItem: {
                Controller: require('../components/pickBonus/pickItem/controller.js'),
                Template: require('../components/pickBonus/pickItem/template.js'),
            },
        },
        SlotMachine: {
            Cascade: require('../components/slotMachine/spinTypes/cascade.js'),
            Config: require('../components/slotMachine/config.js'),
            Controller: require('../components/slotMachine/controller.js'),
            Service: require('../components/slotMachine/service.js'),
            Symbol: require('../components/slotMachine/symbol.js'),
            Symbols: require('../components/slotMachine/symbols.js'),
            Template: require('../components/slotMachine/template.js'),
            Tween: require('../components/slotMachine/tween.js'),
            Wheel: require('../components/slotMachine/spinTypes/wheel.js'),
        },
        Ui: {
            Controller: require('../components/ui/controller.js'),
        },
        WinCounter: {
            Config: require('../components/winCounter/config.js'),
            Controller: require('../components/winCounter/controller.js'),
        },
        WinFrame: {
            Controller: require('../components/winFrame/controller.js'),
            Template: require('../components/winFrame/template.js'),
            View: require('../components/winFrame/view.js'),
        },
        WinLines: {
            Controller: require('../components/winLines/controller.js'),
            Template: require('../components/winLines/template.js'),
        },
    },
    Modules: {
        Logic: {
            Controller: require('../modules/logic/controller.js'),
            Main: require('../modules/logic/main.js'),
            Ui: {
                BaseInteractiveUiElementController: require('../modules/logic/ui/baseInteractiveUiElementController.js'),
                BaseUiElementController: require('../modules/logic/ui/baseUiElementController.js'),
                Config: require('../modules/logic/ui/config.js'),
                Controller: require('../modules/logic/ui/controller.js'),
                Buttons: {
                    AutoSpinButtonController: require('../modules/logic/ui/buttons/autoSpinButtonController.js'),
                    BetDecreaseButtonCircularController: require('../modules/logic/ui/buttons/betDecreaseButtonCircularController.js'),
                    BetDecreaseButtonController: require('../modules/logic/ui/buttons/betDecreaseButtonController.js'),
                    BetIncreaseButtonCircularController: require('../modules/logic/ui/buttons/betIncreaseButtonCircularController.js'),
                    BetIncreaseButtonController: require('../modules/logic/ui/buttons/betIncreaseButtonController.js'),
                    BetMaxButtonController: require('../modules/logic/ui/buttons/betMaxButtonController.js'),
                    CollectButtonController: require('../modules/logic/ui/buttons/collectButtonController.js'),
                    LineIncreaseButtonCircularController: require('../modules/logic/ui/buttons/lineIncreaseButtonCircularController.js'),
                    LineIncreaseButtonController: require('../modules/logic/ui/buttons/lineIncreaseButtonController.js'),
                    SkipButtonController: require('../modules/logic/ui/buttons/skipButtonController.js'),
                    SpinButtonController: require('../modules/logic/ui/buttons/spinButtonController.js'),
                    TurboModeButtonController: require('../modules/logic/ui/buttons/turboModeButtonController.js'),
                },
                Info: {
                    BalanceController: require('../modules/logic/ui/info/balanceController.js'),
                    BetController: require('../modules/logic/ui/info/betController.js'),
                    CheeringController: require('../modules/logic/ui/info/cheeringController.js'),
                    ClockController: require('../modules/logic/ui/info/clockController.js'),
                    LinesController: require('../modules/logic/ui/info/linesController.js'),
                    TotalBetController: require('../modules/logic/ui/info/totalBetController.js'),
                    WinController: require('../modules/logic/ui/info/winController.js'),
                },
            },
        },
        StatesManager: {
            ConfigStates: require('../modules/statesManager/configStates.js'),
            Actions: {
                BaseTransportAction: require('../modules/statesManager/actions/baseTransportAction.js'),
                InitUiLogicAction: require('../modules/statesManager/actions/initUiLogicAction.js'),
                LoadDefaultSceneAction: require('../modules/statesManager/actions/loadDefaultSceneAction.js'),
                MakeBetAction: require('../modules/statesManager/actions/makeBetAction.js'),
                ResetWinTextAction: require('../modules/statesManager/actions/resetWinTextAction.js'),
                ServerApiVersionRequestAction: require('../modules/statesManager/actions/serverApiVersionRequestAction.js'),
                ServerAuthRequestAction: require('../modules/statesManager/actions/serverAuthRequestAction.js'),
                ServerBalanceRequestAction: require('../modules/statesManager/actions/serverBalanceRequestAction.js'),
                ServerCheckBrokenGameRequestAction: require('../modules/statesManager/actions/serverCheckBrokenGameRequestAction.js'),
                ServerSpinRequestAction: require('../modules/statesManager/actions/serverSpinRequestAction'),
                TransportInitAction: require('../modules/statesManager/actions/transportInitAction.js'),
                UpdateBalanceAction: require('../modules/statesManager/actions/updateBalanceAction.js'),
                UpdateServerSettingsAction: require('../modules/statesManager/actions/updateServerSettingsAction.js'),
                UpdateWinTextAction: require('../modules/statesManager/actions/updateWinTextAction.js'),
                WaitingForInteractionAction: require('../modules/statesManager/actions/waitingForInteractionAction.js'),
            }
        },
        Transport: {
            BaseModel: require('../modules/transport/baseModel.js'),
            Controller: require('../modules/transport/controller.js'),
            Models: {
                ApiVersionRequest: require('../modules/transport/models/apiVersionRequest.js'),
                AuthRequest: require('../modules/transport/models/authRequest.js'),
                BalanceRequest: require('../modules/transport/models/balanceRequest.js'),
                CheckBrokenGameRequest: require('../modules/transport/models/checkBrokenGameRequest.js'),
                SpinRequest: require('../modules/transport/models/spinRequest.js'),
                GambleRequest: require('../modules/transport/models/gambleRequest.js'),
                PickBonusRequest: require('../modules/transport/models/pickBonusRequest.js'),
            }
        }
    },
};
