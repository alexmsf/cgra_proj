class MyHelice extends CGFobject {

    constructor(scene) {
        super(scene);
        this.half = new MySphere(scene,20,20);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.5,0.01);
        this.scene.translate(0,1,0);
        this.half.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.5,0.01);
        this.scene.translate(0,-1,0);
        this.half.display();
        this.scene.popMatrix();

    }
}