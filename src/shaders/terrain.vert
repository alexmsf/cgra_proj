
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D heightMap;
uniform sampler2D terrain;

void main() {
	vTextureCoord = aTextureCoord;

	 vec3 offset = aVertexNormal * texture2D(heightMap, vec2(0.0,0.1)+vTextureCoord).b * 0.35;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
