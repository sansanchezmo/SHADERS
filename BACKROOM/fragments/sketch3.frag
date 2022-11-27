// precision mediump float;

// // emitted by p5 color-group commands
// // https://p5js.org/reference/#group-Color
// uniform vec4 uMaterialColor;
// uniform vec4 ambient4;

// uniform float ambient;

// void main() {
//   // Ambient Light 
//   // gl_FragColor = (ambient + ambient4) * uMaterialColor;
//   gl_FragColor = (ambient) * uMaterialColor;
// }

precision mediump float;

uniform float ambient;
uniform vec4 uMaterialColor;
// uLightPosition is given in eye space
uniform vec3 uLightPosition;
// both, normal3 and position4 are given in eye space as well
varying vec3 normal3;
varying vec3 position4;

void main() {
  // solve the diffuse light equation discarding negative values
  // see: https://thebookofshaders.com/glossary/?search=max
  // see: https://thebookofshaders.com/glossary/?search=dot
  float diffuse = dot(uLightPosition, vec3(0.01,0.01,0.01)) / 10.0;
  gl_FragColor = (ambient + diffuse) * uMaterialColor;
}