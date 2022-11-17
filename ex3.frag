precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;
uniform float bc;

void main() {
  gl_FragColor = vec4(texcoords2.xy, bc, opacity);
  //gl_FragColor = vec4(0.0, 1.0, 1.0, opacity);
}