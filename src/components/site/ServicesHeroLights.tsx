import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_motion;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = p * 2.04 + vec2(7.3, 5.1);
    amplitude *= 0.5;
  }
  return value;
}

mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float silkField(vec2 point, vec2 center, vec2 scale, float angle, float distortion) {
  vec2 local = rotate2d(angle) * (point - center);
  local += vec2(
    sin(local.y * 3.4 + distortion) * 0.045,
    cos(local.x * 2.6 - distortion) * 0.035
  );
  local /= scale;
  return dot(local, local);
}

float silkRibbon(vec2 point, float offset, float frequency, float phase, float time) {
  float curve =
    offset +
    sin(point.x * frequency + phase + time * 0.11) * 0.12 +
    sin(point.x * (frequency * 0.46) - phase + time * 0.07) * 0.055;
  return point.y - curve;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;

  float time = u_time * u_motion;
  vec2 warp = vec2(
    fbm(p * 1.45 + vec2(time * 0.018, 1.4)),
    fbm(p * 1.35 + vec2(3.8, -time * 0.016))
  ) - 0.5;
  vec2 field = p + warp * 0.17;

  vec3 ivory = vec3(0.965, 0.945, 0.910);
  vec3 warmCream = vec3(0.933, 0.890, 0.827);
  vec3 sand = vec3(0.843, 0.753, 0.647);
  vec3 champagne = vec3(0.788, 0.682, 0.545);
  vec3 copper = vec3(0.651, 0.435, 0.298);
  vec3 dustyRose = vec3(0.788, 0.643, 0.608);
  vec3 warmShadow = vec3(0.361, 0.275, 0.231);

  vec3 colour = mix(ivory, warmCream, 0.24 + uv.y * 0.12);

  vec2 centerA = vec2(
    -0.54 + sin(time * 0.105) * 0.28,
    0.24 + cos(time * 0.082) * 0.12
  );
  vec2 centerB = vec2(
    0.58 + cos(time * 0.091 + 1.6) * 0.3,
    0.08 + sin(time * 0.074 + 0.7) * 0.2
  );
  vec2 centerC = vec2(
    -0.02 + sin(time * 0.067 + 2.4) * 0.44,
    -0.38 + cos(time * 0.088 + 1.1) * 0.12
  );
  vec2 centerD = vec2(
    0.12 + cos(time * 0.072 + 3.2) * 0.48,
    0.38 + sin(time * 0.061) * 0.1
  );

  float fieldA = silkField(field, centerA, vec2(0.66, 0.24), -0.46, time * 0.15);
  float fieldB = silkField(field, centerB, vec2(0.72, 0.28), 0.38, time * 0.12 + 2.0);
  float fieldC = silkField(field, centerC, vec2(0.7, 0.22), -0.18, time * 0.1 + 4.0);
  float fieldD = silkField(field, centerD, vec2(0.82, 0.18), 0.13, time * 0.09 + 1.0);

  float haloA = exp(-fieldA * 0.9);
  float haloB = exp(-fieldB * 0.86);
  float haloC = exp(-fieldC * 0.95);
  float haloD = exp(-fieldD * 0.82);
  float bodyA = exp(-fieldA * 2.5);
  float bodyB = exp(-fieldB * 2.35);
  float bodyC = exp(-fieldC * 2.8);
  float bodyD = exp(-fieldD * 3.1);
  float coreA = exp(-fieldA * 7.5);
  float coreB = exp(-fieldB * 7.0);
  float coreC = exp(-fieldC * 8.0);
  float coreD = exp(-fieldD * 9.0);

  colour = mix(colour, dustyRose, haloA * 0.2);
  colour = mix(colour, champagne, haloB * 0.22);
  colour = mix(colour, sand, haloC * 0.22);
  colour = mix(colour, copper, haloD * 0.12);

  colour = mix(colour, mix(dustyRose, warmCream, 0.26), bodyA * 0.28);
  colour = mix(colour, mix(champagne, ivory, 0.2), bodyB * 0.3);
  colour = mix(colour, mix(sand, copper, 0.18), bodyC * 0.22);
  colour = mix(colour, mix(champagne, dustyRose, 0.35), bodyD * 0.2);

  vec3 pearl = vec3(1.0, 0.982, 0.945);
  colour = mix(colour, pearl, coreA * 0.34);
  colour = mix(colour, pearl, coreB * 0.38);
  colour = mix(colour, pearl, coreC * 0.3);
  colour = mix(colour, pearl, coreD * 0.28);

  float valley = (1.0 - max(max(haloA, haloB), max(haloC, haloD)));
  float depthNoise = fbm(field * 1.85 - vec2(time * 0.012, 0.0));
  colour = mix(colour, warmShadow, valley * depthNoise * 0.055);

  float silkHighlight = pow(
    0.5 + 0.5 * sin((field.x * 1.8 + field.y * 3.2 + warp.x * 2.0) * 3.14159),
    10.0
  );
  colour = mix(colour, pearl, silkHighlight * 0.045);

  float ribbonA = silkRibbon(field, 0.22, 2.15, 0.4, time);
  float ribbonB = silkRibbon(field, -0.02, 1.72, 2.3, -time * 0.88);
  float ribbonC = silkRibbon(field, -0.3, 2.48, 4.1, time * 0.72);

  float foldA = exp(-pow(abs(ribbonA) / 0.17, 2.0));
  float foldB = exp(-pow(abs(ribbonB) / 0.15, 2.0));
  float foldC = exp(-pow(abs(ribbonC) / 0.14, 2.0));

  float sheenA = exp(-pow(abs(ribbonA + 0.018) / 0.026, 2.0));
  float sheenB = exp(-pow(abs(ribbonB - 0.012) / 0.022, 2.0));
  float sheenC = exp(-pow(abs(ribbonC + 0.016) / 0.024, 2.0));

  float shadeA = exp(-pow(abs(ribbonA - 0.1) / 0.07, 2.0));
  float shadeB = exp(-pow(abs(ribbonB + 0.085) / 0.065, 2.0));
  float shadeC = exp(-pow(abs(ribbonC - 0.08) / 0.06, 2.0));

  float horizontalFade = smoothstep(1.05, 0.6, abs(p.x));
  colour = mix(colour, dustyRose, foldA * horizontalFade * 0.16);
  colour = mix(colour, champagne, foldB * horizontalFade * 0.18);
  colour = mix(colour, sand, foldC * horizontalFade * 0.18);

  colour = mix(colour, warmShadow, shadeA * horizontalFade * 0.075);
  colour = mix(colour, copper, shadeB * horizontalFade * 0.065);
  colour = mix(colour, warmShadow, shadeC * horizontalFade * 0.06);

  float combinedSheen = max(sheenA, max(sheenB, sheenC));
  colour = mix(colour, pearl, combinedSheen * horizontalFade * 0.48);
  colour += combinedSheen * horizontalFade * vec3(0.045, 0.029, 0.016);

  float grain = hash21(gl_FragCoord.xy + floor(time * 8.0)) - 0.5;
  colour += grain * 0.006;

  float textCalm = exp(-dot(p / vec2(0.76, 0.34), p / vec2(0.76, 0.34)) * 2.0);
  colour = mix(colour, mix(ivory, warmCream, 0.2), textCalm * 0.13);

  gl_FragColor = vec4(clamp(colour, 0.0, 1.0), 1.0);
}
`;

export function ServicesHeroLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Services hero shader compilation failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Services hero shader linking failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const motion = gl.getUniformLocation(program, "u_motion");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, (now - start) / 1000);
      gl.uniform1f(motion, reducedMotion ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reducedMotion && visible) frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(render);
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="services-hero-lights" aria-hidden="true" />;
}
