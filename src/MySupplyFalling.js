class MySupplyFalling extends CGFobject {

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
        //Display the plane that faces front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces up
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.supplyBoxMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces down
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
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