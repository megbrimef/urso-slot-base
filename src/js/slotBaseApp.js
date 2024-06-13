class SlotBaseApp extends Urso.Core.App {
    run() {
        Urso.logic.do('run');
        Urso.statesManager.start();
    }
}

module.exports = SlotBaseApp;
