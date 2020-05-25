class MyTerrain extends CGFobject{

    constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(scene, 20);
        
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.heightTexture = new CGFtexture(this.scene, "images/heightmap.jpg");

        this.terrainShader.setUniformsValues({terrain : 0});
        this.terrainShader.setUniformsValues({heightMap : 1});
        
    }
    
    display(){
        this.scene.setActiveShader(this.terrainShader);

        this.terrainTexture.bind(0);
        this.heightTexture.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(50, 8, 50);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        // restore default shader
        this.scene.setActiveShader(this.scene.defaultShader);
    }
	

}