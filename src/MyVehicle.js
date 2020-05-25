class MyVehicle extends CGFobject{

    constructor(scene) {
        super(scene);
        this.airship = new MyAirship(this.scene);

        this.orientation=0;
        this.velocity =0;
        this.position =[0, 10, 0];
        this.positionAP = [0,10,0]
        
        this.autopilotAngle = 0;
        this.centerX = 0;
        this.centerZ = 0;
    }

    turn(val){
        this.orientation+=val;
    }

    accelerate(val) {
        this.velocity += val;
    }

    reset(){
        this.orientation = 0;
        this.velocity = 0;
        this.position[0] = 0;
        this.position[1] = 10;
        this.position[2] = 0;
        this.airship.autopilot = false;
        this.autopilotAngle = 0;
        
    }

    update(t) {
        if (this.airship.autopilot) {
            this.autopilotAngle += 2 * Math.PI * t / 5000.0;
 /**/
            this.positionAP[0] = -5 * Math.cos(this.autopilotAngle) + this.centerX;
            this.positionAP[2] = 5 * Math.sin(this.autopilotAngle) + this.centerZ;

        }
        else {
            this.position[2] += 0.1 * t * this.velocity * Math.cos(this.orientation*Math.PI/180.0);
            this.position[0] += 0.1 * t * this.velocity * Math.sin(this.orientation*Math.PI/180.0);
            this.positionAP[0] = this.position[0];
            this.positionAP[2] = this.position[2];
        }
        this.airship.update(this.velocity);
    }

    updateFlag(t){
        this.airship.updateFlag(t, this.velocity);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]); // update position

        // autopilot
        if (this.airship.autopilot) {
            this.scene.translate(5 * Math.cos(-this.orientation * Math.PI / 180.0), 0, 5 * Math.sin(-this.orientation * Math.PI / 180.0));
            this.scene.rotate(this.autopilotAngle, 0, 1, 0);
            this.scene.translate(-5 * Math.cos(-this.orientation * Math.PI / 180.0), 0, -5 * Math.sin(-this.orientation * Math.PI / 180.0));
        }

        this.scene.rotate(this.orientation*Math.PI/180.0, 0, 1, 0);  // will rotate on itself
        
        this.airship.display();
        this.scene.popMatrix();
    } 
    
    autopilotON() {
        this.airship.autopilot = true;
        this.velocity = 0.1;
        this.autopilotAngle = 0;
        this.centerX = this.position[0] +  5*Math.sin(this.orientation + Math.PI/2);
        this.centerZ = this.position[2] +  5*Math.cos(this.orientation + Math.PI/2);
    }
}
