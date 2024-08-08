// Thomas Martinez
// background-settings-menu.js
// control menu for selecting virtual studio space theme. 

// TODO: Right now this only changes the background sprite. It should control the overall theme (background sprite AND available decorations)

import { app } from '../main.js';
import {Container, Graphics, Assets, Sprite} from "pixi.js";
import { Button } from "@pixi/ui";
import { HorizontalScrollBox } from "./scroll-box.js";
import { world } from "../main.js";

// temp methods for loading room sprites
// should be done the same way as the decoration items in decoration menu
const roomTextures = [
    await Assets.load('assets/images/rooms/VS_Room(Cozy).png'),
    await Assets.load('assets/images/rooms/VS_Room(Cute).png'),
    await Assets.load('assets/images/rooms/VS_Room(Cyber).png'),
    await Assets.load('assets/images/rooms/VS_Room(Fantasy).png'),
    await Assets.load('assets/images/rooms/VS_Room(Western).png'),
]
const bgColors = ['#000000', '#222222', '#2943AD',]

export class SettingsMenu {
    constructor({width, height, parent, colors}) {

        this.container = new Container({
            x: (parent.width / 2) - (width/2),
            y: (parent.height / 2) - (height/2),
            visible: false,
        });

        let bg = new Graphics().roundRect(0, 0, width, height, 15).fill(colors.WHITE).stroke(colors.BLACK);
        this.container.addChild(bg);

        this.createThemeSelect(200, colors);

        this.createBackgroundSelect(200, colors);

        parent.addChild(this.container);
    }

    createThemeSelect = (height, colors) => {
        let themeScroll = new HorizontalScrollBox({
            app: app,
            parent: this.container,
            x: 10,
            y: 50,
            width: this.container.width - 20,
            height: height,
            item_padding: 100,
            colors: colors
        });

        roomTextures.forEach((roomTexture) => {
            let sprite = new Sprite({texture: roomTexture, width: height, height: height});
            let button = new Button(sprite);
            button.onPress.connect(() => {
                world.setBackground(roomTexture);
            });
            themeScroll.addItem(sprite);
        })

        this.container.addChild(themeScroll.container); 
    }

    createBackgroundSelect = (height, colors) => {
        let themeScroll = new HorizontalScrollBox({
            app: app,
            parent: this.container,
            x: 10,
            y: 300,
            width: this.container.width - 20,
            height: height,
            item_padding: 100,
            colors: colors
        });

        bgColors.forEach((bgColor) => {
            let color = new Graphics().roundRect(0,0,height,height,5).fill(bgColor);
            let button = new Button(color);
            button.onPress.connect(() => {
                app.renderer.background.color = bgColor;
            });
            themeScroll.addItem(color);
        })

        this.container.addChild(themeScroll.container); 
    }
}