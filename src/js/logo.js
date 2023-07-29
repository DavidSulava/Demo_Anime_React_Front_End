import * as THREE from 'three';

function Logo(imgPublicPath = '') {
    const fontsAr = [
        // "/threeJS/Knewave_Regular.json",
        `${imgPublicPath}/threeJSFonts/Lethal_Injector_Bold_Regular.json`,
        // "/threeJS/SF_Sports_Night_Regular.json",
        // "/threeJS/Chinese_Asian_Style_Regular.json",
        // "/threeJS/Gypsy_Curse_Regular.json"
    ];

    // const imgPath = fontsAr[Math.floor(Math.random() * fontsAr.length)];//fontsAr[Math.floor(Math.random()*fontsAr.length)]
    const imgPath = fontsAr[0]
    const c_text = 'TestLogo';

    const logoCanvas = document.querySelector('canvas.logo');
    if (!logoCanvas) return

    const k = logoCanvas.parentElement.offsetWidth / logoCanvas.parentElement.offsetHeight;
    logoCanvas.height = logoCanvas.parentElement.offsetHeight;
    logoCanvas.onload = threeD(0, logoCanvas, imgPath, c_text);

    function threeD(pixels = 0, canvas, imgPath, c_text) {
        const colorParent = window.getComputedStyle(canvas.parentElement).getPropertyValue('background-color');

        const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        renderer.setClearColor(colorParent);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        //--CAMERA--
        const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
        camera.position.set(0, 0, 295);

        //--LIGHT--
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const pLight = new THREE.PointLight(0xffff00, 1.9, 950);
        pLight.position.z = canvas.width / 2;
        pLight.position.y = canvas.height / 4;
        scene.add(pLight);


        //--GEOMETRY--
        function GeometryInst(rarius = 0, wSegment = 0, hSegment = 0, color = 0xc4fdff) {
            this.radius = rarius;
            this.wSegment = wSegment;
            this.hSegment = hSegment;
            this.color = color;


            this.textCreate = function (color = this.color, imgPath, c_text) {
                this.fontload = new THREE.FontLoader();
                this.fontload.load(imgPath,
                    function (response) {
                        textGeo(response);
                    });


                const textGeo = function (loadedFont) {
                    const options = {
                        size: canvas.width / canvas.height * 23,
                        height: 10,
                        font: loadedFont,
                        bevelThickness: 5,
                        bevelSize: 2,
                        bevelSegments: 1,
                        bevelEnabled: true,
                        curveSegments: 1,
                        steps: 1
                    };

                    const tMaterial = new THREE.MeshStandardMaterial({
                        color: color,
                        // wireframe:true,
                        roughness: 0.8,
                        metalness: 0.2
                    });
                    const tGeometry = new THREE.TextGeometry(c_text, options);
                    tGeometry.computeBoundingBox();
                    tGeometry.center();
                    const text = new THREE.Mesh(tGeometry, tMaterial);
                    scene.add(text);
                };
            }
        };

        //Criate multyple GEOMETRYS

        const textG = new GeometryInst();
        textG.textCreate('#d6453e', imgPath, c_text);


        function animate() {
            requestAnimationFrame(animate);

            var date = Date.now() * 0.0005;

            camera.position.x = Math.sin(date) * 25;
            pLight.position.x = camera.position.x;
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);
        };
        animate();
    };
}

export {Logo};