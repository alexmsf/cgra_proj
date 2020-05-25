class MySupplyLanded extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.initMaterial();
    }

    initMaterial(){
        this.supplyBoxMaterial = new CGFappearance(this.scene);
        this.supplyBoxMaterial.loadTexture("images/woodenbox.png");
        this.supplyBoxMaterial.setAmbient(4, 4, 4, 1);
        this.supplyBoxMaterial.setDiffuse(0, 0, 0, 1);
        this.supplyBoxMaterial.setSpecular(0, 0, 0, 1);
        this.supplyBoxMaterial.setShininess(10.0);
    }

    display(){

        this.scene.pushMatrix();
        //1
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
    
        //2
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
    
        //3
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
    
        //4
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
    
        //5
        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        
        //6
        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }

}