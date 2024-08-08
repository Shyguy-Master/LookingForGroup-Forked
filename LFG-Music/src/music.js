//Chinmay Gaikwad

import * as PIXI from 'pixi.js';
import {Howl, Howler} from 'howler';

//Global Variables
let app;
let center;//a variable for centering the play button; doesn't need to stay
//let elapsed;//time elapsed in pixi
let playSprites = [];
let mixSprites = [];
let sounds = ['assets/lounge.mp3', 'assets/lounge.mp3','assets/lounge.mp3'];
let soundCount = 0;//sound INDEX which changes which song is played in the sounds[] array
let source; 
// ^^^^the current 'speaker'. can play multiple instances of one sound if not careful
//  source.play() starts a new sound, which needs its Id tracked in a variable to be paused/resumed. like so: soundId = source.play()
//  to RESUME a paused sound, use source.play(soundId)
let soundId;

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
     source = new Howl({
        src: sounds[soundCount],
        autoplay: false,
        loop: true,
        volume: 0.1,
        onend: function() {
            console.log('PixiCanvas()=>howl loaded!');
          }
      });
    
    //Autoplaying the sound when the screen loads; had trouble working it into project
    /*source.once('load', function() {
       soundId = source.play();
    })*/

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

    //Checking if the sound is playing
    if(source.playing(soundId)) 
        {
            //If it is, pause the sound
            source.pause(soundId);
        }
        else //if(!source.playing(soundId) || soundId==undefined)
        {
            if(soundId == undefined){//play a NEW INSTANCE if there isn't a paused one...
                soundId = source.play();
            }else{
                source.play(soundId);//...or resume the last instance if ti was paused. 
            }
        }
}

const onClickForward = (event) => 
{
    source.stop();
    if(playSprites[1].visible==true){
        for(let s of playSprites) {
            s.visible = !s.visible;
        }
    }
    soundCount++;

    mixSprites[1].visible = true;
    mixSprites[1].eventMode = 'static';//changes which forward/back buttons are visible, if on first/last song

    if(soundCount >= 2) 
    {
        mixSprites[0].visible = false;
        mixSprites[0].eventMode = 'none';
    }

    //change which sound is played from the source
    source = new Howl({ 
        src: sounds[soundCount],
        autoplay: false,
        loop: true,
        volume: 0.1,
        onend: function() {
            console.log('onClickForward!');
          }
      });
      soundId = undefined;
    //Autoplays the sound when the screen loads
    /*source.once('load', function() {
        soundId = source.play();
    })
    isPlaying = true;*/
}

const onClickBackward = (event) => 
{
    source.stop();
    if(playSprites[1].visible==true){
        for(let s of playSprites) {
            s.visible = !s.visible;
        }
    }
    soundCount--;

    mixSprites[0].visible = true;
    mixSprites[0].eventMode = 'static';


    if(soundCount <= 0) 
    {
        mixSprites[1].visible = false;
        mixSprites[1].eventMode = 'none';
    }

    source = new Howl({
        src: sounds[soundCount],
        autoplay: false,
        loop: true,
        volume: 0.1,
        onend: function() {
            console.log('onClickbackward!');
          }
      });
      soundId = undefined;

    //Autoplaying the sound when the screen loads
    /*source.once('load', function() {
        soundId = source.play();
    })
    isPlaying = true;*/
}

//Calling our loadPixiCanvas method
loadPixiCanvas();
