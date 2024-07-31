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

export class SettingsMenu {
    constructor({app, width, height, parent, colors}) {

        this.container = new Container({
            x: (parent.width / 2) - (width/2),
            y: (parent.height / 2) - (height/2),
            visible: false,
        });

        let bg = new Graphics().roundRect(0, 0, width, height, 15).fill(colors.WHITE).stroke(colors.BLACK);
        this.container.addChild(bg);

        this.createThemeSelect(app, 200, colors);

        this.createBackgroundSelect();

        parent.addChild(this.container);
    }

    createThemeSelect = (app, height, colors) => {
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

    createBackgroundSelect = () => {

    }
}