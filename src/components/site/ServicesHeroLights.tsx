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

vec3 palette(int index) {
  if (index == 0) return vec3(0.788, 0.682, 0.545);
  if (index == 1) return vec3(0.788, 0.643, 0.608);
  if (index == 2) return vec3(0.651, 0.435, 0.298);
  if (index == 3) return vec3(0.843, 0.753, 0.647);
  if (index == 4) return vec3(0.933, 0.890, 0.827);
  return vec3(0.965, 0.945, 0.910);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;

  float time = u_time * u_motion;
  vec2 warp = vec2(
    fbm(p * 1.7 + vec2(time * 0.025, 1.4)),
    fbm(p * 1.55 + vec2(3.8, -time * 0.022))
  ) - 0.5;
  vec2 field = p + warp * 0.11;

  vec3 base = vec3(0.965, 0.945, 0.910);
  vec3 colour = base;
  float totalGlow = 0.0;

  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 center = vec2(
      sin(time * (0.11 + fi * 0.014) + fi * 2.17),
      cos(time * (0.085 + fi * 0.012) + fi * 1.63)
    );
    center *= vec2(0.48 + 0.025 * fi, 0.28 + 0.018 * mod(fi, 2.0));

    vec2 delta = field - center;
    delta.x *= 0.82 + 0.08 * mod(fi, 3.0);
    float distanceSquared = dot(delta, delta);
    float halo = exp(-distanceSquared * (5.2 + fi * 0.24));
    float body = exp(-distanceSquared * (11.0 + fi * 0.7));
    float core = exp(-distanceSquared * (34.0 + fi * 1.4));

    vec3 lightColour = palette(i);
    colour += lightColour * halo * 0.075;
    colour += lightColour * body * 0.095;
    colour += vec3(1.0, 0.982, 0.945) * core * 0.115;
    totalGlow += halo;
  }

  float pearl = fbm(field * 3.2 + time * 0.018) * 0.018;
  float edgeCalm = smoothstep(0.92, 0.25, length(p));
  colour += pearl * edgeCalm;
  colour = mix(base, colour, 0.9);
  colour -= smoothstep(1.8, 4.2, totalGlow) * vec3(0.012, 0.008, 0.005);

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
