// var THREE = require('../../node_modules/three');
import * as THREE from '../../node_modules/three';


function logo ()
{

    var fontsAr =
                    [
                        // "/threeJS/Knewave_Regular.json",
                        "/threeJS/Lethal_Injector_Bold_Regular.json",
                        // "/threeJS/SF_Sports_Night_Regular.json",
                        // "/threeJS/Chinese_Asian_Style_Regular.json",
                        // "/threeJS/Gypsy_Curse_Regular.json"
                    ];

    var imgPath = fontsAr[ Math.floor( Math.random()*fontsAr.length) ];//fontsAr[Math.floor(Math.random()*fontsAr.length)]
    var c_text  = 'TestLogo';



    var logoCanvas        = document.querySelector( 'nav > canvas.logo' );
    var k                 = logoCanvas.parentElement.offsetWidth/logoCanvas.parentElement.offsetHeight;
        logoCanvas.height = logoCanvas.parentElement.offsetHeight;
        // logoCanvas.width  = logoCanvas.parentElement.offsetWidth*k;
        logoCanvas.onload = threeD(0, logoCanvas, imgPath, c_text);


    function threeD ( pixels=0 , canvas, imgPath, c_text)
        {
            var colorParent = window.getComputedStyle(canvas.parentElement ).getPropertyValue('background-color');

            var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
                renderer.setClearColor(colorParent);
                renderer.setPixelRatio(window.devicePixelRatio);

            var scene    = new THREE.Scene();
            //--CAMERA--
                var camera   = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.1, 1000 );
                    camera.position.set(0, 0, 295);

            //--LIGHT--
                var light             = new THREE.AmbientLight(0xffffff, 0.5);
                    scene.add(light);
                var pLight            = new THREE.PointLight(0xffff00, 1.9, 950);
                    pLight.position.z = canvas.width/2;
                    pLight.position.y = canvas.height/4;
                    scene.add(pLight);


            //--GEOMETRY--
                function GeometryInst ( rarius= 0, wSegment= 0, hSegment = 0 , color = 0xc4fdff )
                    {
                        this.radius   = rarius;
                        this.wSegment = wSegment;
                        this.hSegment = hSegment;
                        this.color    = color;


                        this.textCreate = function (color = this.color, imgPath, c_text )
                            {
                                this.fontload   = new THREE.FontLoader();
                                this.fontload.load( imgPath,
                                     function ( response )
                                        {
                                            textGeo ( response );
                                        });


                                var textGeo = function ( loadedFont )
                                    {
                                        let options = {
                                                            size  :   canvas.width /canvas.height*23 ,
                                                            height: 10,
                                                            font  : loadedFont,
                                                            bevelThickness: 5,
                                                            bevelSize     : 2,
                                                            bevelSegments : 1,
                                                            bevelEnabled  : true,
                                                            curveSegments : 1,
                                                            steps: 1
                                                        };

                                        let tMaterial  = new THREE.MeshStandardMaterial({
                                                                                            color    : color,
                                                                                            // wireframe:true,
                                                                                            roughness: 0.8,
                                                                                            metalness: 0.2
                                                                                        });
                                        let tGeometry  = new THREE.TextGeometry(c_text, options );
                                            tGeometry.computeBoundingBox();
                                            tGeometry.center();
                                        let text       = new THREE.Mesh( tGeometry, tMaterial );
                                             scene.add( text );
                                    };
                            }
                    };

                //Criate multyple GEOMETRYS

                var textG  = new GeometryInst ( );
                    textG.textCreate('#d6453e', imgPath, c_text);


            function animate ( )
                {
                    requestAnimationFrame(animate);

                    var date = Date.now()*0.0005;

                    camera.position.x =  Math.sin(date)*25 ;
                    pLight.position.x =  camera.position.x;
                    camera.lookAt(new THREE.Vector3(0, 0, 0));

                    renderer.render(scene, camera);
                };
            animate ( );

            function particles ( )
                {
                    var particles        = new THREE.Geometry();
                    var particleMaterial = new THREE.PointsMaterial({ color: 0x161616, size: 5 });
                    var particleSystem   = new THREE.Points(particles, particleMaterial);

                    scene.add(particleSystem);

                    for (var p = 0; p <= 500; p++)
                        {
                            var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
                            particles.vertices.push(particle);
                        }

                    console.log(particles.vertices.length);
                };
            // particles ( );

        };

}

export { logo };