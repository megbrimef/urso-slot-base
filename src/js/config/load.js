import AutoSpinController from '../components/autoSpin/controller.js';
import AutoSpinTemplate from '../components/autoSpin/template.js';
import BackgroundController from '../components/background/controller.js';
import BackgroundTemplate from '../components/background/template.js';
import BetLinesConfig from '../components/betLines/config.js';
import BetLinesController from '../components/betLines/controller.js';
import GambleController from '../components/gamble/controller.js';
import GambleTemplate from '../components/gamble/template.js';
import GambleView from '../components/gamble/view.js';
import LoaderController from '../components/loader/controller.js';
import PaytableController from '../components/paytable/controller.js';
import PickBonusController from '../components/pickBonus/controller.js';
import PickBonusTemplate from '../components/pickBonus/template.js';
import PickItemController from '../components/pickBonus/pickItem/controller.js';
import PickItemTemplate from '../components/pickBonus/pickItem/template.js';
import Cascade from '../components/slotMachine/spinTypes/cascade.js';
import SlotMachineConfig from '../components/slotMachine/config.js';
import SlotMachineController from '../components/slotMachine/controller.js';
import SlotMachineService from '../components/slotMachine/service.js';
import SlotMachineSymbol from '../components/slotMachine/symbol.js';
import SlotMachineSymbols from '../components/slotMachine/symbols.js';
import SlotMachineTemplate from '../components/slotMachine/template.js';
import SlotMachineTween from '../components/slotMachine/tween.js';
import Wheel from '../components/slotMachine/spinTypes/wheel.js';
import UiController from '../components/ui/controller.js';
import WinCounterConfig from '../components/winCounter/config.js';
import WinCounterController from '../components/winCounter/controller.js';
import WinFrameController from '../components/winFrame/controller.js';
import WinFrameTemplate from '../components/winFrame/template.js';
import WinFrameView from '../components/winFrame/view.js';
import WinLinesController from '../components/winLines/controller.js';
import WinLinesTemplate from '../components/winLines/template.js';
import LogicController from '../modules/logic/controller.js';
import LogicMain from '../modules/logic/main.js';
import BaseInteractiveUiElementController from '../modules/logic/ui/baseInteractiveUiElementController.js';
import BaseUiElementController from '../modules/logic/ui/baseUiElementController.js';
import LogicUiConfig from '../modules/logic/ui/config.js';
import LogicUiController from '../modules/logic/ui/controller.js';
import AutoSpinButtonController from '../modules/logic/ui/buttons/autoSpinButtonController.js';
import BetDecreaseButtonCircularController from '../modules/logic/ui/buttons/betDecreaseButtonCircularController.js';
import BetDecreaseButtonController from '../modules/logic/ui/buttons/betDecreaseButtonController.js';
import BetIncreaseButtonCircularController from '../modules/logic/ui/buttons/betIncreaseButtonCircularController.js';
import BetIncreaseButtonController from '../modules/logic/ui/buttons/betIncreaseButtonController.js';
import BetMaxButtonController from '../modules/logic/ui/buttons/betMaxButtonController.js';
import CollectButtonController from '../modules/logic/ui/buttons/collectButtonController.js';
import LineIncreaseButtonCircularController from '../modules/logic/ui/buttons/lineIncreaseButtonCircularController.js';
import LineIncreaseButtonController from '../modules/logic/ui/buttons/lineIncreaseButtonController.js';
import SkipButtonController from '../modules/logic/ui/buttons/skipButtonController.js';
import SpinButtonController from '../modules/logic/ui/buttons/spinButtonController.js';
import TurboModeButtonController from '../modules/logic/ui/buttons/turboModeButtonController.js';
import BalanceController from '../modules/logic/ui/info/balanceController.js';
import BetController from '../modules/logic/ui/info/betController.js';
import CheeringController from '../modules/logic/ui/info/cheeringController.js';
import ClockController from '../modules/logic/ui/info/clockController.js';
import LinesController from '../modules/logic/ui/info/linesController.js';
import TotalBetController from '../modules/logic/ui/info/totalBetController.js';
import WinController from '../modules/logic/ui/info/winController.js';
import ConfigStates from '../modules/statesManager/configStates.js';
import BaseTransportAction from '../modules/statesManager/actions/baseTransportAction.js';
import InitUiLogicAction from '../modules/statesManager/actions/initUiLogicAction.js';
import LoadDefaultSceneAction from '../modules/statesManager/actions/loadDefaultSceneAction.js';
import MakeBetAction from '../modules/statesManager/actions/makeBetAction.js';
import ResetWinTextAction from '../modules/statesManager/actions/resetWinTextAction.js';
import ServerApiVersionRequestAction from '../modules/statesManager/actions/serverApiVersionRequestAction.js';
import ServerAuthRequestAction from '../modules/statesManager/actions/serverAuthRequestAction.js';
import ServerBalanceRequestAction from '../modules/statesManager/actions/serverBalanceRequestAction.js';
import ServerCheckBrokenGameRequestAction from '../modules/statesManager/actions/serverCheckBrokenGameRequestAction.js';
import ServerSpinRequestAction from '../modules/statesManager/actions/serverSpinRequestAction.js';
import TransportInitAction from '../modules/statesManager/actions/transportInitAction.js';
import UpdateBalanceAction from '../modules/statesManager/actions/updateBalanceAction.js';
import UpdateServerSettingsAction from '../modules/statesManager/actions/updateServerSettingsAction.js';
import UpdateWinTextAction from '../modules/statesManager/actions/updateWinTextAction.js';
import WaitingForInteractionAction from '../modules/statesManager/actions/waitingForInteractionAction.js';
import BaseModel from '../modules/transport/baseModel.js';
import TransportController from '../modules/transport/controller.js';
import ApiVersionRequest from '../modules/transport/models/apiVersionRequest.js';
import AuthRequest from '../modules/transport/models/authRequest.js';
import BalanceRequest from '../modules/transport/models/balanceRequest.js';
import CheckBrokenGameRequest from '../modules/transport/models/checkBrokenGameRequest.js';
import SpinRequest from '../modules/transport/models/spinRequest.js';
import GambleRequest from '../modules/transport/models/gambleRequest.js';
import PickBonusRequest from '../modules/transport/models/pickBonusRequest.js';

