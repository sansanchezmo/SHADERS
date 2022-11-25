function setup() {
    createCanvas(400, 400, WEBGL);
}
  
function draw() {
    background(240);
    normalMaterial();
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.03);
    box(100);
}