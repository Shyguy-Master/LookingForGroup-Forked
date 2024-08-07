// Wilson Xia
import * as PIXI from 'pixi.js';
import { disableEditing } from '../main';

/// Decoration Class
/// Serves as a way to organize all the data of a decoration object, from its creation to its utilization.
export class Decoration {
    constructor(src, size) {
        this.sprite = drawSprite(src);
        this.size = size; // {x:1,y:1};
        this.offset = 0; // the vertical offset for the placement of objects anchored to the center
        this.isWall = false;
        this.attachedGrid; // String -> could work better as a enum
        this.attachedTiles = []; // List of tile ids
        // Display Properties
        // Attatch this info to the sprite
        this.sprite.decoration = this;
    }

    save = () => {
        // save the location this decoration is attached to
        if(this.attachedTiles[0])
            return this.attachedTiles[0].id;
        else{
            return null
        }
    }

    removeTiles = () => {
        // removes all the attached tiles from 
        for (let tile of this.attachedTiles) {
            tile.container.visible = true;
            tile.removeDecoration();
        }
        this.attachedTiles = [];
    }

    setUpEvents(onDragStart) {
        // Events & Interaction
        this.sprite.eventMode = 'static';
        this.sprite.onpointerover = (event) => {
            // Hover
            event.target.tint = `#BBB`; // draws on top of the original darker shade
        }
        this.sprite.onpointerout = (event) => {
            // Hover exit
            event.target.tint = '#fff';
        }
        this.sprite.onpointerdown = (e) => {
            if (!disableEditing) {
                onDragStart(e);
            }
        };
    }
}

const drawSprite = (src) => {
    let sprite = PIXI.Sprite.from(src);
    // Set up drag
    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
    return sprite;
}