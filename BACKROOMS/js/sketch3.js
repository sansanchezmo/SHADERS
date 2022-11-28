var $ = function (prop) {
  return document.querySelector(prop);
};
var ang = function (a) {
  return a * (Math.PI / 180);
};
var playerSpeed = 3.2;
var sensitivityX = 0.06;
var sensitivityY = 0.06;
var mx = 0, my = 0;
var keys = [];
var col = [];
var cam;
var zoom = 3.0;
var yAng = 0;
var light = [255, 255, 255];
var floorTexture, wallTexture;
document.body.addEventListener("mousemove", function (e) {
  mx = e.movementX;
  my = e.movementY;
});
var D = {
  cx: 0,
  cy: 0,
  cz: 0,
  x: 0,
  y: 0,
  z: 100,
  r: 0,
  r2: 0,
}
let roof;
let walls;
let floor;

let shaderAL;
let ambient;

function preload() {
  roof = loadImage('assets/images/techo.png');
  walls = loadImage('assets/images/walls.png');
  floor = loadImage('assets/images/floor.png');

  shaderAL = readShader("/showcase/sketches/SHADERS/Lighting/AL.frag", {
    varyings: Tree.NONE,
  });
}

function mouseWheel(event) {
  print(event.delta);
  print('FOV: ' + PI / zoom);
  if (zoom > 1.5 || Math.sign(event.delta) == -1) {
    zoom -= event.delta / 1000;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  noLights();
  // color picker
  colorPicker1 = createColorPicker('black');
  colorPicker1.position(0, 0);
  colorPicker1.input(() => {
    shaderAL.setUniform("lightColor", [
      red(colorPicker1.color()) / 255,
      green(colorPicker1.color()) / 255,
      blue(colorPicker1.color()) / 255,
      1,
    ]);
  });

  // disable p5 lighting
  // noLights();
  ambient = createSlider(0, 1, 1, 0.05);
  ambient.position(window.innerWidth - 100, 10);
  ambient.style('width', '80px');
  ambient.input(() => {
    shaderAL.setUniform("ambient", ambient.value());
  });

  shader(shaderAL);
  shaderAL.setUniform("ambient", ambient.value());
  shaderAL.setUniform("lightColor", [1, 1, 1, 1]);
  // console.log(colorPicker1.color()["levels"])


  // camera creation
  cam = createCamera();
  // Carga de efectos de sonido
  stepsSound = loadSound('assets/audio/step.mp3');
  portalSound = loadSound('assets/audio/portal.mp3');
  sprintSound = loadSound('assets/audio/sprint.mp3');


}

function draw() {
  background(0, 0, 0);
  noStroke();
  // pointLight(light, 0, -80, -880);
  perspective(PI / zoom, width / height, 0.1, 5000);

  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  
  resetShader();
  shader(shaderAL);

  // ambientLight(102, 102, 102);
  // lightEyePosition = treeLocation(light.worldPosition,
  //  { from: Tree.WORLD, to: Tree.EYE });
  // console.log(lightEyePosition)
  // lightShader.setUniform('uLightPosition', lightEyePosition.array());


  cam.pan(ang(-D.cx));
  cam.tilt(ang(D.cy));
  D.r -= (mx * sensitivityX);
  yAng -= (my * sensitivityY);

  cam.setPosition(D.x, -D.y, D.z);

  for (var i = -2.5; i < 2.5; i++) {
    for (var j = -2.5; j < 2.5; j++) {

      push();
      translate(i * 500, 1, j * 500);
      rotateY(ang(90));
      fill(228, 225, 0);
      // texture(walls);
      box(30, 179, 30);

      pop();
    }
  }
  
  push();
  normalMaterial();
  translate(0, 0, -900)
  rotateX(frameCount * 0.03);
  rotateY(frameCount * 0.03);
  box(30);
  pop();

  //Pared
  pared(250, 0, -500, 0, 90, 0, 1500);
  pared(-250, 0, -250, 0, 90, 0, 1000);
  pared(0, 0, 250, 0, 0, 0, 500);
  pared(-750, 0, -750, 0, 0, 0, 1000);
  pared(-500, 0, -1250, 0, 0, 0, 1500);
  pared(-1250, 0, -800, 0, 90, 0, 200);
  pared(-1250, 0, -1200, 0, 90, 0, 200);
  //pared(PARED);

  //Suelo
  for (var k = -20; k < 20; k++) {
    for (var l = -20; l < 20; l++) {
      push();
      translate(k * 100, 50, l * 100);
      //ambientLight(50);
      //pointLight(255, 255, 255, D.cx- width / 2, -D.cy - height / 2, 250);
      rotateX(ang(90));
      fill(108, 114, 23);
      // texture(floor);
      plane(100);
      pop();
    }
  }

  //Techo
  for (var k = -5; k < 5; k++) {
    for (var l = -5; l < 5; l++) {
      push();
      translate(k * 500, -90, l * 500);
      rotateX(ang(90));
      fill(100);
      // texture(roof);
      plane(500);
      pop();
    }
  }

  //Luces
  for (var k = -8; k < 8; k++) {
    for (var l = -10; l < 10; l++) {
      push();
      translate(k * 190, -89, l * 220);

      rotateX(ang(90));
      fill(255);
      box(80, 80, 10);
      pop();
    }
  }

  D.cx = mx * sensitivityX;
  D.cy = my * sensitivityY;

  // Sprint
  if (keys[87] && keyIsDown(16)) {
    if (!sprintSound.isPlaying()) {
      sprintSound.play();
      sprintSound.amp(0.2);
      sprintSound.rate(5);
    }
    playerSpeed = 5;
    D.z -= cos(ang(D.r)) * playerSpeed;
    D.x -= sin(ang(D.r)) * playerSpeed;
  }

  //Moviviento adelante
  if (keys[87]) {
    if (!stepsSound.isPlaying() && !sprintSound.isPlaying()) {
      stepsSound.play();
      stepsSound.rate(2);
    }
    D.z -= cos(ang(D.r)) * playerSpeed;
    D.x -= sin(ang(D.r)) * playerSpeed;

  }
  //Moviviento atras
  if (keys[83]) {
    if (!stepsSound.isPlaying() && !sprintSound.isPlaying()) {
      stepsSound.play();
      stepsSound.rate(2);
    }
    D.z += cos(ang(D.r)) * (playerSpeed - 0.7);
    D.x += sin(ang(D.r)) * (playerSpeed - 0.7);
  }
  //Moviviento izq
  if (keys[65]) {
    if (!stepsSound.isPlaying() && !sprintSound.isPlaying()) {
      stepsSound.play();
      stepsSound.rate(2);
    }
    D.z -= cos(ang(D.r + 90)) * playerSpeed;
    D.x -= sin(ang(D.r + 90)) * playerSpeed;
  }
  //Moviviento derecha
  if (keys[68]) {
    if (!stepsSound.isPlaying() && !sprintSound.isPlaying()) {
      stepsSound.play();
      stepsSound.rate(2);
    }
    D.z += cos(ang(D.r + 90)) * playerSpeed;
    D.x += sin(ang(D.r + 90)) * playerSpeed;
  }
  //Saber coordenadas
  if (keys[69]) {
    print(D.x, D.y, D.z)
  }

  if (mx > 0) {
    mx--;
  }
  if (mx < 0) {
    mx++;
  }
  if (my > 0) {
    my--;
  }
  if (my < 0) {
    my++;
  }
  //Evitar que la camara gire sin control
  if (mx > 30 || mx < -30) {
    mx = 0;
  }
  if (yAng < -30) {
    if (my > 0) {
      sensitivityY = 0;
    } if (my < 0) {
      sensitivityY = 0.15;
    }
  }
  if (yAng > 30) {
    if (my < 0) {
      sensitivityY = 0;
    } if (my > 0) {
      sensitivityY = 0.15;
    }
  }
  //colision alpha (para mejorar usar if en una funcion colidion con los datos de cada pared)
  if (D.z >= 230) {
    console.log('collision: 00');
    D.z = 229
  }
  if (D.x >= 230) {
    console.log('collision: 01');
    D.x = 229
  }
  if (D.z <= -1230) {
    console.log('collision: 02');
    D.z = -1229
  }
  if (D.x <= -230 && D.x >= -260 && D.z >= -730) {
    console.log('collision: 03');
    D.x = -229
  }
  if (D.x < -250 && D.z >= -770) {
    console.log('collision: 04');
    D.z = -769;
  }
  if (D.x < -1230) {
    console.log('collision: 05');
    if (!portalSound.isPlaying()) {
      portalSound.play();
      portalSound.rate(1.5);
    }
    D.x = 0;
    D.z = 100;
    light = [255, int(random(255)), int(random(255))];
    // cam.lookAt(0,0,0);

  }

  lightShader.setUniform('ambient4', colorPicker1.color().levels);

}
function keyPressed() {
  keys[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
}
function mouseClicked() {
  //got this stuff from Willard's Minecraft
  if (canvas.requestPointerLock) {
    canvas.requestPointerLock();
  }
}
function pared(x, y, z, dx, dy, dz, l) {
  push();
  translate(x, y, z);
  rotateX(ang(dx));
  rotateY(ang(dy));
  rotateZ(ang(dz));
  // textureMode(IMAGE);
  // texture(walls);
  fill(228, 225, 70);
  plane(l, 179);
  pop();


  /*Arreglar colision aca denrto UwU con un if y and tal vez o if anidado*/

}
