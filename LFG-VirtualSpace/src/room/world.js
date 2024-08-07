// Wilson Xia
import * as PIXI from 'pixi.js';
import { IsometricGrid } from './isometricGrid';
import { IsometricWall } from './isometricWall';
import { Decoration } from './decoration';
import { onDragStart } from './events';

export class World {
    // Acts as a world sized container, holding all the components for the room, such as the grids and the decorations.
    // Allows for panning and zooming
    constructor({ rows, columns, background = 'cozyRoom' }) {
        this.container = new PIXI.Container();
        this.gridSize = { rows, columns };
        this.grid; // floor
        this.background = background;
        this.leftWall;
        this.rightWall;
        this.selectedGrid;
        this.decorations = [];
    }

    saveWorld = () => {
        // Write to a JSON file
        // decorations
        console.log(this.decorations.map(n => n.save()))
        // background
        console.log(this.background)
        // size
        console.log(this.gridSize)
    }

    setBackground = (bg) => {
        let sprite = PIXI.Sprite.from(bg);
        sprite.scale.set(2.06);
        sprite.anchor.set(0.5);
        this.container.addChild(sprite);
    }

    setUpGrid = (app) => {
        // Create a room texture
        this.setBackground(this.background);

        // Walls
        // this.rightWall = new IsometricWall({ size: { x: this.gridSize.rows, y: this.gridSize.columns }}); //  { x: this.gridSize.rows, y: this.gridSize.columns }
        // this.rightWall.createTiles(this.container);
        // this.rightWall.update();

        // this.leftWall = new IsometricWall({ size: { x: this.gridSize.rows, y: this.gridSize.columns }}); //  { x: this.gridSize.rows, y: this.gridSize.columns }
        // this.leftWall.isLeft = true;
        // this.leftWall.createTiles(this.container);
        // this.leftWall.update();

        // Floor
        this.grid = new IsometricGrid({ size: { x: this.gridSize.rows, y: this.gridSize.columns } }); // { x: this.gridSize.rows, y: this.gridSize.columns }
        this.grid.createTiles(this.container);
        this.grid.update();
        // Select the floor on default
        this.selectedGrid = this.grid; // default = grid
        // Reposition Container
        this.container.position.x = app.screen.width / 2;
        this.container.position.y = app.screen.height / 2;
    }
    deselectGrid = () => {
        // Deselect the currently selected grid
        for (let tile of this.selectedGrid.tiles) {
            tile.useStroke = false;
            tile.drawMethod(tile);
        }
        this.selectedGrid = null
    }

    selectGrid = (value) => {
        // Selects a grid to configure changes with
        // Preferably, would use a switch case to do so
        const selectTiles = (tiles) => {
            // For implementing the state change
            for (let tile of tiles) {
                tile.useStroke = true;
                tile.drawMethod(tile);
            }
        }

        if (value == 'right') {
            this.selectedGrid = this.rightWall;
            selectTiles(this.rightWall.tiles);
        }
        else if (value == 'left') {
            this.selectedGrid = this.leftWall;
            selectTiles(this.leftWall.tiles);
        }
        else if (value == 'floor'){
            this.selectedGrid = this.grid;
            selectTiles(this.grid.tiles);
        }
        else{
            this.selectedGrid = null;
        }
    }

    deleteDecoration = (dec) => {
        console.log(this.decorations);
        let indexToRemove = this.decorations.indexOf(dec.decoration);
        console.log(`Index to Remove : ${indexToRemove}`);
        // remove sprite from reference array
        this.decorations.splice(indexToRemove, 1);
        // remove sprite parent
        dec.parent.removeChild(dec);
    }

    createDecoration = ({ src, scale = 1, size = { x: 1, y: 1 }, anchor = 0.5, isWall = false, offset = 0 }) => {
        // Will be removed with the slider to pull out the decorations
        let newDec = new Decoration(src, size);
        newDec.sprite.scale.set(scale);
        newDec.sprite.anchor.set(anchor, 1);
        newDec.isWall = isWall;
        newDec.offset = offset;
        // Finish set up
        newDec.setUpEvents(onDragStart);
        this.decorations.push(newDec);
        newDec.sprite.index = this.decorations.length - 1;
        this.container.addChild(newDec.sprite);
    }

    attatchDecoration = (dec, pos) => {
        // Get a list of all the tiles that fit the dec at the given pos
        let emptyTiles = this.obtainEmptyTiles(dec, pos);
        // There must be enough empty tiles to fit the decoration
        // If not, then don't do anything
        if (emptyTiles.length != dec.decoration.size.x * dec.decoration.size.y) {
            return;
        }
        // attach all the tiles in the list to that decoration
        for (let i = 0; i < emptyTiles.length; i++) {
            let tile = emptyTiles[i];
            tile.addDecoration(dec);
        } // ends with the first tile, so the decoration gets drawn on that tile
        emptyTiles[0].repositionChild();
        dec.attatchedGrid = this.translateSelectedGrid();
        // hide tiles for visual effect
        // unhides when the decoration is dragged else where
        if (emptyTiles.length > 1) {
            for (let i = 0; i < emptyTiles.length - 1; i++) {
                // skip the first tile
                let tile = emptyTiles[i];
                tile.container.visible = false;
            }
        }
    }

    // Utility
    translateSelectedGrid = () => {
        if (this.selectedGrid == this.grid) {
            return 'floor';
        }
        else if (this.selectedGrid == this.rightWall) {
            return 'right';
        }
        else if (this.selectedGrid == this.leftWall) {
            return 'left';
        }
        else {
            return null;
        }
    }

    bindExtents = (app) => {
        // Clamps the position of the world container so that the grid is always visible
        if (this.container.x < 0) {
            this.container.x = 0;
        }
        else if (this.container.x > app.screen.width) {
            this.container.x = app.screen.width;
        }
        if (this.container.y > app.screen.height) {
            this.container.y = app.screen.height;
        }
        else if (this.container.y < 0) {
            this.container.y = 0;
        }
    }

    checkIfDecorationFits = (dec, mouseCoords) => {
        // TODO: Change the offset by looking at the dragTarget's rotation or size
        // TODO: Change so it matches the algorithm in obtainEmptyTiles
        // Finds the last tile the decoration would be attached to and checks if its on the map
        let lastMouseX = mouseCoords.x + (dec.decoration.size.x - 1) * this.selectedGrid.tileSize.halfWidth;
        let lastMouseY = mouseCoords.y - (dec.decoration.size.y - 1) * this.selectedGrid.tileSize.halfHeight;
        return this.selectedGrid.isInMap({ x: lastMouseX, y: lastMouseY });
    }

    obtainEmptyTiles = (dec, mouseCoords) => {
        // Currently, checks the first tile and then the tiles behind it, up-right
        // TODO: Change the offset by looking at the dragTarget's rotation or size
        let tileList = [];
        let tempPos = this.selectedGrid.screenToMap(mouseCoords);
        // Check if each tile is empty
        for (let j = 0; j < dec.decoration.size.y; j++) {
            // Y
            for (let i = 0; i < dec.decoration.size.x; i++) {
                // X
                let currentTile = this.selectedGrid.getTileByID(tempPos);
                // Only add empty tiles
                if (currentTile && currentTile.child == null) {
                    tileList.push(currentTile);
                }
                // Change in x
                tempPos.x--;
            }
            // Change in y
            tempPos.y--;
            tempPos.x += dec.decoration.size.x; // Resets X count
        }
        return tileList;
    }
}