// Precision seems mandatory in webgl
precision highp float;

// 1. Attributes and uniforms sent by p5.js

// Vertex attributes and some uniforms are sent by
// p5.js following these naming conventions:
// https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md

// 1.1. Attributes
// vertex position attribute
attribute vec3 aPosition;

// vertex texture coordinate attribute
attribute vec2 aTexCoord;

// vertex color attribute
attribute vec4 aVertexColor;

// 1.2. Matrix uniforms

// The vertex shader should project the vertex position into clip space:
// vertex_clipspace = vertex * projection * view * model (see the gl_Position below)
// Details here: http://visualcomputing.github.io/Transformations

// Either a perspective or an orthographic projection
// Its value may be set with the perspective and ortho commands
uniform mat4 uProjectionMatrix;

// modelview = view * model
// Its value may be set the camera, translate, rotate, scale, push, pop commands
uniform mat4 uModelViewMatrix;

// the transform group of commands also set the:
// uniform uModelViewProjectionMatrix
// uniform uNormalMatrix

// B. varying variable names are defined by the shader programmer:
// vertex color
varying vec4 color4;

// vertex texcoord
varying vec2 texcoords2;

void main() {
  // copy / interpolate color
  color4 = aVertexColor;
  // copy / interpolate texcoords
  texcoords2 = aTexCoord;
  // vertex projection into clipspace
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}