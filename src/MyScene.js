/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        
    }
    
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(1000/60); // 60Hz
        this.enableTextures(true);

        //----------Initialize scene objects-----------
        //---------------------------------------------
        this.axis = new CGFaxis(this);
        //----
        this.sphere = new MySphere(this, 16, 8);
        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.loadTexture('images/earth.jpg');
        this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setShininess(10.0);
        this.sphereMaterial.setTextureWrap("REPEAT", "'CLAMP_TO_EDGE");
        //----
        this.cylinder = new MyCylinder(this, 5);
        this.unitCube = new MyUnitCubeQuad(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);

        this.billboard = new MyBillboard(this);
        this.supplies = [
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
        ];
        this.nSuppliesDelivered = 0;
        this.timeAfterDelivery = 200;
        this.timeFlag = 0;

        //----------Objects connected to MyInterface----------
        //----------------------------------------------------

        this.displayAxis = true;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayUnitCubeQuad = false;
        this.displayTerrain = false;
        this.displayVehicle = false;
        this.displayBillboard = false;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.textureList = { // for the UnitCubeMap
            'Fields' : 0,
            'Forest' : 1
        };

        this.lastUpdate = 0;
        
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 60, 20), vec3.fromValues(0, 0, 0));

    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if (this.lastUpdate === 0) //equal in value and in type
            this.lastUpdate = t;
        let elapsedTime = t - this.lastUpdate;
        this.lastUpdate = t;

        this.checkKeys();

        this.timeFlag+=elapsedTime;

        this.vehicle.update(elapsedTime);
        this.vehicle.updateFlag(this.timeFlag);
       
        for(var i = 0; i<this.supplies.length; i++) {
            this.supplies[i].update();
        }
        this.timeAfterDelivery += elapsedTime;
    }

    checkKeys() {

        // Check for key codes e.g. in https://keycode.info/

        var text="Keys pressed: ";
        var keysPressed = false;

        if (!this.vehicle.airship.autopilot) {
            if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.vehicle.accelerate(0.005 * this.speedFactor);
            this.timeFlag = 0;
            }

            if (this.gui.isKeyPressed("KeyS")) {
                text+=" S ";
                keysPressed=true;
                this.vehicle.accelerate(-0.005 * this.speedFactor);
                this.timeFlag = 0;
            }

            if (this.gui.isKeyPressed("KeyA")) {
                text+=" A ";
                keysPressed=true;
                this.vehicle.turn(3);
            }

            if (this.gui.isKeyPressed("KeyD")) {
                text+=" D ";
                keysPressed=true;
                this.vehicle.turn(-3);
            }

            if (this.gui.isKeyPressed("KeyP"))
                this.vehicle.autopilotON();
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset();
            for(var i = 0; i<this.supplies.length; i++) {
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered=0;
            this.billboard.reset();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            keysPressed=true;
            if (this.timeAfterDelivery > 200)
                this.dropSupply();
        }

        if (keysPressed)
            console.log(text);
    }    

    dropSupply(){
        if (this.nSuppliesDelivered<5){
            if(this.vehicle.airship.autopilot) {
                this.supplies[this.nSuppliesDelivered].drop(this.vehicle.positionAP[0], this.vehicle.positionAP[1] - 1.5, this.vehicle.positionAP[2]); 
            }
            else {
                this.supplies[this.nSuppliesDelivered].drop(this.vehicle.position[0], this.vehicle.position[1] - 1.5, this.vehicle.position[2]);
            }
            this.nSuppliesDelivered++;
            this.timeAfterDelivery = 0;
            this.billboard.update();
        }
    }

    changeUnitCubeMapTexture() {
        this.unitCube.changeUnitCubeMapTexture();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.setDefaultAppearance();

        
        // ---- BEGIN Primitive drawing section

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //Draw Vehicle
        if(this.displayVehicle){
            this.pushMatrix();
            var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                0.0, this.scaleFactor, 0.0, 0.0,
                0.0, 0.0, this.scaleFactor, 0.0,
                0.0, 0.0, 0.0, 1.0];

    
            this.multMatrix(sca);
            this.vehicle.display();
            this.popMatrix();
        }

        for(var i = 0; i<this.supplies.length; i++) {
            this.supplies[i].display();
        }
        
        // Draw Sphere
        if (this.displaySphere) {
            this.sphereMaterial.apply();
            this.sphere.display();
        }

        //Draw Cylinder
        if(this.displayCylinder)
            this.cylinder.display();

        //Draw UnitCubeQuad
        if(this.displayUnitCubeQuad){
            this.pushMatrix();
            this.translate(0, 2, 0);
            this.unitCube.display();
            this.popMatrix();
        }
        
        //Draw Terrain
        if(this.displayTerrain){
            this.pushMatrix();
            this.translate(0, -2.5, 0);
            this.terrain.display();
            this.popMatrix();
        }
        if(this.displayBillboard){
            this.pushMatrix();
            this.translate(0, -2.5, 0);
            this.billboard.display();
            this.popMatrix();
        }
    }
}
