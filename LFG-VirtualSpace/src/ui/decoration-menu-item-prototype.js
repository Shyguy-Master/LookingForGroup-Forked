
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
    
    setUpContainer = (sideLength, padding) => {
        let squareSide = sideLength - (padding * 2);
        let sprite = Sprite.from(this.data.src);
        sprite.anchor.set(0.5);
        sprite.position.set(squareSide/2);
        if(sprite.width > squareSide){
            sprite.scale.set(0.5);
        }
        this.background = new Graphics().roundRect(padding, padding, squareSide, squareSide, padding * 1.5).fill(this.colors.FORE_COLOR);
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
        this.background.tint = this.colors.DISABLED_COLOR;
    }

    endHover = () => {
        this.background.tint = 0XFFFFFF;
    }
}