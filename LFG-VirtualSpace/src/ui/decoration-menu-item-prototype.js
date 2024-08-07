// Decoration Menu Item Prototype
// Thomas Martinez and Wilson Xia
// Clickable icon that item that creates a decoration item displayed by decoration menu scrollbox

import {Container, Graphics, Sprite} from "pixi.js";
import { Button } from "@pixi/ui";
import { world } from "../main";

export class DecorationMenuItemPrototype {
    constructor({data, sideLength, padding, colors}) {
        // Creation Fields
        this.data = data;
        this.colors = colors;
        this.setUpContainer(sideLength, padding);
        this.setUpEvents();
    }
    
    // create container sprite
    setUpContainer = (sideLength, padding) => {
        let squareSide = sideLength - (padding * 2);
        // Sprite Code
        let sprite = Sprite.from(this.data.src);
        sprite.anchor.set(0.5);
        sprite.position.set(squareSide/2);
        if(sprite.width > squareSide){
            sprite.scale.set(0.5);
        }
        // Background Code
        this.background = new Graphics().roundRect(padding, padding, squareSide, squareSide, padding * 1.5).fill(this.colors.LIGHT_GREY).stroke({ width: 2, color: this.colors.ORANGE });
        // Container Code
        this.menuItem = new Container({
            width: squareSide,
            height: squareSide,
            eventMode: 'static',
            name: "item_button",
        });
        this.menuItem.addChild(this.background);
        this.menuItem.addChild(sprite);
    }

    // EVENTS and EVENT HANDLERS

    setUpEvents = () => {
        this.menuItem.on('click', this.onClick);
        this.menuItem.on('mouseenter', this.hover);
        this.menuItem.on('mouseleave', this.endHover);
    }

    onClick = (e) => {
        // TODO: Check if not scrolling, and then allow for decorations to be created
        world.createDecoration(this.data);
    }

    hover = () => {
        this.background.tint = this.colors.MEDIUM_GREY;
    }

    endHover = () => {
        this.background.tint = 0XFFFFFF;
    }
}