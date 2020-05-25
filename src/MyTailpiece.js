class MyTailpiece extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5,1,1);
        this.scene.rotate(-(3*Math.PI/4),0,0,1);
        //this.scene.rotate(-(Math.PI/2),0,0,1);
        //this.scene.rotate(-(Math.PI/4),0,0,1);
        this.triangle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.70,0);
        this.scene.rotate(-(Math.PI/4),0,0,1);
        this.diamond.display();
        this.scene.popMatrix();
    }
}