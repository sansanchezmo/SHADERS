precision mediump float;

uniform float ambient;
uniform vec4 uMaterialColor;
uniform vec3 uLightPosition;

varying vec3 normal3;
varying vec3 position3;

void main() {
  vec3 direction3 = uLightPosition - position3;
  vec3 reflected3 = reflect(direction3, normalize(normal3));
  vec3 camera3 = -vec3(position3);
  float specular = max(0.0, dot(normalize(reflected3), normalize(camera3)));
  gl_FragColor = ambient * (specular * uMaterialColor);
}
