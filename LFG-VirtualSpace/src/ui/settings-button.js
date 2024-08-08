// Thomas Martinez
// settings-button.js
// A button that appears in the virtual studio space and toggles the background settings menu when clicked. 

// NOTE: right now this also controls the creation of the settings menu which may not be the neatest way of doing things.
//      possibly worth changeing that structure.

import {Assets, Sprite} from "pixi.js";
import { Button } from "@pixi/ui";
import { SettingsMenu } from "./settings-menu.js";

const closeMenuButtonTexture = await Assets.load('assets/images/ui/theme_select_icon_or.png');
const openMenuButtonTexture = await Assets.load('assets/images/ui/theme_select_icon_gr.png');

// button that opens theme selection menu
export class SettingsButton {
    constructor({x, y, sideLength, parent, colors}) {
        this.colors = colors;

        // create icon
        const sprite = new Sprite({
            texture: openMenuButtonTexture,
            width: sideLength,
            height: sideLength,
            x: x,
            y: y,
        });
        parent.addChild(sprite);

        // create settings menu
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