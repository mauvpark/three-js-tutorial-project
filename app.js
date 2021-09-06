// Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
	container = document.querySelector(".scene");

	// Create scene
	scene = new THREE.Scene();

	// FOV is How much camera sees: angle
	const fov = 35;
	const aspect = container.clientWidth / container.clientHeight;
	// How near and far can see an object: Meter(0.1m, 500m)
	const near = 0.1;
	const far = 500;

	// Camera setup
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(-5, 3, 25);

	const ambient = new THREE.AmbientLight(0x404040, 3);
	scene.add(ambient);

	const light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(10, 10, 10);
	scene.add(light);

	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	// Load Model
	let loader = new THREE.GLTFLoader();
	loader.load("./house/scene.gltf", function (gltf) {
		scene.add(gltf.scene);
		house = gltf.scene.children[0];
		animate();
	});
}

function animate() {
	// Run this function repeatedly
	requestAnimationFrame(animate);
	house.rotation.z += 0.005;
	renderer.render(scene, camera);
}

init();

function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
