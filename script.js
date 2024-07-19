document.fonts.ready.then(function () {
    document.getElementById("loadingText").style.visibility = "visible";
});

class CustomLoadingScreen {
    constructor(loadingUIText) {
        this.loadingUIText = loadingUIText;
    }
    displayLoadingUI() {
        document.getElementById("customLoadingScreen").style.display = "flex";
    }
    hideLoadingUI() {
        const loadingDiv = document.getElementById("customLoadingScreen");
        loadingDiv.classList.add("fade-out");

        loadingDiv.addEventListener("animationend", () => {
            setTimeout(() => {
                loadingDiv.style.display = "none";
            }, 2000); // Añade un retraso de 2 segundos
        });
    }
}

// Obtener el elemento canvas
const canvas = document.getElementById('renderCanvas');

// Generar el motor 3D de Babylon
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

// Configurar la pantalla de carga personalizada
const loadingScreen = new CustomLoadingScreen("La Reverie Studio");
engine.loadingScreen = loadingScreen;

// Mostrar la pantalla de carga personalizada
engine.displayLoadingUI();

// Crear una escena
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Configurar el color de limpieza de la escena a transparente
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Crear una cámara ArcRotate con un radio inicial alejado
    const camera = new BABYLON.ArcRotateCamera("Camera", 4.0791167928197, 1.7522629826720575, 84.81644605989501, new BABYLON.Vector3(0, 0, 0), scene);

    // Crear una luz hemisférica
    const hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 0, 0), scene);

    // Añadir una luz puntual para el sol
    const sunLight = new BABYLON.PointLight("sunLight", new BABYLON.Vector3(0, 0, 0), scene);

    // Cargar el modelo GLB
    BABYLON.SceneLoader.Append("./", "principito.glb", scene, function (scene) {
        console.log("Archivo GLB cargado exitosamente");
        console.log("Nodos cargados:", scene.rootNodes);

        // Crear un nodo de transformación padre para el planeta
        const planetGroup = new BABYLON.TransformNode("planetGroup", scene);

        // Adjuntar todos los nodos que forman parte del planeta al nodo padre
        scene.rootNodes.forEach(node => {
            console.log("Nombre del nodo:", node.name);
            node.parent = planetGroup;
        });

        console.log("Nodo PlanetGroup:", planetGroup);

        // Asegurar que el nodo padre sea visible y registrar sus propiedades iniciales
        planetGroup.isVisible = true;
        console.log("Rotación inicial:", planetGroup.rotation);
        console.log("Posición inicial:", planetGroup.position);

        // Crear una animación de rotación
        const idleRotation = new BABYLON.Animation("idleRotation", "rotation.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keys = [];
        keys.push({ frame: 0, value: 0 });
        keys.push({ frame: 1000, value: 2 * Math.PI });
        idleRotation.setKeys(keys);

        planetGroup.animations = [idleRotation];
        console.log("Animación creada y asignada a PlanetGroup");

        const animation = scene.beginAnimation(planetGroup, 0, 1000, true);
        console.log("Animación de rotación iniciada", animation);

        // Ocultar la pantalla de carga personalizada
        engine.hideLoadingUI();

    }, null, function (scene, message, exception) {
        console.error("Error al cargar el archivo GLB:", message, exception);
        engine.hideLoadingUI(); // Ocultar la pantalla de carga incluso si hay un error
    });

    // Crear el efecto "God Rays" (dispersión volumétrica de luz)
    const godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

    // Aplicar la textura deseada, posición y escala
    godrays.mesh.material.diffuseTexture = new BABYLON.Texture('sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
    godrays.mesh.material.diffuseTexture.hasAlpha = true;
    godrays.mesh.position = new BABYLON.Vector3(-150, 150, 150);
    godrays.mesh.scaling = new BABYLON.Vector3(350, 350, 350);

    sunLight.position = godrays.mesh.position;

    return scene;
};

// Llamar a la función createScene
const scene = createScene();

// Registrar un bucle de renderizado para renderizar la escena repetidamente
engine.runRenderLoop(function () {
    scene.render();
});

// Escuchar eventos de redimensionamiento del navegador/lienzo
window.addEventListener("resize", function () {
    engine.resize();
});