console.info("Hi, glad that u look to the console. They key to access the rest of this site is in the code, i believe you can find it.. 4DoorsMoreWhores.. | Currently imma avaliable for work so if u lookin for somebody.. HMU !");
 const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    const scene = new THREE.Scene();
    let Mesh;
    let light;
    let directionalLight;
    let lightDensity = 0;
    let lightSwitchClicked = false;

    function init() {
        const container = document.querySelector('.threeContainer');
        scene.background = new THREE.Color('black');
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        camera.position.set( 1, 1, 10 );
        window.addEventListener( 'resize', function() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false);

    }

    function setLight() {
        
        directionalLight = new THREE.DirectionalLight(0xfffffff, lightDensity);
        directionalLight.position.set(0.5, 1.5, 20);
        directionalLight.receiveShadow = true;
        directionalLight.castShadow = true
//        const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        scene.add( directionalLight );
        
        light = new THREE.AmbientLight(0xffffff, lightDensity); // soft white light
        scene.add(light);
    }

    function loadGLTF() {
        let balloonLoader = new THREE.GLTFLoader();

        balloonLoader.load('./model/bee.gltf', (gltf) => {
            Mesh = gltf.scene;
            Mesh.scale.set(0.5,0.5,0.5);
            scene.add(Mesh);
            Mesh.position.x = 0.5;
            Mesh.position.y = 1;
            Mesh.position.z = 3;
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
    editingText()
    document.querySelector('#tlacitko').addEventListener('click', function(){
        lightSwitchClicked = true;
        document.querySelector('.initDialogue h1').classList.add('animateHeader');
        hide('#tlacitko');
        const startShine = setInterval(lightUpRoom, 50);
        console.log(light.intensity);
        function lightUpRoom() {
            if(directionalLight.intensity<0.1){
            console.log(directionalLight.intensity);
            directionalLight.intensity += 0.01;
            light.intensity += 0.1;
            }else{
                clearInterval(startShine);
            }
        }
    });


    document.addEventListener('keydown', (e) => {
        if(e.code=="KeyW"){
            //console.log("w");
            camera.position.x += 1;
        }
        if(e.code=="KeyS"){
            //console.log("s");
            camera.position.x -= 1;
        }
    })

    function editingText() {
        let dots = "";
        const textInterval = setInterval(() => {
            document.querySelector('#dialogueH1').textContent = "Stepan Karlovec - web developer" + dots;
            dots += "."
            if(dots.length>3){
                dots="";
            }
            if(lightSwitchClicked){
                document.querySelector('#dialogueH1').textContent = "Stepan Karlovec - web developer";
                clearInterval(textInterval);

            }
        }, 850);
    }
    function hide(object) {
        document.querySelector(object).classList.add('fadeOut');
    }
    function dissapearLol(object){
        let changingVal = 1;
        const startShine = setInterval(dissapear, 30);
        function dissapear(){
            changingVal -= 0.4;
            document.querySelector(object).style.opacity = changingVal;
            if(changingVal<=0){
                clearInterval(startShine);
            }
        }
        console.log(changingVal);
    }

    document.querySelector("#userAnswer").addEventListener('change', (e) => {
        if(e.target.value.toLowerCase()=="whores"){
            setTimeout(() => {
                e.target.classList.add("animateSuccess");
                e.target.disabled = true;
                setTimeout(() => {
                    document.querySelector('#accessGranted').style.visibility = "inherit";
                    document.querySelector('.skillSetSection').style.display = "inherit";
                }, 2500);
            }, 1200);
        }
        else{
            e.target.style.color = "red";
            setTimeout(() => {
            e.target.style.color = "black";
            }, 1500);
        }
        
    }) 
// scrollTrigger
      function scrollTrigger(selector, options = {}) {
        let els = document.querySelectorAll(selector)
        els = Array.from(els)
        els.forEach(el => {
          addObserver(el, options)
        })
      }
      function addObserver(el, options) {
        // Check if `IntersectionObserver` is supported
        if(!('IntersectionObserver' in window)) {
          // Simple fallback
          // The animation/callback will be called immediately so
          // the scroll animation doesn't happen on unsupported browsers
          if(options.cb){
            options.cb(el)
          } else{
            entry.target.classList.add('active')
          }
          // We don't need to execute the rest of the code
          return
        }
        let observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              if(options.cb) {
                options.cb(el)
              } else{
                entry.target.classList.add('active')
              }
              observer.unobserve(entry.target)
            }
          })
        }, options)
        observer.observe(el)
      }
      // Example usages:
      scrollTrigger('.skillDisplay', {
        cb: function(el){
          setTimeout(() => {
              document.querySelector('.ybarJS').style.width = "60vw";
              document.querySelector('.ybarPHP').style.width = "50vw";
              document.querySelector('.ybarCS').style.width = "30vw";
              document.querySelector('.ybarRN').style.width = "20vw";
              document.querySelector('.ybarHTML').style.width = "50vw";
          }, 1000)
        }
      })