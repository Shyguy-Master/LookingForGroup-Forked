// Thomas Martinez
// events used by scroll box

import { app } from '../main.js';

let dragTarget = null;
let localMouseStart;
let scrollPosStart;
let maxDistance;

let mousedown = false;

export const setUpScrollBoxEvents = () => {
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);
}

export const onMouseUp = () => {
    mousedown = false;
    // console.log("mouse down = false");
} 

export const onDragStart = (event) => {
    //console.log('entering onDragStart');
    // console.log('mouse down = true');

    mousedown = true;
    dragTarget = event.target;

    // if mouse is released within a certain threshold then a click has occured and no dragging functionality should run
    //      - clicks on menu items are handled by decoration_menu_item.js or decoratin_menu_item_prototype.js
    setTimeout(() => {
        if (mousedown) {
            // console.log("dragging: " + dragTarget.name);
            if (dragTarget.name != "items_container") {
                dragTarget = dragTarget.parent;
                // console.log("switching target: item to container");
            }
    
            localMouseStart = dragTarget.parent.toLocal(event.global, null);
            scrollPosStart = { x: dragTarget.position.x, y: dragTarget.position.y };
            maxDistance = dragTarget.width - dragTarget.parent.width;

            app.stage.on('pointermove', onDragMove);
        }
        // else {
        //     // CLICK HAS OCCURED
        //     // console.log("click");
        // }
    }, 50); 
}

const onDragMove = (event) => {
    //console.log('entering onDragMove');
    if (dragTarget)
    {
        // console.log(dragTarget.width);
        const localMouseCurrent = dragTarget.parent.toLocal(event.global, null);
        const mouseDeltaX = -(localMouseStart.x - localMouseCurrent.x);

        dragTarget.position.x = scrollPosStart.x + mouseDeltaX;
        dragTarget.position.y = 0;

        //console.log(`dragTarget.position.x: ${dragTarget.position.x}, maxDistance: ${-maxDistance},  ${dragTarget.position.x > -maxDistance}`);
        dragTarget.position.x = Math.max(dragTarget.position.x, -maxDistance);
        dragTarget.position.x = Math.min(dragTarget.position.x, 0);
    }
}

const onDragEnd = () => {
    //console.log("entering onDragEnd");
    if (dragTarget)
    {
        app.stage.off('pointermove', onDragMove);
        dragTarget = null;
    }
}