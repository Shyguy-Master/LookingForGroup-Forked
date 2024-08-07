// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application({
    width: 1200,
    height: 800,
    backgroundColor: 0x6e4901
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

//Initialie all variables
let stage;
let board;
let dragTarget = null;
//Post textures has three different texture meant for the posts
let postTextures = [new PIXI.Texture(PIXI.BaseTexture.from("images/post1.png")), new PIXI.Texture(PIXI.BaseTexture.from("images/post2.png")), new PIXI.Texture(PIXI.BaseTexture.from("images/post3.png")),
    new PIXI.Texture(PIXI.BaseTexture.from("images/post4.png")), new PIXI.Texture(PIXI.BaseTexture.from("images/post5.png")), new PIXI.Texture(PIXI.BaseTexture.from("images/post6.png"))
];
let buttonTexture = new PIXI.Texture(PIXI.BaseTexture.from("images/button.png"));
//Trash texture is just a placeholder for now
let trashTexture = new PIXI.Texture(PIXI.BaseTexture.from("images/trash.png"));
let trash;
let postButton;
//Text style for the board
let textStyle = new PIXI.TextStyle(    
{
    font: '12px Arial',
    fill: 0x000000,
    height: 7,
    width: 10,
    wordWrap: true,
    wordWrapWidth: 200
    //maxWidth: 200
});

let posts = [];
let postGrabbed = false;

//Sets up the game by making all of the scenes, making the buttons, and starting the loop
function setup()
{
    stage = app.stage;
    
    //Rectangle for the main board area
    board = new PIXI.Graphics();
    board.beginFill(0xC7B99E);
    board.drawRect(20, 20, 1160, 760);
    stage.addChild(board);

    //Create the labels
    createLabelsAndButtons();

    //Set up the trash can
    trash = new PIXI.Sprite(trashTexture);
    stage.addChild(trash);
    trash.x = 1110;
    trash.y = 690;
}

//Makes the 'Make a Post' button
function createLabelsAndButtons()
{

    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: "Arial"
    });
    postButton = new PIXI.Text("Make a Post");
    postButton.style = buttonStyle;
    postButton.x = 910;
    postButton.y = 15;
    postButton.interactive = true;
    postButton.buttonMode = true;
    postButton.on("pointerup", makePost); //startGame is a funtion reference
    postButton.on('pointerover', e => e.target.alpha = 0.7);
    postButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    stage.addChild(postButton);
}

//Makes a post
function makePost()
{
    //Choose a random color from the 6
    const post = new PIXI.Sprite(postTextures[Math.floor(Math.random() * 6)]);
    post.x = 100;
    post.y = 100;
    //Make the post interactable and draggable
    post.interactive = true;
    post.buttonMode = true;
    post.eventMode = 'static';
    post.cursor = 'pointer';
    post.anchor.set(0.5);
    post
    .on('pointerdown', onDragStart, post)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

    //Add the text to the post and put it in the center
    let text = new PIXI.Text('Click to edit...', textStyle);
    text.anchor.set(0.5);
    text.scale.set(.75);
    text.interactive = true;
    text.buttonMode = true;
    text.eventMode = 'static';
    text.cursor = 'pointer';
    text.on('pointerdown', editText);
    
    //Add them to the scene
    post.addChild(text);
    posts.push(post);
    stage.addChild(post);
}

function editText()
{
    //Make a text input where the mouse is (which should be within the post itself)
    let text = this;
    let mousePosition = app.renderer.plugins.interaction.mouse.global;
    var input = document.createElement("input");
    input.style.position = "absolute";
    input.style.left = (mousePosition.x - 75).toString() + "px";
    input.style.top = mousePosition.y.toString() + "px";
    input.type = "text";
    input.value = text.text;
    document.body.appendChild(input);
    //Disable interaction with everything
    for(let p of posts){
        p.interactive = false;
        p.buttonMode = false;
        p.interactiveChildren = false;
    }
    postButton.interactive = false;
    postButton.buttonMode = false;
    //Make a confirmation button (Which takes up the entire screen and is translucent, so that when clicking anywhere, edit mode is turned off)
    let button = new PIXI.Sprite(buttonTexture);
    button.alpha = 0.5;
    button.interactive = true;
    button.buttonMode = true;
    button.eventMode = 'static';
    button.cursor = 'pointer';
    //When the button is clicked, change the text value and reenable interaction
    button.on('pointerdown', function(e) { 
        text.text = input.value;
        text.style = textStyle;
        stage.removeChild(this);
        input.remove();
        for(let p of posts){
            p.interactive = true;
            p.buttonMode = true;
            p.interactiveChildren = true;
        }
        postButton.interactive = true;
        postButton.buttonMode = true;
    });
    stage.addChild(button);
}

//Set up drag properties in main
app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();