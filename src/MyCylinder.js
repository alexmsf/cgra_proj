class MyCylinder extends CGFobject {
    
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis (lados)
     */

    constructor(scene, slices) {
      super(scene);
      this.slices = slices;
  
      this.initBuffers();
    }
  
    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        
        var angulo = 0;
        var delta_angulo = 2*Math.PI/this.slices;
        var textMap = 0;
        var delta_textMap = 1/this.slices;

        /*
        num de slices = num de faces/lados
        todos os vertices têm de ser declarados para cada face, msm se 
        são partilhados -- pq as normais de cada face são diferentes
        */

        for (var i = 0; i<= this.slices; i++){
            
            var sin = Math.sin(angulo); // valor para z
            var cos = Math.cos(angulo); // valor para x

            //cos -- eixo do x
            //-sin -- eixo do z
            // 0 a 1 -- altura de 1 unidade no eixo do y
        
            this.vertices.push(cos, 0, -sin); //face do plano zx
            this.vertices.push(cos, 1, -sin); //face do plano y=1

            /*var normal = [cos, 0, sin];
            var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal[0] /= normalSize;
            normal[2] /= normalSize;
            this.normals.push(...normal);
            this.normals.push(...normal);*/

            //normais das slices de dentro
            /*var normal = [cos, 0, -sin];
            var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal[0] /= normalSize;
            normal[2] /= normalSize;
            this.normals.push(...normal);
            this.normals.push(...normal);*/

            this.normals.push(cos, 0, -sin);
            this.normals.push(cos, 0, -sin);
            //this.normals.push(cos, 0, -sin);
            //normais das slices das extremidades -- o nosso cilindro é sem topos, por isso isto não é necessário
            //this.normals.push(0, (-)1, 0);

            //triangulos ??
            if (i!= 0){
                this.indices.push((i*2),(i*2+1),(i*2-1));
                this.indices.push((i*2),(i*2-1),(i*2-2));
            }

           /* 
            Texture coords (s,t)  ??
            +----------> s
            |
            |
            |
            v
            t
            */
            this.texCoords.push(textMap, 1);
            this.texCoords.push(textMap, 0);
            
            angulo+=delta_angulo;
            textMap += delta_textMap;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }
}