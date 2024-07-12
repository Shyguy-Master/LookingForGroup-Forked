// Wilson Xia
import { app, world, decorationMenu, disableEditing } from '../main';

const mouseCoords = { x: 0, y: 0 };
let dragTarget = null;
let panMode = true;
let isPanning = false;
let offsetX, offsetY, startPanX, startPanY = 0;

export const setUpStageEvents = () => {
    // Set up for drag
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    // Keep track of mouse position
    app.stage.on('mousemove', (event) => {
        mouseCoords.x = event.global.x;
        mouseCoords.y = event.global.y;
        // console.log(mouseCoords);
    });
    // app.stage.on('click', ()=>console.log(`mouse: ${mouseCoords.x}, ${mouseCoords.y}`));
    app.stage.on('pointerdown', () => {
        for (let dec of world.decorations) {
            // Reset Changes
            if (dec != null) {
                dec.sprite.alpha = 1;
                dec.sprite.tint = "#ffffff";
            }
        }
        if (!disableEditing) {
            if (!decorationMenu.inSlider) onPanStart();
        }
        else {
            onPanStart();
        }
        // Check to see if we are outside the decoration menu slider
    });
    app.stage.on('pointermove', onPanMove);
    app.stage.on('pointerup', () => {
        onDragEnd();
        isPanning = false;
    });
    app.stage.on('pointerupoutside', () => {
        onDragEnd();
        isPanning = false;
    });
    app.stage.on('wheel', onZoom);
}

// Panning
const onPanStart = () => {
    world.selectedGrid.update();
    if (panMode && !dragTarget) {
        startPanX = mouseCoords.x;
        startPanY = mouseCoords.y;
        isPanning = true;
    }
}

const onPanMove = () => {
    if (isPanning) {
        // Find the offset between mouse and screen
        offsetX = mouseCoords.x - startPanX;
        offsetY = mouseCoords.y - startPanY;
        // Update the position of the view container
        world.container.x += offsetX;
        world.container.y += offsetY;
        // Bind Extents
        world.bindExtents(app);
        // update start pan
        startPanX = mouseCoords.x;
        startPanY = mouseCoords.y;
    }
}

// Drag Events
export const onDragStart = (event) => {
    // Store a reference to the data
    dragTarget = event.target;
    dragTarget.alpha = 0.5;
    // Clean up the reference
    if (dragTarget.decoration.attachedTiles.length > 0) {
        // Remove it from its attached tiles
        dragTarget.decoration.removeTiles();
        dragTarget.decoration.attachedGrid = null;
    }
    bringToFront(dragTarget); // Bring it back to the front of the screen
    dragTarget.parent.toLocal(event.global, null, dragTarget.position); // Set it back to screen position, not world position
    // Decide which grid to use
    if (dragTarget.decoration.isWall) {
        // TODO: Base which wall to use on rotation
        world.selectGrid('right');
    }
    else {
        world.selectGrid('floor');
    }
    // Procede to Move handling
    app.stage.on('pointermove', onDragMove);
}

const onDragMove = (event) => {
    if (dragTarget) {
        // Sets drag target to the location of the mouse
        // Takes the parent (its container) and moves it along the mouse
        dragTarget.parent.toLocal(event.global, null, dragTarget.position); // https://pixijs.download/v4.8.9/docs/PIXI.Container.html#toLocal

        // check if decoration has been dragged over top of decoration menu
        //console.log('decorationMenu.inSlider: ' + decorationMenu.inSlider);
        if (decorationMenu.inSlider) {
            decorationMenu.showDeleteUI();
        }
        else {
            decorationMenu.hideDeleteUI();
        }
    }
}

const onDragEnd = () => {
    // Check if there is a drag target
    if (dragTarget) {
        // Turn off
        app.stage.off('pointermove', onDragMove);
        // check if over decoration menu
        if (decorationMenu.inSlider) {
            world.deleteDecoration(dragTarget);
        }
        else {
            // Check if on grid
            if (world.selectedGrid.isInMap(mouseCoords) && world.checkIfDecorationFits(dragTarget, mouseCoords)) {
                // Check if the current position can fit the decoration by checking the extended coordinates.
                // This is based on the decoration's size (2x2, 3x4)
                world.attatchDecoration(dragTarget, mouseCoords);
            }

        }
        // Get rid of drag target
        dragTarget = null;
        // ensure delete ui in hidden
        decorationMenu.hideDeleteUI();

        world.saveWorld();
    }
}

// Zoom
const onZoom = (e) => {
    // Take the world container and scale it
    let direction = e.deltaY > 0 ? 1 : -1;
    let newScale = world.container.scale.x + direction * -0.1; // smoothing + inverse direction
    newScale = Math.min(Math.max(0.5, newScale), 4); // Boundaries
    world.container.scale.set(newScale);
    // Bind Extents
    world.bindExtents(app);
    world.selectedGrid.update();
}

// Utility
const bringToFront = (sprite) => {
    // Remove the sprite from its original parent and re-add it
    world.container.removeChild(sprite);
    world.container.addChild(sprite);
}