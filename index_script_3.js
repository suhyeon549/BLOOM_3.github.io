
        // Shader-masked Type WebGL Script
        // A fullscreen shader, clipped to letterforms via SVG mask to provide an animated, monochrome texture.
        (function () {
            const canvas = document.getElementById('kf-shader-canvas');
            if (!canvas) return;
            const gl = canvas.getContext('webgl', { alpha: true });

            const CONFIG = {
                speed: 0.12,
                scale: 1.6,
                contrast: 1.4
            };

            const vsSource = `
                attribute vec2 position;
                varying vec2 vUv;
                void main() {
                    vUv = position * 0.5 + 0.5;
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            const fsSource = `
                precision mediump float;
                varying vec2 vUv;
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform float u_scale;
                uniform float u_contrast;

                float random (in vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                }

                float noise (in vec2 st) {
                    vec2 i = floor(st);
                    vec2 f = fract(st);

                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));

                    vec2 u = f*f*(3.0-2.0*f);

                    return mix(a, b, u.x) +
                            (c - a)* u.y * (1.0 - u.x) +
                            (d - b) * u.x * u.y;
                }

                float fbm (in vec2 st) {
                    float value = 0.0;
                    float amplitude = 0.5;
                    value += amplitude * noise(st); st *= 2.0; amplitude *= 0.5;
                    value += amplitude * noise(st); st *= 2.0; amplitude *= 0.5;
                    value += amplitude * noise(st); st *= 2.0; amplitude *= 0.5;
                    value += amplitude * noise(st); st *= 2.0; amplitude *= 0.5;
                    value += amplitude * noise(st); st *= 2.0; amplitude *= 0.5;
                    return value;
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;
                    st.x *= u_resolution.x / u_resolution.y;
                    
                    vec2 q = vec2(0.);
                    q.x = fbm( st * u_scale + u_time );
                    q.y = fbm( st * u_scale + vec2(1.0));

                    vec2 r = vec2(0.);
                    r.x = fbm( st * u_scale + 4.0*q + vec2(1.7,9.2)+ 0.15*u_time );
                    r.y = fbm( st * u_scale + 4.0*q + vec2(8.3,2.8)+ 0.126*u_time);

                    float f = fbm(st * u_scale + 4.0*r);

                    float color = (f * f * f + 0.6 * f * f + 0.5 * f) * u_contrast;
                    
                    // Base color #1e1e1e (0.1176) with noise highlight
                    vec3 finalColor = vec3(0.1176) + vec3(color * 0.4);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `;

            function compileShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            }

            const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0, -1.0, 1.0, 1.0
            ]), gl.STATIC_DRAW);

            const positionLocation = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            const timeLoc = gl.getUniformLocation(program, "u_time");
            const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
            const scaleLoc = gl.getUniformLocation(program, "u_scale");
            const contrastLoc = gl.getUniformLocation(program, "u_contrast");

            let animationFrameId;
            let isVisible = false;

            function resize() {
                const displayWidth = canvas.clientWidth;
                const displayHeight = canvas.clientHeight;
                if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                }
            }

            function render(time) {
                if (!isVisible) return;
                resize();
                gl.clearColor(0.0, 0.0, 0.0, 0.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                gl.uniform1f(timeLoc, time * 0.001 * CONFIG.speed);
                gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
                gl.uniform1f(scaleLoc, CONFIG.scale);
                gl.uniform1f(contrastLoc, CONFIG.contrast);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                animationFrameId = requestAnimationFrame(render);
            }

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) CONFIG.speed = 0;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        if (!animationFrameId) {
                            animationFrameId = requestAnimationFrame(render);
                        }
                    } else if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                });
            });
            observer.observe(canvas);
        })();
        // CTA Chromatic Aberration + Bloom Shader Script
        (function () {
            const canvas = document.getElementById('cta-shader-canvas');
            if (!canvas) return;
            const gl = canvas.getContext('webgl', { alpha: false });

            const CONFIG = {
                speed: 0.28,
                offset: 0.022,
                bloom: 0.9,
                thresh: 0.55
            };

            const vsSource = `
                attribute vec2 position;
                varying vec2 vUv;
                void main() {
                    vUv = position * 0.5 + 0.5;
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            const fsSource = `
                precision mediump float;
                varying vec2 vUv;
                uniform float iTime;
                uniform vec2 iResolution;
                uniform vec2 iMouse;
                uniform float uSpeed;
                uniform float uOffset;
                uniform float uBloom;
                uniform float uThresh;

                float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
                float noise(vec2 p) {
                    vec2 i = floor(p); vec2 f = fract(p);
                    vec2 u = f*f*(3.0-2.0*f);
                    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
                }
                float fbm(vec2 p) {
                    float f = 0.0;
                    f += 0.5000 * noise(p); p = p * 2.02;
                    f += 0.2500 * noise(p); p = p * 2.03;
                    f += 0.1250 * noise(p); p = p * 2.01;
                    f += 0.0625 * noise(p);
                    return f;
                }

                void main() {
                    vec2 uv = gl_FragCoord.xy / iResolution.xy;
                    vec2 center = vec2(0.5);
                    vec2 mouse = iMouse / iResolution.xy;
                    if (iMouse.x > 0.0 || iMouse.y > 0.0) center = mouse;

                    vec2 dir = uv - center;
                    float dist = length(dir);
                    dir = normalize(dir);
                    
                    float t = iTime * uSpeed;
                    
                    // Radial split
                    vec2 pR = uv + dir * (uOffset * dist);
                    vec2 pG = uv;
                    vec2 pB = uv - dir * (uOffset * dist);
                    
                    float r = fbm(pR * 4.0 - t);
                    float g = fbm(pG * 4.0 - t);
                    float b = fbm(pB * 4.0 - t);
                    
                    vec3 col = vec3(r, g, b);
                    
                    // Bloom
                    vec3 bloomObj = max(col - uThresh, 0.0) * uBloom;
                    col += bloomObj;
                    
                    // Grayscale
                    float v = dot(col, vec3(0.299, 0.587, 0.114));
                    
                    // Output dark base so white text stands out
                    gl_FragColor = vec4(vec3(v * 0.4), 1.0);
                }
            `;

            function compileShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            }

            const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0, -1.0, 1.0, 1.0
            ]), gl.STATIC_DRAW);

            const positionLocation = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            const timeLoc = gl.getUniformLocation(program, "iTime");
            const resolutionLoc = gl.getUniformLocation(program, "iResolution");
            const mouseLoc = gl.getUniformLocation(program, "iMouse");
            const speedLoc = gl.getUniformLocation(program, "uSpeed");
            const offsetLoc = gl.getUniformLocation(program, "uOffset");
            const bloomLoc = gl.getUniformLocation(program, "uBloom");
            const threshLoc = gl.getUniformLocation(program, "uThresh");

            let animationFrameId;
            let isVisible = false;
            let mouseX = 0;
            let mouseY = 0;

            window.addEventListener('mousemove', (e) => {
                const currentScale = window.innerWidth / 1920;
                const rect = canvas.getBoundingClientRect();
                mouseX = (e.clientX - rect.left) / currentScale;
                mouseY = (e.clientY - rect.top) / currentScale;
            });

            function resize() {
                const displayWidth = canvas.clientWidth;
                const displayHeight = canvas.clientHeight;
                if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                }
            }

            function render(time) {
                if (!isVisible) return;
                resize();
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                gl.uniform1f(timeLoc, time * 0.001);
                gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
                // Invert Y axis for WebGL
                gl.uniform2f(mouseLoc, mouseX, canvas.height - mouseY);
                gl.uniform1f(speedLoc, CONFIG.speed);
                gl.uniform1f(offsetLoc, CONFIG.offset);
                gl.uniform1f(bloomLoc, CONFIG.bloom);
                gl.uniform1f(threshLoc, CONFIG.thresh);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                animationFrameId = requestAnimationFrame(render);
            }

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) CONFIG.speed = 0;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        if (!animationFrameId) {
                            animationFrameId = requestAnimationFrame(render);
                        }
                    } else if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                });
            });
            observer.observe(canvas);
        })();
    