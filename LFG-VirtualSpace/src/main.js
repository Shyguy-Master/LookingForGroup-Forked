// Wilson Xia
import * as PIXI from 'pixi.js';
import { World } from './room/world';
import * as EVENTS from './room/events';
import { DecorationMenu } from './ui/decoration-menu.js';
import { loadData, DEC_TEXTURES } from './room/decorationData.js';


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

    // Create a new world
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
    for(let theme of DEC_TEXTURES){
        let bundle = [];
        for(let dec of theme.data){
            bundle.push({alias: dec.name, src: dec.src})
        }
        PIXI.Assets.addBundle(theme.theme, bundle);
    }
    // Add the room bundle
    // Alternatively, room bundle can also be loaded in algorithmically
    PIXI.Assets.addBundle('rooms', [
        { alias: 'westernRoom', src: 'assets/images/rooms/VS_Room(Western).png'},
        { alias: 'cyberRoom',   src: 'assets/images/rooms/VS_Room(Cyber).png'},
        { alias: 'cuteRoom',    src: 'assets/images/rooms/VS_Room(Cute).png'},
        { alias: 'cozyRoom',    src: 'assets/images/rooms/VS_Room(Cozy).png'},
        { alias: 'fantasyRoom',    src: 'assets/images/rooms/VS_Room(Fantasy).png'},
    ]);
    for(let theme of DEC_TEXTURES) {
        await PIXI.Assets.loadBundle(theme.theme);
    }
    await PIXI.Assets.loadBundle('rooms');
}

const resizeWindow = () => {
    console.log('window resized');
    app.resize();
    console.log('Stage height:' + app.stage.height);
}

init();