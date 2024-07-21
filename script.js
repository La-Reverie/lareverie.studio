document.fonts.ready.then(function () {
    document.getElementById("loadingText").style.visibility = "visible";
});


document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalContent = document.getElementById("modalContent");

    openModalBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("hidden");
        setTimeout(() => {
            modalContent.classList.remove("opacity-0", "scale-110");
            modalContent.classList.add("opacity-100", "scale-100");
        }, 10);
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalContent.classList.remove("opacity-100", "scale-100");
            modalContent.classList.add("opacity-0", "scale-110");
            setTimeout(() => {
                modalOverlay.classList.add("hidden");
            }, 300);
        }
    });
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
                fadein.style.display = "none";
            }, 500);


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
    const camera = new BABYLON.ArcRotateCamera("Camera", 4.0791167928197, 1.7522629826720575, 64.81644605989501, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

// Deshabilitar la capacidad de hacer zoom
camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;

// Deshabilitar la capacidad de moverse verticalmente
camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta;

    // Crear y configurar el pipeline de renderizado con profundidad de campo
const pipeline = new BABYLON.DefaultRenderingPipeline(
    "defaultPipeline", // El nombre del pipeline
    true, // Utilizar textura HDR
    scene, // La instancia de la escena
    [camera] // La lista de cámaras a las que se adjuntará
);

// Habilitar y configurar Depth of Field
pipeline.depthOfFieldEnabled = true;
pipeline.depthOfFieldBlurLevel = BABYLON.DepthOfFieldEffectBlurLevel.Medium; // Puedes cambiar a Low, Medium o High
pipeline.depthOfField.focalLength = 18; // Ajustar según sea necesario
pipeline.depthOfField.fStop = 1.4; // Ajustar según sea necesario
pipeline.depthOfField.focusDistance = 2200; // Ajustar según sea necesario







// Crear y añadir el efecto de viñeta
const vignettePostProcess = new BABYLON.ImageProcessingPostProcess(
    "Vignette", // Nombre del proceso
    1.0, // Ratio de la textura
    camera // Cámara a la que se aplica el post proceso
);

// Configurar los parámetros del viñeteado
vignettePostProcess.imageProcessingConfiguration.vignetteEnabled = true;
vignettePostProcess.imageProcessingConfiguration.vignetteColor = new BABYLON.Color4(2, 2, 2, 1);
vignettePostProcess.imageProcessingConfiguration.vignetteWeight = 1.5; // Intensidad del viñeteado
vignettePostProcess.imageProcessingConfiguration.vignetteStretch = 1; // Estiramiento del viñeteado
vignettePostProcess.imageProcessingConfiguration.vignetteCentreX = 0.0; // Centro del viñeteado en X
vignettePostProcess.imageProcessingConfiguration.vignetteCentreY = 0.0; // Centro del viñeteado en Y






    // Crear una luz hemisférica
    const hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, -10, 5), scene);
    hemisphericLight.intensity = 0.05; 

    // Añadir una luz puntual para el sol
    const sunLight = new BABYLON.DirectionalLight("sunLight", new BABYLON.Vector3(-100, 0, 0), scene);
    sunLight.intensity = 6;


    // Crear una esfera visible en la posición de la luz puntual
const lightSphere = BABYLON.MeshBuilder.CreateSphere("lightSphere", { diameter: 2 }, scene);
lightSphere.position = sunLight.position;

