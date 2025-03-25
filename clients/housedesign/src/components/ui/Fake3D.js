import React, { useEffect, useRef } from 'react';

export default function Fake3D({ image, depthMap }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, `
            attribute vec2 a_position;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0, 1);
                v_texCoord = a_position * 0.5 + 0.5;
            }
        `);

        gl.shaderSource(fragmentShader, `
            precision highp float;
            uniform sampler2D u_image;
            uniform sampler2D u_imagedepth;
            uniform vec2 u_mouse;
            uniform float u_progresshover;
            varying vec2 v_texCoord;

            void main() {
                vec2 uv = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
                vec4 depth = texture2D(u_imagedepth, uv);
                float parallaxMult = depth.r;
                
                // Ajustar el parallax para un efecto más suave y controlado
                vec2 parallax = u_mouse * (0.3 - parallaxMult) * 0.006;
                
                // Aplicar el offset manteniendo los límites de la textura
                vec2 finalUV = clamp(uv + parallax, 0.0, 5.0);
                vec4 original = texture2D(u_image, finalUV);
                gl_FragColor = original;
            }
        `);

        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const loadTexture = (url) => {
            return new Promise((resolve) => {
                const image = new Image();
                image.src = url;
                image.onload = () => {
                    const texture = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    resolve(texture);
                };
            });
        };

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const lerp = (start, end, t) => start * (1 - t) + end * t;

        Promise.all([
            loadTexture(image),
            loadTexture(depthMap)
        ]).then(([imageTexture, depthTexture]) => {
            // Obtener las ubicaciones de los uniforms después de usar el programa
            gl.useProgram(program);
            const imageLocation = gl.getUniformLocation(program, 'u_image');
            const depthLocation = gl.getUniformLocation(program, 'u_imagedepth');
            const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
            const progressLocation = gl.getUniformLocation(program, 'u_progresshover');
        
            if (!mouseLocation) {
                console.warn('Mouse location uniform not found');
                return;
            }
        
            // Configurar los uniforms iniciales
            gl.uniform1i(imageLocation, 0);
            gl.uniform1i(depthLocation, 1);
            gl.uniform1f(progressLocation, 1.0);
            gl.uniform2f(mouseLocation, 0, 0);
        
            const render = () => {
                mouseX = lerp(mouseX, targetX, 0.1);
                mouseY = lerp(mouseY, targetY, 0.1);
        
                // Asegurarse de que el programa esté en uso antes de actualizar uniforms
                gl.useProgram(program);
                
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, imageTexture);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        
                gl.uniform2f(mouseLocation, mouseX, mouseY);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                requestAnimationFrame(render);
            };

            const handleMouseMove = (e) => {
                const rect = canvas.getBoundingClientRect();
                targetX = (e.clientX - rect.left) / canvas.width * 2 - 1;
                targetY = 1 - (e.clientY - rect.top) / canvas.height * 2;
            };

            const resize = () => {
                const img = new Image();
                img.src = image;
                img.onload = () => {
                    const imageAspect = img.width / img.height;
                    const screenAspect = window.innerWidth / window.innerHeight;
                    
                    // Siempre ajustamos por ancho primero para asegurar cobertura horizontal
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerWidth / imageAspect;
                    
                    // Si la altura resultante es menor que la altura de la ventana, ajustamos por altura
                    if (canvas.height < window.innerHeight) {
                        canvas.height = window.innerHeight;
                        canvas.width = window.innerHeight * imageAspect;
                    }
                    
                    gl.viewport(0, 0, canvas.width, canvas.height);
                };
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('resize', resize);
            resize();
            render();

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', resize);
            };
        });
    }, [image, depthMap]);

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </div>
    );
}