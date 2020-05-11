let scene, camera, renderer, controls, model, hemiLight, spotLight;
function init() {
    scene = new THREE.Scene();

    scene.background = new THREE.CubeTextureLoader()
	.setPath( 'model/' )
	.load( [
        'posx.jpg',
        'negx.jpg',
        'posy.jpg',
        'negy.jpg',
        'posz.jpg',
        'negz.jpg',
        
		
	] );

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(200, 155, 155);
    camera.zoom = 0.5;
    //scene.add(new THREE.AxesHelper(500));
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //set up lights : hemispherical light

    hemiLight = new THREE.HemisphereLight();
    scene.add(hemiLight);

    //set up lights : spot lights

    spotLight = new THREE.SpotLight(0xffa95c, 18);
    //spotLight.castShadow = true;
    spotLight.position.set(-10, -10, -10);
    scene.add(spotLight);

    //tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    //model upload
    renderer.shadowMap.enabled = true;

    //add button listeners

    new THREE.GLTFLoader().load(`model/model2/scene.gltf`, result => {
        model = result.scene.children[0];
        model.scale.setScalar(0.8);
        model.position.set(0, 0, -35);

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