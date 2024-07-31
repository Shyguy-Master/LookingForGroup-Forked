import {Container, Graphics, Assets, Sprite} from "pixi.js";
import { Button } from "@pixi/ui";
import { SettingsMenu } from "./settings-menu.js";

const closeMenuButtonTexture = await Assets.load('assets/images/ui/theme_select_icon_or.png');
const openMenuButtonTexture = await Assets.load('assets/images/ui/theme_select_icon_gr.png');

// button that opens theme selection menu
export class SettingsButton {
    constructor({x, y, sideLength, parent, colors}) {
        this.colors = colors;

        // icon
        const sprite = new Sprite({
            texture: openMenuButtonTexture,
            anchor: 0.0,
            width: sideLength,
            height: sideLength,
            x: x,
            y: y,
        });
        parent.addChild(sprite);

        this.settingsMenu = new SettingsMenu({
            width: parent.width * 0.7,
            height: parent.height * 0.9,
            parent: parent,
            colors: this.colors,
        })

        this.setupControl(sprite);
    }

    setupControl = (sprite) => {
        let button = new Button(sprite);
        button.onPress.connect(() => {
            if (this.settingsMenu.container.visible) {
                this.settingsMenu.container.visible = false;
                sprite.texture = openMenuButtonTexture;
            }
            else {
                this.settingsMenu.container.visible = true;
                sprite.texture = closeMenuButtonTexture;
            }
        })
    }
}