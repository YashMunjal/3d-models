let scene, camera, renderer, controls, model, hemiLight, spotLight;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 25, 25);
    //camera.zoom=0.1;
    //scene.add(new THREE.AxesHelper(500));
    renderer = new THREE.WebGLRenderer({antialias:true});
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //set up lights : hemispherical light

    hemiLight = new THREE.HemisphereLight();
    scene.add(hemiLight);

    //set up lights : spot lights

    spotLight = new THREE.SpotLight(0xffa95c, 4);
    //spotLight.castShadow = true;
    scene.add(spotLight);

    //tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    //model upload
    renderer.shadowMap.enabled = true;


    new THREE.GLTFLoader().load('model/scene.gltf', result => {
        model = result.scene.children[0];
        model.scale.setScalar(0.8);
        //sahdow fix
        model.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                n.material.transparent=false;
                if (n.material.map) n.material.map.anisotropy = 16;
            }
        });
        spotLight.shadow.bias = -0.0001;
        spotLight.shadow.mapSize.width = 1024 * 4;
        spotLight.shadow.mapSize.height = 1024 * 4;
        scene.add(model);
        animate();
    });
    animate();
}

function animate() {
    renderer.render(scene, camera);
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );

    requestAnimationFrame(animate);
}
init();