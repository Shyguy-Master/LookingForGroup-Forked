// Thomas Martinez
// Scroll box used by decoration menu to display scrolling list of items

import {Container, Graphics} from "pixi.js";
import * as Events from "./scroll-box-events.js";

export class HorizontalScrollBox {
    constructor({app, parent, x, y, width, height, item_padding, colors}) {
        // set up events
        this.app = app;
        Events.setUpScrollBoxEvents();

        // visual settings
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.item_padding = item_padding;
        this.colors = colors;

        this.parent = parent;
        this.container = new Container({x: x, y: y});
        //let bg = new Graphics().rect(0, 0, width, height).fill(this.colors.FORE_COLOR);
        //this.container.addChild(bg);

        this.items = [];

        let mask = new Graphics().rect(0,0,width,height).fill(0xffffff);
        // Add container that will hold our masked content
        this.maskContainer = new Container();
        // Set the mask to use our graphics object from above
        this.maskContainer.mask = mask;
        // Add the mask as a child, so that the mask is positioned relative to its parent
        this.maskContainer.addChild(mask);
        // And add the container to the window
        this.container.addChild(this.maskContainer);

        // this container holds all of the decoration menu items in a horizontal row. it is what gets moved when scrolling
        this.itemsContainer = new Container({
            height: this.height,
            width: 0,
            eventMode: 'static',
            name: 'items_container' // NOT a pixi.js property. used to differentiate drags and clicks
        });
        this.itemsContainer.on('pointerdown', Events.onDragStart, this.itemsContainer);
        this.itemsContainer.on('pointerup', Events.onMouseUp, this.itemsContainer);

        this.resetScrollMenu();

        this.maskContainer.addChild(this.itemsContainer);

        this.parent.addChild(this.container);
    }

    // adds an item to scroll box
    addItem = (item) => {
        item.position.x = this.items.length * this.height;//(this.height + this.item_padding);
        this.items.push(item);
        this.itemsContainer.addChild(item);

        // this backdrop allows the itemsContainer to be dragged when it is clicked in between each item
        this.itemsContainer.addChild(
            new Graphics({zIndex: -1}).rect(0, 0, this.itemsContainer.width, this.height).fill(this.colors.BG_COLOR)
        );
    }

    // delete all items in scroll box and reset position
    resetScrollMenu = () => {
        // clear all children
        this.itemsContainer.children = [];
        this.itemsContainer.x = 0;
        this.items = [];
    }

    // move a set distance (can be positive or negative)
    // NOTE: this scroll is not animated it just changes the x position.
    scroll = (distance) => {
        this.maxDistance = this.itemsContainer.width - this.width;

        //console.log(`x: ${this.itemsContainer.position.x}, distance: ${distance}`);
        let projectedFinalPos = this.itemsContainer.position.x + distance;

        //console.log(`distance: ${distance}, projectedFinalPos: ${projectedFinalPos}, maxDistance: ${maxDistance},  ${this.itemsContainer.position.x < -maxDistance}`);
        
        // keep scroll position within bounds
        this.itemsContainer.position.x = Math.max(projectedFinalPos, -this.maxDistance);
        this.itemsContainer.position.x = Math.min(this.itemsContainer.position.x, 0);

        // console.log(`start x: ${startX}, end x: ${this.itemsContainer.position.x}, maxDistance: ${this.maxDistance}`);
    }
}