// SlotBase namespace
window.Urso.SlotBase = {
    Components: {
        AutoSpin: {
            Controller: AutoSpinController,
            Template: AutoSpinTemplate,
        },
        Background: {
            Controller: BackgroundController,
            Template: BackgroundTemplate,
        },
        BetLines: {
            Config: BetLinesConfig,
            Controller: BetLinesController,
        },
        Gamble: {
            Controller: GambleController,
            Template: GambleTemplate,
            View: GambleView,
        },
        Loader: {
            Controller: LoaderController,
        },
        Paytable: {
            Controller: PaytableController,
        },
        PickBonus: {
            Controller: PickBonusController,
            Template: PickBonusTemplate,
            PickItem: {
                Controller: PickItemController,
                Template: PickItemTemplate,
            },
        },
        SlotMachine: {
            Cascade: Cascade,
            Config: SlotMachineConfig,
            Controller: SlotMachineController,
            Service: SlotMachineService,
            Symbol: SlotMachineSymbol,
            Symbols: SlotMachineSymbols,
            Template: SlotMachineTemplate,
            Tween: SlotMachineTween,
            Wheel: Wheel,
        },
        Ui: {
            Controller: UiController,
        },
        WinCounter: {
            Config: WinCounterConfig,
            Controller: WinCounterController,
        },
        WinFrame: {
            Controller: WinFrameController,
            Template: WinFrameTemplate,
            View: WinFrameView,
        },
        WinLines: {
            Controller: WinLinesController,
            Template: WinLinesTemplate,
        },
    },
    Modules: {
        Logic: {
            Controller: LogicController,
            Main: LogicMain,
            Ui: {
                BaseInteractiveUiElementController: BaseInteractiveUiElementController,
                BaseUiElementController: BaseUiElementController,
                Config: LogicUiConfig,
                Controller: LogicUiController,
                Buttons: {
                    AutoSpinButtonController: AutoSpinButtonController,
                    BetDecreaseButtonCircularController: BetDecreaseButtonCircularController,
                    BetDecreaseButtonController: BetDecreaseButtonController,
                    BetIncreaseButtonCircularController: BetIncreaseButtonCircularController,
                    BetIncreaseButtonController: BetIncreaseButtonController,
                    BetMaxButtonController: BetMaxButtonController,
                    CollectButtonController: CollectButtonController,
                    LineIncreaseButtonCircularController: LineIncreaseButtonCircularController,
                    LineIncreaseButtonController: LineIncreaseButtonController,
                    SkipButtonController: SkipButtonController,
                    SpinButtonController: SpinButtonController,
                    TurboModeButtonController: TurboModeButtonController,
                },
                Info: {
                    BalanceController: BalanceController,
                    BetController: BetController,
                    CheeringController: CheeringController,
                    ClockController: ClockController,
                    LinesController: LinesController,
                    TotalBetController: TotalBetController,
                    WinController: WinController,
                },
            },
        },
        StatesManager: {
            ConfigStates: ConfigStates,
            Actions: {
                BaseTransportAction: BaseTransportAction,
                InitUiLogicAction: InitUiLogicAction,
                LoadDefaultSceneAction: LoadDefaultSceneAction,
                MakeBetAction: MakeBetAction,
                ResetWinTextAction: ResetWinTextAction,
                ServerApiVersionRequestAction: ServerApiVersionRequestAction,
                ServerAuthRequestAction: ServerAuthRequestAction,
                ServerBalanceRequestAction: ServerBalanceRequestAction,
                ServerCheckBrokenGameRequestAction: ServerCheckBrokenGameRequestAction,
                ServerSpinRequestAction: ServerSpinRequestAction,
                TransportInitAction: TransportInitAction,
                UpdateBalanceAction: UpdateBalanceAction,
                UpdateServerSettingsAction: UpdateServerSettingsAction,
                UpdateWinTextAction: UpdateWinTextAction,
                WaitingForInteractionAction: WaitingForInteractionAction,
            }
        },
        Transport: {
            BaseModel: BaseModel,
            Controller: TransportController,
            Models: {
                ApiVersionRequest: ApiVersionRequest,
                AuthRequest: AuthRequest,
                BalanceRequest: BalanceRequest,
                CheckBrokenGameRequest: CheckBrokenGameRequest,
                SpinRequest: SpinRequest,
                GambleRequest: GambleRequest,
                PickBonusRequest: PickBonusRequest,
            }
        }
    },
};
