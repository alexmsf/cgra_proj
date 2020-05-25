class MyBillboard extends CGFobject{

    constructor(scene) {
        super(scene);

        this.board = new MyPlane(scene, 50);
        this.beam = new MyPlane(scene, 50);
        this.progressBar = new MyPlane(scene, 50);

        this.shader = new CGFshader(this.scene.gl, "shaders/progressBar.vert", "shaders/progressBar.frag");
        this.shader.setUniformsValues({supplies : 0});

        this.suppliesDropped = 0;
        this.initMaterials();
    }

    initMaterials(){
        this.boardMaterial = new CGFappearance(this.scene);
        this.boardMaterial.loadTexture("images/board.png");
        this.boardMaterial.setAmbient(4, 4, 4, 1);
        this.boardMaterial.setDiffuse(0, 0, 0, 1);
        this.boardMaterial.setSpecular(0, 0, 0, 1);
        this.boardMaterial.setShininess(10.0);

        this.beamMaterial = new CGFappearance(this.scene);
        this.beamMaterial.loadTexture("images/beam");
        this.beamMaterial.setAmbient(4, 4, 4, 1);
        this.beamMaterial.setDiffuse(0, 0, 0, 1);
        this.beamMaterial.setSpecular(0, 0, 0, 1);
        this.beamMaterial.setShininess(10.0);
    }

    update(){
        this.shader.setUniformsValues({supplies: ++this.suppliesDropped});
    }

    reset(){
        this.suppliesDropped = 0;
        this.shader.setUniformsValues({supplies: 0});
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(-10, 3, -10);
        this.scene.rotate(Math.PI/3, 0, 1, 0);

        
        this.scene.pushMatrix();
        this.boardMaterial.apply();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beamMaterial.apply();
        this.scene.translate(-0.7, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.beam.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.7, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.beam.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, 0.1);
        this.scene.scale(1.5, 0.2, 1);
        this.progressBar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}