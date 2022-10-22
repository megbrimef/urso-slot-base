URSO HTML5 Slot Machine
=============

![ursojs.io logo](https://ursojs.io/img/logo.png)


### About ###

This is slot machine game Engine. Main components for the slot machines creation.

- Responsive (for mobile)
- Fullscreen mode
- Fast performance
- Low bundle size
- Spine support


**[Live Demo](https://examples.ursojs.io/slotBase_simpleSlot/build/index.html)**

### Learn more ###
- You can find more information on the [official website](https://ursojs.io/)
- Explore working [examples](https://ursojs.io/examples.html) demos and see the code structure
- Clone [examples repository](https://github.com/megbrimef/urso-examples) to fast learning

### How to ###

- create index.js with game dependencies and Urso.runGame call rules. We recommend calling this function on boot
- put the loading config (load.js) in app/config and set up your app namespace there
- put the main configuration (main.js) in app/config and configure your application there. extendingChain is used to extend names
- in package.json add @urso/slot-base as a dependency
- put an info file (_info.js) in app/templates to set up a sub-namespace
- put an info file (_info.js) in app/templates/scenes to set up a sub-namespace
- place the scene template file (play.js) in app/templates/scenes. The game scene will be used by default in our engine
- in this.objects on the game scene in the file (play.js) put the necessary components from the slot base that you want to use
- in the options of the 'slotMachine' component, set the 'id' option with one of the values ​​you need: 'basic', 'basicDrop', 'cascadeDrop', cascade', depending on what kind of rotation you want to use
- start the game !!!

Or just clone ready game from **[THIS REPOSITORY](https://github.com/megbrimef/urso-examples/tree/slotBase/simpleSlot)**, run 'npm install && npm run start' and enjoy

### Components ###

**autoSpin**

Component for launching the machine slot in automatic mode.
A kind of menu button to start the drum in the slot of the machine in automatic mode.

**background**

Component for setting the background of the game.
The component changes the background depending on the event, for example, the type of game (bonus or basic)
The template.js file of the component implements objects for the background of the game for the bonus version and for the base game.

**betLines**

A component that calculates the payline value based on the current bet.

**loader**

A component that implements the animation of the progress of loading resources before the start of the game.

**paytable**

The component that displays the paytable is a kind of menu with information on the game, which symbol and which combination is equivalent to a reward.

**slotMachine**

The component that is responsible for displaying characters.

In the options of the 'slotMachine' component, you can set the 'id' option with one of the values ​​you need, depending on what type of rotation you want to use. :

- 'basic'. - the symbols on the reel are animated by scrolling and stop in turn starting from the left column after the stop, the winning symbols are shown with a flashing animation.
- 'basicDrop'. - the symbols on the reel are animated by scrolling and stop in turn starting from the left column after stopping, the winning symbols are reset until the pay lines run out.
- 'cascade' - symbols on the reel are animated by falling after completion, winning symbols are shown with a flashing animation.
- 'cascadeDrop'. - the symbols on the reel are animated by falling after completion, the winning symbols are reset until the pay lines run out.

The template.js file contains assets and objects for the slot machine where you can set the symbol pictures we need for the slot machine.
The file symbols.js - contains dependencies of symbols keys and their images. We can use symbol keys for any implementation of the functionality, for example, playing a sound when a certain key (symbol) appears

**ui**

A component for applying logic module actions to scene objects.

**winCounter**

A component for calculating and selecting the type of win. Contains methods for starting and ending the win animation.

In the config file there are 2 objects corresponding to 2 types of winnings
Simple win - current
Big win - special
in the component's _runShowAnimation({ type }) method, the choice of launching the desired one to win is made.
The type parameter is the type of win (current or bigwin)

**winFrame**

A component for implementing additional animation over symbols, for example, animation of pay lines in a game.

**winLines**

This component shows combinations of winning symbols (win lines) and the parameters corresponding to these lines.

### Modules ###

**logic**

Main logic module.
Here we can implement the logic of the elements depending on the state of the game. For example the behavior of buttons and sounds.

**statesManager**

Game state module. Based on the core component from Urso.Core
Located along the path (see src\js\modules\statesManager)
The list of actions is on the path (see src\js\modules\statesManager\actions)

slot-base - contains the required action set for slot games.
All states are described by the configStates.js file, which is located along the path
src\js\modules\statesManager\configStates.js

- INIT_GAME - game initialization state. Here objects, a scene are created, game resources are loaded and a connection with the server is established.
- IDLE is the state in which the game is waiting for action. Usually, this is showing the main scene and waiting for the slot machine to start working.
- START_SPIN - state when the slot machine starts its work. Here there is a movement of symbols, receiving a response from the server along the pay lines.
- FINISH_SPIN - states when the slot machine finishes its work. Here there is a stop and the display of the played symbols on the slot machine.
- SHOW_WIN - the state in which we show the winning information.

This is a standard set of states that is being supplemented during the development process.

**transport**

Module for working with the server part of the game.

The component contains the base models that are located (see src\js\modules\transport\models).
Here we receive information from the server side, as well as send the necessary requests to the server.

### License ###
Built using Urso web engine.

By Lancecat Games

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
