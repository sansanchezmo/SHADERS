let shaderb;

function preload() {
    shaderb = readShader('/luma.frag',
    { matrices: Tree.NONE, varyings: [Tree.uMaterial1, Tree.uMaterial2] });
}

function setup() {
  createCanvas(6000, 6000, WEBGL);
  background(255);
  noStroke();
  slider = createSlider(0, 100, 100);
  slider.position(10, 270);
  slider.style('width', '80px');
  
  colorPicker1 = createColorPicker('lightblue');
  colorPicker1.position(0, 0);
  colorPicker2 = createColorPicker('yellow');
  colorPicker2.position(250, 0);
  //shader(shaderb);
}

function draw() {
  
  
  push();
  
  fill(colorPicker1.color());
  // UP LEFT
  beginShape(TRIANGLES);
  fill('red');
  vertex(5, 800);
  fill('green');
  vertex(14, 800);
  fill('blue');
  vertex(4, 500);
  endShape();
  
  push();
  // DOWN LEFT
  beginShape(TRIANGLES);
  fill('red');
  vertex(v1.x, v1.y);
  fill('green');
  vertex(v2.x, v2.y);
  fill('blue');
  vertex(v3.x, v3.y);
  endShape();
  pop();
  pop();
  
  
  push();
  
  fill(colorPicker2.color());
  // UP RIGHT
  rect(170, 40, 100, 100);
  
    push();
    
    shader(shaderb);
    fill(colorPicker2.color());
    

    // DOWN RIGHT
    rect(100, 160, 100, 100);
    fill(brightness(color(0,0,0)))
    pop();
  pop();

}
