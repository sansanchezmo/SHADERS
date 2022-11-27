
'use strict';

let image_src;
let video_src;
let mosaic;
// ui
let resolution;
let video_on;
let mode;
let photoSelect;
let photoA;

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  //image_src = loadImage(`/sketches/shaders/paintings/p${int(random(1, 3))}.jpg`);
  photoA = int(random(1, 6));
  image_src = loadImage(`../../photos/Photo${photoA}.jpg`);
  video_src = createVideo(['/showcase/sketches/mapache.webm']);
  video_src.hide();
  mosaic = readShader('ex12.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 35);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  video_on = createCheckbox('video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('source', video_src);
      video_src.loop();
    } else {
      mosaic.setUniform('source', image_src);
      video_src.pause();
    }
  });
  mosaic.setUniform('source', image_src);
  video_on.position(10, 55);
  mode = createSelect();
  mode.position(10, 75);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    mosaic.setUniform('original', mode.value() === 'original');
  });
  photoSelect = createSelect();
  photoSelect.position(10, 95);
  photoSelect.option('Photo1');
  photoSelect.option('Photo2');
  photoSelect.option('Photo3');
  photoSelect.option('Photo4');
  photoSelect.option('Photo5');
  photoSelect.selected(`Photo${photoA}`)
  photoSelect.changed(() => {
    if (photoSelect.value() == 'Photo1'){
      image_src = loadImage(`../../photos/Photo1.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo2'){
      image_src = loadImage(`../../photos/Photo2.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo3'){
      image_src = loadImage(`../../photos/Photo3.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo4'){
      image_src = loadImage(`../../photos/Photo4.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo5'){
      image_src = loadImage(`../../photos/Photo5.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
  });
}

function draw() {
  // which previous exercise does this code actually solve?
  /*
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) |
  */
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}