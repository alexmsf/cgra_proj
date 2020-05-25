attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float update;

varying vec2 vTextureCoord;

void main() {
    vec3 offset = vec3 (0.0,0.0,update);
	
	vTextureCoord = aTextureCoord;

    offset.z = 0.1 * sin(vTextureCoord.s * 5.0 + update);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}