// Opcional: añadir un material a la esfera para que sea más visible
const lightSphereMaterial = new BABYLON.StandardMaterial("lightSphereMaterial", scene);
lightSphereMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Color rojo
lightSphere.material = lightSphereMaterial;

    // Crear el efecto "God Rays" (dispersión volumétrica de luz)
    const godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

    // Aplicar la textura deseada, posición y escala
    godrays.mesh.material.diffuseTexture = new BABYLON.Texture('sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
    godrays.mesh.material.diffuseTexture.hasAlpha = true;
    godrays.mesh.position = new BABYLON.Vector3(200, 150, 150);
    godrays.mesh.scaling = new BABYLON.Vector3(350, 350, 350);

    // sunLight.position = godrays.mesh.position;

    // Crear un domo fotográfico 360
    const photoDome = new BABYLON.PhotoDome(
        "photoDome",
        "./eso0932a.jpg",
        {
            resolution: 32,
            size: 1000
        },
        scene
    );
    console.log("PhotoDome created:", photoDome);

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

        // Ocultar la pantalla de carga personalizada
        engine.hideLoadingUI();


        







        




        



        // Después de cargar el modelo GLB y antes de ocultar la pantalla de carga personalizada

// Verificar soporte de GPU para partículas
const useGPUParticles = engine.getCaps().supportComputeShaders;

// Crear un sistema de partículas basado en GPU o CPU según disponibilidad
let particleSystem;

if (useGPUParticles) {
    // Sistema de partículas basado en GPU
    particleSystem = new BABYLON.GPUParticleSystem("particles", { capacity: 6000 }, scene);

    // Textura de las partículas (puedes usar una textura de estrella o punto blanco)
    particleSystem.particleTexture = new BABYLON.Texture("./flare.png", scene);

    // Emisor de partículas (una esfera en el centro del modelo)
    particleSystem.emitter = planetGroup; // El nodo de transformación del planeta
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Volumen de emisión mínimo
    particleSystem.maxEmitBox = new BABYLON.Vector3(250, 250, 250); // Volumen de emisión máximo

    // Configurar el tamaño de las partículas
    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 0.4;

    // Configurar el tiempo de vida de las partículas para que duren "eternamente"
    particleSystem.minLifeTime = 99999999;
    particleSystem.maxLifeTime = 99999999;

    // Configurar el ángulo de emisión para que las partículas no se muevan
    particleSystem.emitRate = 6000;

    // Configurar las direcciones de emisión para que las partículas no se muevan
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);

    // Configurar el color de las partículas
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0);

    // Configurar la gravedad de las partículas para que no se muevan
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Configurar la velocidad de las partículas para que no se muevan
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.updateSpeed = 0.01;

    // Emitir todas las partículas de una vez
    particleSystem.manualEmitCount = particleSystem.getCapacity();
} else {
    // Sistema de partículas basado en CPU
    particleSystem = new BABYLON.ParticleSystem("particles", 3000, scene);

    // Textura de las partículas (puedes usar una textura de estrella o punto blanco)
    particleSystem.particleTexture = new BABYLON.Texture("./flare.png", scene);

    // Emisor de partículas (una esfera en el centro del modelo)
    particleSystem.emitter = planetGroup; // El nodo de transformación del planeta
    particleSystem.emitter = new BABYLON.Vector3(-50, -50, -50); // Posición central del modelo
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Volumen de emisión mínimo
    particleSystem.maxEmitBox = new BABYLON.Vector3(150, 150, 150); // Volumen de emisión máximo

    // Configurar el tamaño de las partículas
    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 0.4;

    // Configurar el tiempo de vida de las partículas para que duren "eternamente"
    particleSystem.minLifeTime = 99999999;
    particleSystem.maxLifeTime = 99999999;

    // Configurar el ángulo de emisión para que las partículas no se muevan
    particleSystem.emitRate = 0;

    // Configurar las direcciones de emisión para que las partículas no se muevan
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);

    // Configurar el color de las partículas
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0);

    // Configurar la gravedad de las partículas para que no se muevan
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Configurar la velocidad de las partículas para que no se muevan
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.updateSpeed = 0.01;

    // Emitir todas las partículas de una vez
    particleSystem.manualEmitCount = particleSystem.getCapacity();
}

particleSystem.start();














    }, null, function (scene, message, exception) {
        console.error("Error al cargar el archivo GLB:", message, exception);
        engine.hideLoadingUI(); // Ocultar la pantalla de carga incluso si hay un error
    });

    // Animar la cámara alrededor del eje Y
    scene.registerBeforeRender(function () {
        camera.alpha += 0.001; // Ajusta la velocidad de rotación aquí
    });

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