// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;

vec4 color1;
vec4 color2;


void main() {
  // Observe:
  // 1. All colors are normalized thus vec3(1.0, 1.0, 1.0) gives white
  // which is the same as vec3(1.0). See:
  // https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Vector_constructors
  // 2. Use always the decimal digit as in vec3(0.1412, 0.1176, 0.1176). Doing it otherwise
  // could lead to errors.
  // 3. color4.rgb builds a vec3 with the first three components of color4
  // (which is a vec4) this is refer to as 'swizzling'
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  //color1 = vec4(0.9922, 0.9922, 0.0118, 1.0);
  //color2 = vec4(0.6235, 0.6745, 1.0, 1.0);
  
  
  gl_FragColor = color2 * color1;
}