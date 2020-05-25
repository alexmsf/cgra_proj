class MyAirship extends CGFobject {

    constructor(scene) {

        super(scene);
        this.body = new MySphere(this.scene, 20, 20);
        this.tailpiece = new MyTailpiece(this.scene);
        this.helice = new MyHelice(this.scene);
        this.autopilot = false;
        this.heliceAngle = 0;
        
        this.flag = new MyFlag(this.scene);
        this.thread = new MyCylinder(this.scene, 10);

        this.thread_mat = new CGFappearance(this.scene);
        this.thread_mat.setAmbient(0.7, 0.7, 0.7, 1);
        this.thread_mat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.thread_mat.setShininess(10);
        this.thread_mat.loadTexture('images/black.png');
        this.thread_mat.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(velocity){
        this.heliceAngle += ((Math.PI/10) * velocity*10);
    }

    updateFlag(t, velocity){
        this.flag.update(t, velocity);
    }

    threadDisplay() {
        this.scene.pushMatrix();
        this.thread_mat.apply();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0, -3.75, 0.73);
        this.scene.scale(0.025, 2.5, 0.025);
        this.thread.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0, -3.75, -0.73);
        this.scene.scale(0.025, 2.5, 0.025);
        this.thread.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    display(){
        //AIRSHIP MAIN BODY
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.body.display();
        this.scene.popMatrix();

        //TAILPIECE UP
        this.scene.pushMatrix();
        this.scene.translate(0, 0.55, -2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        if (this.autopilot)
            this.scene.rotate(-Math.PI/6, 1, 0, 0); //autopilot goes right
        else {
            if (this.scene.gui.isKeyPressed("KeyD")) // right
                this.scene.rotate(-Math.PI/6, 1, 0, 0);
            if (this.scene.gui.isKeyPressed("KeyA")) //left
                this.scene.rotate(Math.PI/6, 1, 0, 0);
        }
        this.scene.scale(0.40, 0.40, 0.40);
        this.tailpiece.display();
        this.scene.popMatrix();

        //TAILPIECE DOWN 
        this.scene.pushMatrix();
        this.scene.translate(0, -0.55, -2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        if (this.autopilot)
            this.scene.rotate(-(Math.PI/6), 1, 0, 0); //autopilot goes right
        else {
            if (this.scene.gui.isKeyPressed("KeyD")) //right
                this.scene.rotate(-(Math.PI/6), 1, 0, 0);
            if (this.scene.gui.isKeyPressed("KeyA")) //left
                this.scene.rotate(Math.PI/6, 1, 0, 0);
        }
        this.scene.scale(0.40, 0.40, 0.40);
        this.tailpiece.display();
        this.scene.popMatrix();

        //TAILPIECE LEFT
        this.scene.pushMatrix();
        this.scene.translate(0.55, 0.0, -2);
        this.scene.rotate((Math.PI/2),1,0,0);
        this.scene.rotate((Math.PI),0,1,0);
        this.scene.scale(0.40, 0.40, 0.40);
        this.tailpiece.display();
        this.scene.popMatrix();

        //TAILPIECE RIGHT
        this.scene.pushMatrix();
        this.scene.translate(-0.55, 0.0, -2);
        this.scene.rotate((Math.PI/2),1,0,0);
        this.scene.rotate((Math.PI),0,1,0);
        this.scene.scale(0.40, 0.40, 0.40);
        this.tailpiece.display();
        this.scene.popMatrix();

        //GONDOLA
        this.scene.pushMatrix();
        this.scene.translate(0, -1.05, 0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25, 0.70, 0.25);
        this.body.display();
        this.scene.popMatrix();

        //GONDOLA CARRYING THE HELICES
        this.scene.pushMatrix();
        this.scene.translate(0.15, -1.05, -0.60);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.08, 0.15, 0.08);
        this.body.display();
        this.scene.popMatrix();

        //HELICE
        this.scene.pushMatrix();
        this.scene.translate(0.15,-1.05,-0.7);
        this.scene.scale(0.25,0.15,0.25);
        this.scene.rotate(this.heliceAngle/10,0,0,1);
        this.helice.display();
        this.scene.popMatrix();

        //FLAG
        this.scene.pushMatrix();
        this.flag.display();
        this.scene.popMatrix();

        //THREAD
        this.scene.pushMatrix();
        this.threadDisplay();
        this.scene.popMatrix();

    }
}