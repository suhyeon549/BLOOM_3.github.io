// flow-field.js
// Unified Raw WebGL Implementation:
// 1. Video Texture Mouse Distortion (Warp)
// 2. FBM Flow Field Overlay (Screen Blending at 20%)

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("flow-field-canvas");
    const video = document.getElementById("hero-video");
    
    if (!canvas || !video) {
        console.error("Canvas or Video element not found!");
        return;
    }

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
        console.error("WebGL not supported!");
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vertexShaderSrc = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            // position is -1 to 1, map to 0 to 1 for UV
            vUv = position * 0.5 + 0.5;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSrc = `
        precision highp float;
        varying vec2 vUv;
        
        uniform sampler2D uTexture;
        uniform vec2 iResolution;
        uniform vec2 iMouse;
        uniform float iTime;

        // FBM Uniforms
        uniform float uSpeed;
        uniform float uWarp;
        uniform float uContrast;
        uniform float uMouse;

        // --- FBM Functions ---
        float random (in vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f*f*(3.0-2.0*f);

            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        float fbm(in vec2 st) {
            float value = 0.0;
            float amplitude = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            value += amplitude * noise(st); st = rot * st * 2.0 + shift; amplitude *= 0.5;
            value += amplitude * noise(st); st = rot * st * 2.0 + shift; amplitude *= 0.5;
            value += amplitude * noise(st); st = rot * st * 2.0 + shift; amplitude *= 0.5;
            value += amplitude * noise(st); st = rot * st * 2.0 + shift; amplitude *= 0.5;
            value += amplitude * noise(st); st = rot * st * 2.0 + shift; amplitude *= 0.5;
            return value;
        }

        void main() {
            // UV for Video Texture (Top-Down)
            vec2 uv = vec2(vUv.x, 1.0 - vUv.y);

            // Aspect ratio correction for circular math
            vec2 aspect = vec2(iResolution.x / iResolution.y, 1.0);
            
            // Map UV and Mouse to aspect-corrected space
            vec2 p = vUv * aspect;
            vec2 m = (iMouse.xy / iResolution.xy) * aspect;

            float dist = distance(p, m);
            
            // ----------------------------------------------------
            // 1. VIDEO TEXTURE WARP LOGIC
            // ----------------------------------------------------
            float radius = 0.8;     // Much wider reach
            float intensity = 0.25; // Much stronger pull
            float falloff = smoothstep(radius, 0.0, dist);
            float wave = sin(dist * 15.0 - iTime * 4.0) * 0.02 * falloff;
            
            vec2 dir = normalize(p - m);
            if (dist < 0.001) dir = vec2(0.0);

            // Use '+' to sample from further away, effectively pulling the image towards the mouse
            vec2 warp = dir * (falloff * intensity + wave);
            vec2 finalUv = uv + warp * vec2(1.0 / aspect.x, 1.0);
            finalUv = clamp(finalUv, 0.0, 1.0);

            vec4 videoColor = texture2D(uTexture, finalUv);

            // Output only the warped video
            gl_FragColor = videoColor;
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
        -1, -1,  1, -1,  -1,  1,
        -1,  1,  1, -1,   1,  1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const locTime = gl.getUniformLocation(program, "iTime");
    const locRes = gl.getUniformLocation(program, "iResolution");
    const locMouse = gl.getUniformLocation(program, "iMouse");
    const locTexture = gl.getUniformLocation(program, "uTexture");
    const locSpeed = gl.getUniformLocation(program, "uSpeed");
    const locWarp = gl.getUniformLocation(program, "uWarp");
    const locContrast = gl.getUniformLocation(program, "uContrast");
    const locUMouse = gl.getUniformLocation(program, "uMouse");

    gl.uniform1f(locSpeed, prefersReducedMotion ? 0.01 : 0.08);
    gl.uniform1f(locWarp, 4.0);
    gl.uniform1f(locContrast, 1.25);
    gl.uniform1f(locUMouse, 0.25);

    // Setup Video Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    gl.uniform1i(locTexture, 0);

    const resize = () => {
        const width = canvas.parentElement.clientWidth || 1920;
        const height = canvas.parentElement.clientHeight || 1080;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(locRes, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const mouseParams = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    window.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        if(rect.width === 0 || rect.height === 0) return;
        mouseParams.targetX = (e.clientX - rect.left) * (canvas.width / rect.width);
        mouseParams.targetY = canvas.height - ((e.clientY - rect.top) * (canvas.height / rect.height));
    });

    let startTime = performance.now();
    const animate = (time) => {
        requestAnimationFrame(animate);

        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            try {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
            } catch (e) {
                // Ignore CORS errors from local file:// execution
            }
        }

        const iTime = (time - startTime) * 0.001;
        gl.uniform1f(locTime, iTime);

        mouseParams.x += (mouseParams.targetX - mouseParams.x) * 0.1;
        mouseParams.y += (mouseParams.targetY - mouseParams.y) * 0.1;
        gl.uniform2f(locMouse, mouseParams.x, mouseParams.y);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    requestAnimationFrame(animate);
});
