const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    const scene = new THREE.Scene();
    let Mesh;
    let light;
    let directionalLight;

    function init() {
        scene.background = new THREE.Color('black');
        camera.position.set(0, 10, 20);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);
    }

    function setLight() {
        directionalLight = new THREE.DirectionalLight(0xfffffff, 0.3, 1000);
        directionalLight.position.set(0, 10, 5);
        directionalLight.receiveShadow = true;
        directionalLight.castShadow = true
        directionalLight
        const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        //scene.add( directionalLight );
        light = new THREE.AmbientLight(0xffffff, 0.5, 1000); // soft white light
        scene.add(light);
    }

    function loadGLTF() {
        let balloonLoader = new THREE.GLTFLoader();

        balloonLoader.load('./model/bee.gltf', (gltf) => {
            Mesh = gltf.scene;
            Mesh.scale.set(0.2,0.2,0.2);
            scene.add(Mesh);
            Mesh.position.x = 0;
            Mesh.position.y = 10;
            Mesh.position.z = 15;
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        if (Mesh && Mesh.rotation) {
            Mesh.rotation.y -= 0.005;
        }
        renderer.render(scene, camera);
    }

    init();
    setLight();
    loadGLTF();
    animate();

    document.addEventListener('keydown', (e) => {
        if(e.code=="KeyW"){
            Mesh.position.x += 0.01;
        }
        if(e.code=="KeyS"){
            Mesh.position.x -= 0.01;
        }
    })