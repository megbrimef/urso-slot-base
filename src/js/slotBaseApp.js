class SlotBaseApp extends Urso.Core.App {
    run() {
        Urso.logic.do('run');
        Urso.statesManager.start();
    }
}

export default SlotBaseApp;
