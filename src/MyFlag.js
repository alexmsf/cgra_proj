class MyFlag extends CGFobject {
    
    constructor(scene) {
        super(scene);
        this.flag = new MyPlane(this.scene, 40, true);
        this.initMaterial(this.scene);
    }

    initMaterial(scene) {
        this.text = new CGFappearance(this.scene);
        this.text.setAmbient(0.1, 0.1, 0.1, 1);
        this.text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.text.setSpecular(0.0, 0.0, 0.0, 1);
        this.text.setShininess(10.0);
        this.text.loadTexture('images/flag.png');
        this.text.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ update: 0 });
    }

    update(time, speed) {
        if (speed === 0) this.shader.setUniformsValues({update: time*0.001});
        else this.shader.setUniformsValues( { update:  speed * time * 0.1});
    }


    display() {
        // activate selected shader
        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.5, 3, 1.5);
        this.scene.translate(0, -1.75, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        
        this.text.apply();
        this.flag.display();
        
        this.scene.popMatrix();

        // restore default shader
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}