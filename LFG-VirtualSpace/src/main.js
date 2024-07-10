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
export let decorationMenu;

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
    decorationMenu = new DecorationMenu({
        app: app,
        parent: app.stage,
        margins: 100,
        height: 120,
        padding: 6,
        scrollMS: 150,
        scrollCount: 6
    });

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
    await app.init({ background: '#2943AD', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Finally, resize the canvas whenever the window is resized
    window.addEventListener('resize', resizeWindow);
}
const loadTextures = async () => {
    // load the texture
    // Reference: https://pixijs.download/release/docs/assets.Assets.html#addBundle
    PIXI.Assets.addBundle('decorations', [
        { alias: 'cuteBear', src: 'assets/images/VS_Cute(Bear).png'},
        { alias: 'cuteFish', src: 'assets/images/VS_Cute(Fish).png'},
        { alias: 'cyberArm', src: 'assets/images/VS_Cyber(Arm).png'},
        { alias: 'fantasyCauldron', src: 'assets/images/VS_Fantasy(Cauldron).png'},
        { alias: 'fantasyTelescope', src: 'assets/images/VS_Fantasy(Telescope).png'},
        { alias: 'westernRack', src: 'assets/images/VS_Western(Rack).png'},
       ]);
    PIXI.Assets.addBundle('cozy', [
        { alias: 'cozyBlankets', src: 'assets/images/cozy/blankets-cozy.png' },
        { alias: 'cozyPlant', src: 'assets/images/cozy/plant-cozy.png'},
        { alias: 'cozyLight', src: 'assets/images/cozy/lamp-cozy-v2.png'},
        { alias: 'cozyBookshelf', src: 'assets/images/cozy/VS_Bookshelf(Cozy).png'},
        { alias: 'cozyChair', src: 'assets/images/cozy/VS_Chair(Cozy).png'},
        { alias: 'cozyCouch', src: 'assets/images/cozy/VS_Couch(Cozy).png'},
        { alias: 'cozyRug', src: 'assets/images/cozy/VS_Rug(Cozy).png'},
        { alias: 'cozyTable', src: 'assets/images/cozy/VS_Table(Cozy).png'},
    ]);
    PIXI.Assets.addBundle('rooms', [
        { alias: 'westernRoom', src: 'assets/images/rooms/VS_Room(Western).png'}
    ]);
    await PIXI.Assets.loadBundle('decorations');
    await PIXI.Assets.loadBundle('cozy');
    await PIXI.Assets.loadBundle('rooms');
}

const createDecorations = () => {
    // Create Decorations
    let halenScale = 2.5;
    // world.createDecorations({});
    // world.createDecorations({ count: 1, src: 'cuteFish',            scale: halenScale, offset: 12});
    // world.createDecorations({ count: 1, src: 'cyberArm',            scale: halenScale,});
    // world.createDecorations({ count: 1, src: 'fantasyCauldron',     scale: halenScale, offset: 12});
    // world.createDecorations({ count: 1, src: 'fantasyTelescope',    scale: halenScale, offset: 12});
    // world.createDecorations({ count: 1, src: 'westernRack',         scale: halenScale, offset: 12});
}

const resizeWindow = () => {
    console.log('window resized');
    app.resize();
    console.log('Stage height:' + app.stage.height);
    
}

init();