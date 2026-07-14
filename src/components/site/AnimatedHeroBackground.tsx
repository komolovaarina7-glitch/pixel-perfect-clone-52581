import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 aPos;

void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform vec4 uRipples[8];
uniform float uEnergy;
uniform float uGrain;
uniform float uDark;
uniform float uPatina;

const vec3 PAPER = vec3(0.985, 0.976, 0.949);
const vec3 PAPER_DEEP = vec3(0.957, 0.937, 0.890);
const vec3 SAND = vec3(0.906, 0.855, 0.769);
const vec3 BRONZE3 = vec3(0.650, 0.470, 0.310);
const vec3 BRONZE5 = vec3(0.470, 0.310, 0.205);
const vec3 INK = vec3(0.184, 0.149, 0.122);
const vec3 OLIVE = vec3(0.369, 0.420, 0.271);

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot(0.5) * p * 2.02 + 11.3;
    a *= 0.5;
  }
  return v;
}

float ripplePulse(vec2 px, float speed, float width) {
  float w = 0.0;
  for (int i = 0; i < 8; i++) {
    vec4 r = uRipples[i];
    if (r.w <= 0.001) continue;
    float radius = r.z * speed;
    float d = distance(px, r.xy);
    float ring = exp(-pow((d - radius) / width, 2.0));
    w += ring * exp(-r.z * 1.9) * r.w;
  }
  return w;
}

vec3 render(vec2 fc) {
  vec2 p = (fc - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float t = uTime;

  float f = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 src = 0.78 * vec2(sin(t * 0.31 + fi * 1.7), cos(t * 0.26 + fi * 2.3));
    f += sin(distance(p, src) * 13.0 - t * 2.6 + fi * 1.3);
  }

  float ptrAmp = 1.4 * (0.5 + 0.9 * uHover);
  f += ptrAmp * sin(distance(p, m) * 16.0 - t * 4.0);
  f /= 5.0;
  f += 0.18 * fbm(p * 1.6 + t * 0.05);

  float caust = pow(clamp(f, 0.0, 1.0), 2.6) + 0.5 * pow(clamp(-f, 0.0, 1.0), 3.0);
  caust = clamp(caust * 1.4 * uEnergy + ripplePulse(fc, 560.0, 55.0) * 1.1, 0.0, 1.0);

  float dm = distance(p, m);
  float lamp = (0.28 + 0.7 * uHover) * exp(-dm * dm * 0.9);

  vec3 base = mix(PAPER_DEEP, PAPER, 0.5 + 0.5 * lamp);
  vec3 col = mix(base, SAND, caust * 0.72);
  col = mix(col, BRONZE3, pow(caust, 1.4) * 0.48);
  col += BRONZE5 * pow(caust, 2.4) * (0.20 + lamp * 0.28);
  col = mix(col, INK, smoothstep(1.2, 1.75, length(p)) * 0.08);
  return col;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  vec3 col = render(fc);

  if (uPatina > 0.001) {
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 verd = mix(INK, OLIVE, smoothstep(0.05, 0.55, lum));
    verd = mix(verd, mix(OLIVE, SAND, 0.5), smoothstep(0.55, 1.0, lum));
    col = mix(col, verd, uPatina * 0.7);
  }

  if (uDark > 0.001) {
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 night = mix(BRONZE3, vec3(0.075, 0.063, 0.052), smoothstep(0.18, 0.92, lum));
    night += BRONZE5 * smoothstep(0.55, 0.95, lum) * 0.10;
    col = mix(col, night, uDark * 0.92);
  }

  float g = hash21(fc + fract(uTime) * 97.0) - 0.5;
  col += g * 0.035 * uGrain;

  vec2 q = fc / uRes;
  float vig = smoothstep(1.18, 0.18, distance(q, vec2(0.5)));
  col *= mix(0.94, 1.0, vig);

  col = clamp(col, 0.0, 1.0);
  col = pow(col, vec3(0.92));
  gl_FragColor = vec4(col, 1.0);
}
`;

const CONFIG = {
  motion: 0.075,
  energy: 0.68,
  grain: 0.18,
  dark: 0,
  patina: 0,
};

type Uniforms = {
  res: WebGLUniformLocation;
  time: WebGLUniformLocation;
  mouse: WebGLUniformLocation;
  hover: WebGLUniformLocation;
  ripples: WebGLUniformLocation;
  energy: WebGLUniformLocation;
  grain: WebGLUniformLocation;
  dark: WebGLUniformLocation;
  patina: WebGLUniformLocation;
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram): Uniforms | null {
  const uniformNames = {
    res: "uRes",
    time: "uTime",
    mouse: "uMouse",
    hover: "uHover",
    ripples: "uRipples[0]",
    energy: "uEnergy",
    grain: "uGrain",
    dark: "uDark",
    patina: "uPatina",
  } as const;

  const entries = Object.entries(uniformNames).map(([key, name]) => {
    const location = gl.getUniformLocation(program, name);
    return [key, location] as const;
  });

  if (entries.some(([, location]) => location === null)) {
    return null;
  }

  return Object.fromEntries(entries) as Uniforms;
}

export function AnimatedHeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
      stencil: false,
    });

    if (!gl) {
      return;
    }

    const program = createProgram(gl);

    if (!program) {
      return;
    }

    const uniforms = getUniforms(gl, program);

    if (!uniforms) {
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    const position = gl.getAttribLocation(program, "aPos");

    if (!buffer || position < 0) {
      gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let lastFrame = performance.now();
    let shaderTime = 0;
    let mouseX = 0.62;
    let mouseY = 0.52;
    let targetX = 0.62;
    let targetY = 0.52;
    const ripples = new Float32Array(32);
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, width, height);
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (!reducedMotionQuery.matches) {
        shaderTime += dt * CONFIG.motion;
      }

      const drift = now * 0.00016;
      targetX = 0.58 + 0.18 * Math.sin(drift * 1.1) + 0.04 * Math.sin(drift * 2.3);
      targetY = 0.52 + 0.18 * Math.cos(drift * 0.9) + 0.04 * Math.cos(drift * 2.0);
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uniforms.res, width, height);
      gl.uniform1f(uniforms.time, shaderTime);
      gl.uniform2f(uniforms.mouse, mouseX * width, (1 - mouseY) * height);
      gl.uniform1f(uniforms.hover, 0.16);
      gl.uniform4fv(uniforms.ripples, ripples);
      gl.uniform1f(uniforms.energy, CONFIG.energy);
      gl.uniform1f(uniforms.grain, CONFIG.grain);
      gl.uniform1f(uniforms.dark, CONFIG.dark);
      gl.uniform1f(uniforms.patina, CONFIG.patina);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      draw(now);

      if (!reducedMotionQuery.matches) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    resize();
    resizeObserver.observe(container);
    tick(performance.now());

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 76% 88% at 7% 58%, rgba(251, 250, 247, 0.98), rgba(251, 250, 247, 0.72) 39%, rgba(251, 250, 247, 0.18) 76%, rgba(251, 250, 247, 0) 100%), radial-gradient(ellipse 88% 62% at 42% 100%, rgba(251, 250, 247, 0.74), rgba(251, 250, 247, 0.28) 58%, rgba(251, 250, 247, 0) 100%), linear-gradient(90deg, rgba(251, 250, 247, 0.44), rgba(251, 250, 247, 0.08) 58%, rgba(251, 250, 247, 0.18))",
        }}
      />
    </div>
  );
}
