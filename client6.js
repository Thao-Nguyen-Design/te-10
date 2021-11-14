import * as THREE from "./build/three.module.js";

// Import add-ons for glTF models, orbit controls, and font loader
import {
  OrbitControls
} from "./src/OrbitControls.js";
import {
  GLTFLoader
} from "./src/GLTFLoader.js";
import {
  FontLoader
} from "./src/FontLoader.js"

let container, scene, camera, renderer, mesh1, mesh2, mixer, controls, clock;


const start = Date.now();


// Call init and animate functions (defined below)
init();
animate();

function init() {

  //Identify div in HTML to place scene
  container = document.getElementById("space");

  //Crate clock for animation
  clock = new THREE.Clock();

  //Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xe6bdcb);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  // Add scene to index.html
  container.appendChild(renderer.domElement);


  const loader1 = new GLTFLoader().load(
    "./assets/donut_noPlane.glb",
    function(gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      // gltf.scene.traverse(function(child) {
      //   if (child.isMesh) {
          // child.material = newMaterial2;
      //   }
      // });
      // set position and scale
      mesh1 = gltf.scene;
      mesh1.position.set(4, 0, 0);
      mesh1.rotation.set(0, 0, 0);
      mesh1.scale.set(20, 20, 20);
      // Add model to scene
      scene.add(mesh1);

    },
    undefined,
    function(error) {
      console.error(error);
    }
  );


  // Material to be added to static model
  // var newMaterial2 = new THREE.MeshStandardMaterial({
  //   color: 0x6E2E99
  // });

  // Load model 2, add material, and add it to the scene
  const loader2 = new GLTFLoader().load(
    "./assets/donut_noPlane.glb",
    function(gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      // gltf.scene.traverse(function(child) {
      //   if (child.isMesh) {
          // child.material = newMaterial2;
      //   }
      // });
      // set position and scale
      mesh2 = gltf.scene;
      mesh2.position.set(-4, 0, 0);
      mesh2.rotation.set(0, 0, 0);
      mesh2.scale.set(20, 20, 20);
      // Add model to scene
      scene.add(mesh2);

    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

  // Add Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 50;
  controls.target.set(0, 0, -0.2);

  // Position our camera so we can see the shape
  camera.position.z = 30;

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

 // Add Text under models
 // const loader3 = new FontLoader();
	// 			loader3.load( './assets/helvetiker_regular.typeface.json', function ( font ) {
 //          // Define font color
	// 				const color = 0x2E5999;
 //          // Define font material
	// 				const matDark = new THREE.LineBasicMaterial( {
	// 					color: color,
	// 					side: THREE.DoubleSide
	// 				} );
 //          // Generate and place left side text
	// 				const message = "Static Model";
	// 				const shapes = font.generateShapes( message, .5 );
	// 				const geometry = new THREE.ShapeGeometry( shapes );
	// 				geometry.computeBoundingBox();
	// 				const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
	// 				geometry.translate( xMid, 0, 0 );
	// 				const text = new THREE.Mesh( geometry, matDark );
 //          text.position.set(-4, -4 , 0);
	// 				scene.add( text );
 //
 //          // Generate and place right side text
 //          const message2 = "Preanimated Model";
	// 				const shapes2 = font.generateShapes( message2, .5 );
	// 				const geometry2 = new THREE.ShapeGeometry( shapes2 );
	// 				geometry2.computeBoundingBox();
	// 				const xMid2 = - 0.5 * ( geometry2.boundingBox.max.x - geometry2.boundingBox.min.x );
	// 				geometry2.translate( xMid2, 0, 0 );
	// 				const text2 = new THREE.Mesh( geometry2, matDark );
 //          text2.position.set(4, -4 , 0);
	// 				scene.add( text2 );
 //        });
}

// Define animate loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  render();
}

// Define the render loop
function render() {
  renderer.render(scene, camera);
  animation1();
  animation2();
}

//animation for mesh1
function animation1() {
  const timer = Date.now() - start;
  mesh1.position.y = Math.abs( Math.sin( timer * 0.002 )) * 3;

}


//animation for mesh2
function animation2() {
  mesh2.rotation.x += 0.1;
  mesh2.rotation.z += 0.1;
  mesh2.rotation.y += 0.1;
}

// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  render();
}
