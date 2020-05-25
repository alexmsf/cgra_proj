const SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
};
    
    class MySupply extends CGFobject{

    constructor(scene) {
        super(scene);
        this.falling = new MySupplyFalling(this.scene);
        this.landed = new MySupplyLanded(this.scene);
        this.state = SupplyStates.INACTIVE;
        this.position = [0,0,0];

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

    update() {
        if (this.state === SupplyStates.FALLING){

            this.position[1] -= (0.2);
            if (this.position[1] < 0.2)
                this.land();
        }
    }

    reset(){
        this.state = SupplyStates.INACTIVE;
    }

    land() {
        this.state = SupplyStates.LANDED;
    }

    drop(dropPositionx, dropPositiony, dropPositionz) {
        this.position[0] = dropPositionx;
        this.position[1] = dropPositiony;
        this.position[2] = dropPositionz;
        this.state = SupplyStates.FALLING;
    }

    display() {

        if (this.state == SupplyStates.FALLING) { 

            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]); 
            this.falling.display();
            this.scene.popMatrix();
        }

        if (this.state == SupplyStates.LANDED) { 

            this.scene.pushMatrix();
            this.scene.translate(this.position[0], 0, this.position[2]);
            this.landed.display();
            this.scene.popMatrix();

        }

    }

}
