// Wilson Xia
import * as PIXI from 'pixi.js';
import { World } from './room/world';
import * as EVENTS from './room/events';
import { DecorationMenu } from './ui/decoration-menu.js';
import { loadData } from './room/decorationData.js';


// DRAG RESOURCE
//https://pixijs.com/8.x/examples/events/dragging
export let app;
export let world;
export let decorationMenu = null;

// placeholder value until login and group creation/joining is implemented
export let disableEditing = false;

const init = async () => {
    // Set up decorations
    await loadData();
    // Set up canvas
    await loadPixiCanvas();
    // Set up the textures
    await loadTextures();

    // Create new world
    world = new World({ rows: 6, columns: 6 });
    app.stage.addChild(world.container);
    world.setUpGrid(app);

    // Create the UI
    if (!disableEditing) {
        decorationMenu = new DecorationMenu({
            app: app,
            parent: app.stage,
            margins: 100,
            height: 120,
            padding: 6,
            scrollMS: 150,
            scrollCount: 6,
        });
    }
    

    // Create Decorations
    // createDecorations();
    
    // Set up stage events
    EVENTS.setUpStageEvents();
    console.log(app.stage);

    // // Update loop
    // app.ticker.add((time) => {
    //     const delta = time.deltaTime;
    //     // console.log(delta);
    //     // grid.container.position.y += delta;
    // });
}

const loadPixiCanvas = async () => {
    // Create a PixiJS application.
    app = new PIXI.Application();

    // Intialize the application.
    await app.init({ background: '#2943AD', resizeTo: window, antialias: true, });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Finally, resize the canvas whenever the window is resized
    window.addEventListener('resize', resizeWindow);
}
const loadTextures = async () => {
    // load the texture
    // Reference: https://pixijs.download/release/docs/assets.Assets.html#addBundle
    PIXI.Assets.addBundle('decorations', [
        { alias: 'fantasyCauldron', src: 'assets/images/VS_Fantasy(Cauldron).png'},
        { alias: 'fantasyTelescope', src: 'assets/images/VS_Fantasy(Telescope).png'},
        { alias: 'westernRack', src: 'assets/images/VS_Western(Rack).png'},
       ]);
    PIXI.Assets.addBundle('cozy', [
        { alias: 'cozyBlankets', src: 'assets/images/cozy/VS_Blankets(Cozy).png' },
        { alias: 'cozyPlant', src: 'assets/images/cozy/VS_Plant(Cozy).png'},
        { alias: 'cozyLight', src: 'assets/images/cozy/VS_Lamp(Cozy).png'},
        { alias: 'cozyBookshelf', src: 'assets/images/cozy/VS_Bookshelf(Cozy).png'},
        { alias: 'cozyChair', src: 'assets/images/cozy/VS_Chair(Cozy).png'},
        { alias: 'cozyCouch', src: 'assets/images/cozy/VS_Couch(Cozy).png'},
        { alias: 'cozyRug', src: 'assets/images/cozy/VS_Rug(Cozy).png'},
        { alias: 'cozyTable', src: 'assets/images/cozy/VS_Table(Cozy).png'},
    ]);
    PIXI.Assets.addBundle('cyber', [
        { alias: 'cyberArm', src: 'assets/images/cyber/VS_Arm(Cyber).png' },
        { alias: 'cyberChair', src: 'assets/images/cyber/VS_Chair(Cyber).png'},
        { alias: 'cyberLamp', src: 'assets/images/cyber/VS_Lamp(Cyber-updated).png'},
        { alias: 'cyberSideTable', src: 'assets/images/cyber/VS_SideTable(Cyber).png'},
        { alias: 'cyberCouch', src: 'assets/images/cyber/VS_Couch(Cyber).png'},
        { alias: 'cyberRug', src: 'assets/images/cyber/VS_Rug(Cyber).png'},
        { alias: 'cyberTable', src: 'assets/images/cyber/VS_Table(Cyber).png'},
        { alias: 'cyberTableOld', src: 'assets/images/cyber/VS_Table(Cyber-new).png'},
    ]);
    PIXI.Assets.addBundle('cute', [
        { alias: 'cuteChair', src: 'assets/images/cute/VS_Chair(Cute).png'},
        { alias: 'cuteCouch', src: 'assets/images/cute/VS_Couch(Cute).png'},
        { alias: 'cuteLamp', src: 'assets/images/cute/VS_Lamp(Cute).png'},
        { alias: 'cuteRug', src: 'assets/images/cute/VS_Rug(Cute).png'},
        { alias: 'cuteTable', src: 'assets/images/cute/VS_Table(Cute).png'},
        { alias: 'cuteFish', src: 'assets/images/cute/VS_Fish(Cute).png'},
        { alias: 'cuteBear', src: 'assets/images/cute/VS_Bear(Cute).png'},
        { alias: 'cuteBookshelf', src: 'assets/images/cute/VS_Bookshelf(Cute).png'},
    ]);
    PIXI.Assets.addBundle('rooms', [
        { alias: 'westernRoom', src: 'assets/images/rooms/VS_Room(Western).png'},
        { alias: 'cyberRoom', src: 'assets/images/rooms/VS_Room(Cyber).png'},
        { alias: 'cuteRoom', src: 'assets/images/rooms/VS_Room(Cute).png'}
    ]);
    await PIXI.Assets.loadBundle('decorations');
    await PIXI.Assets.loadBundle('cozy');
    await PIXI.Assets.loadBundle('cyber');
    await PIXI.Assets.loadBundle('cute');
    await PIXI.Assets.loadBundle('rooms');
}

const resizeWindow = () => {
    console.log('window resized');
    app.resize();
    console.log('Stage height:' + app.stage.height);
}

init();