import * as PIXI from 'pixi.js';
import {Howl, Howler} from 'howler';

//Global Variables
let app;
let center;
let elapsed;
let playSprites = [];
let mixSprites = [];
let sounds = ['assets/lounge.mp3', 'assets/lounge.mp3','assets/lounge.mp3'];
let soundCount = 0;
let sound;
let soundId;
let isPlaying = true;

const loadPixiCanvas = async () => {
    //Creating a new PIXI app
    app = new PIXI.Application();

    //Initializing the app
    await app.init({background: '#FFFFFF', resizeTo: window});

    //Adding it to the body
    document.body.appendChild(app.canvas);

    //Center 
    center = { x: app.screen.width / 2, y: app.screen.height / 2 };


     //Setting up the test music
     sound = new Howl({
        src: sounds[soundCount],
        autoplay: true,
        loop: true,
        volume: 0.4,
        onend: function() {
            console.log('Finished!');
          }
      });
    
    //Autoplaying the sound when the screen loads
    sound.once('load', function() {
       soundId = sound.play();
    })

    //Setting up the sprites
    await loadSprites();
    
    let playSprite = PIXI.Sprite.from('assets/play.jpg');
    let pauseSprite = PIXI.Sprite.from('assets/pause.jpg');
    let forwardSprite = PIXI.Sprite.from('assets/forward.jpg');
    let backwardSprite = PIXI.Sprite.from('assets/backward.png');

    playSprites.push(playSprite);
    playSprites.push(pauseSprite);

    mixSprites.push(forwardSprite);
    mixSprites.push(backwardSprite);

    playSprite.position = center;
    pauseSprite.position = center;
    pauseSprite.visible = false;

    forwardSprite.position = {x: (app.screen.width / 2) + 250, y: app.screen.height / 2};
    backwardSprite.position = {x: (app.screen.width / 2) - 250, y: app.screen.height / 2};
    backwardSprite.visible = false;
    
    //For-of loop to set the values for play sprites
    for(let s of playSprites) {
        s.anchor.set(0.5);
        s.width = 75;
        s.height = 75;
        s.eventMode = 'static';
        s.cursor = 'pointer';

        app.stage.addChild(s);
    }

    for(let s of mixSprites) {
        s.anchor.set(0.5);
        s.width = 75;
        s.height = 75;
        s.eventMode = 'static';
        s.cursor = 'pointer';

        app.stage.addChild(s);
    }

    //Setting up the stage for events
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    //Handling click events on the pause and play sprites
    playSprite.on('pointerdown', onClickPlay);
    pauseSprite.on('pointerdown', onClickPlay);

    forwardSprite.on('pointerdown', onClickForward);
    backwardSprite.on('pointerdown', onClickBackward);

    //Adding an app ticker
    app.ticker.add((ticker) => {
        
        elapsed += ticker.deltaTime;
    });
}

const loadSprites = async () => {
    //Loading the sprites
    await PIXI.Assets.load('assets/play.jpg'); 
    await PIXI.Assets.load('assets/pause.jpg'); 
    await PIXI.Assets.load('assets/forward.jpg');
    await PIXI.Assets.load('assets/backward.png');
}

//Events
const onClickPlay = (event) =>
{
    //Inversing the visible property of the sprites if they are clicked
    for(let s of playSprites) {
        s.visible = !s.visible;
    }

    //Checking if isPlaying is true
    if(isPlaying) 
        {
            //If it is, pausing the sound and setting isPlaying to false
            sound.pause(soundId);
            isPlaying = false;
        }
        else 
        {
            //If it isn't, seeking the position of the sound where it was paused and then playing it from there, while setting isPlaying to true
            sound.seek(sound.position, soundId);
            sound.play(soundId);
            isPlaying = true;
        }
}

const onClickForward = (event) => 
{
    sound.stop();
    soundCount++;

    mixSprites[1].visible = true;
    mixSprites[1].eventMode = 'static';

    if(soundCount >= 2) 
    {
        mixSprites[0].visible = false;
        mixSprites[0].eventMode = 'none';
    }

    sound = new Howl({
        src: sounds[soundCount],
        autoplay: true,
        loop: true,
        volume: 0.4,
        onend: function() {
            console.log('Finished!');
          }
      });

    //Autoplaying the sound when the screen loads
    sound.once('load', function() {
        soundId = sound.play();
    })
    isPlaying = true;
}

const onClickBackward = (event) => 
{
    sound.stop();
    soundCount--;

    mixSprites[0].visible = true;
    mixSprites[0].eventMode = 'static';


    if(soundCount <= 0) 
    {
        mixSprites[1].visible = false;
        mixSprites[1].eventMode = 'none';
    }

    sound = new Howl({
        src: sounds[soundCount],
        autoplay: true,
        loop: true,
        volume: 0.4,
        onend: function() {
            console.log('Finished!');
          }
      });

    //Autoplaying the sound when the screen loads
    sound.once('load', function() {
        soundId = sound.play();
    })
    isPlaying = true;
}

//Calling our loadPixiCanvas method
loadPixiCanvas();
