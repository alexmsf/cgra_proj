class MyUnitCubeQuad extends CGFobject{

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);

        this.initMaterial();

    }

    initMaterial(){
        this.scene.pushMatrix();
        this.unitCubeFrontMaterial = new CGFappearance(this.scene);
        this.unitCubeFrontMaterial.loadTexture("images/split_cubemap/front.png");
        this.unitCubeFrontMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeFrontMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeFrontMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeFrontMaterial.setShininess(10.0);
        //this.unitCubeFrontMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.unitCubeBackMaterial = new CGFappearance(this.scene);
        this.unitCubeBackMaterial.loadTexture("images/split_cubemap/back.png");
        this.unitCubeBackMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeBackMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeBackMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeBackMaterial.setShininess(10.0);
        //this.unitCubeBackMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.unitCubeLeftMaterial = new CGFappearance(this.scene);
        this.unitCubeLeftMaterial.loadTexture("images/split_cubemap/left.png");
        this.unitCubeLeftMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeLeftMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeLeftMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeLeftMaterial.setShininess(10.0);
        //this.unitCubeLeftMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.unitCubeRightMaterial = new CGFappearance(this.scene);
        this.unitCubeRightMaterial.loadTexture("images/split_cubemap/right.png");
        this.unitCubeRightMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeRightMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeRightMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeRightMaterial.setShininess(10.0);
        //this.unitCubeRightMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.unitCubeBottomMaterial = new CGFappearance(this.scene);
        this.unitCubeBottomMaterial.loadTexture("images/split_cubemap/bottom.png");
        this.unitCubeBottomMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeBottomMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeBottomMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeBottomMaterial.setShininess(10.0);
        //this.unitCubeBottomMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.unitCubeTopMaterial = new CGFappearance(this.scene);
        this.unitCubeTopMaterial.loadTexture("images/split_cubemap/top.png");
        this.unitCubeTopMaterial.setAmbient(4, 4, 4, 1);
        this.unitCubeTopMaterial.setDiffuse(0, 0, 0, 1);
        this.unitCubeTopMaterial.setSpecular(0, 0, 0, 1);
        this.unitCubeTopMaterial.setShininess(10.0);
        //this.unitCubeTopMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.scene.popMatrix();
    }

	display(){
        this.scene.pushMatrix();
        this.scene.scale(50, 50, 50);
        //Display the plane that faces front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.unitCubeFrontMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
          );
        this.quad.display();
        this.scene.popMatrix();

        //Display the plane that faces back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.unitCubeBackMaterial.apply();
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
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.unitCubeRightMaterial.apply();
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
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.unitCubeLeftMaterial.apply();
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
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.unitCubeTopMaterial.apply();
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
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.unitCubeBottomMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
          );
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }

    changeUnitCubeMapTexture() {
      if (this.scene.textureList == 0) {
        this.unitCubeFrontMaterial.loadTexture("images/split_cubemap/front.png");
        this.unitCubeBackMaterial.loadTexture("images/split_cubemap/back.png");
        this.unitCubeLeftMaterial.loadTexture("images/split_cubemap/left.png");
        this.unitCubeRightMaterial.loadTexture("images/split_cubemap/right.png");
        this.unitCubeBottomMaterial.loadTexture("images/split_cubemap/bottom.png");
        this.unitCubeTopMaterial.loadTexture("images/split_cubemap/top.png");
      }
      if (this.scene.textureList == 1) {
        this.unitCubeFrontMaterial.loadTexture("images/split_cubemap_forest/front.png");
        this.unitCubeBackMaterial.loadTexture("images/split_cubemap_forest/back.png");
        this.unitCubeLeftMaterial.loadTexture("images/split_cubemap_forest/left.png");
        this.unitCubeRightMaterial.loadTexture("images/split_cubemap_forest/right.png");
        this.unitCubeBottomMaterial.loadTexture("images/split_cubemap_forest/bottom.png");
        this.unitCubeTopMaterial.loadTexture("images/split_cubemap_forest/top.png");
      }
    }

}
