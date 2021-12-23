require('@urso/core/src/js');

window.Urso.SlotBase = {};

require('./config/load');
require('./config/main');
Urso.SlotBase.App = require('./slotBaseApp');

Urso.runGame = (new Urso.SlotBase.App()).setup;
