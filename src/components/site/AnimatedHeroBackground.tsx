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
uniform vec2 uLight;
uniform float uEnergy;
uniform float uGrain;

const vec3 IVORY = vec3(0.965, 0.945, 0.910);
const vec3 CREAM = vec3(0.933, 0.890, 0.827);
const vec3 SAND = vec3(0.843, 0.753, 0.647);
const vec3 CHAMPAGNE = vec3(0.788, 0.682, 0.545);
const vec3 COPPER = vec3(0.651, 0.435, 0.298);
const vec3 ROSE = vec3(0.788, 0.643, 0.608);
const vec3 WARM_SHADOW = vec3(0.361, 0.275, 0.231);

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
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot(0.5) * p * 2.02 + 11.3;
    a *= 0.5;
  }
  return v;
}

float silkRibbon(float distanceToCurve, float width) {
  float body = exp(-pow(distanceToCurve / width, 2.0));
  float edge = exp(-pow((abs(distanceToCurve) - width * 0.48) / (width * 0.22), 2.0));
  return body * 0.72 + edge * 0.28;
}

vec3 render(vec2 fc) {
  vec2 uv = fc / uRes;
  vec2 p = (fc - 0.5 * uRes) / uRes.y;
  float t = uTime;

  float broadWarp = fbm(p * 0.82 + vec2(t * 0.035, -t * 0.024)) - 0.5;
  float fineWarp = fbm(p * 1.42 - vec2(t * 0.018, t * 0.028)) - 0.5;
  float warp = broadWarp * 0.22 + fineWarp * 0.07;

  float upperCurve = p.y - (0.42 + 0.22 * sin(p.x * 1.45 + t * 0.78) + warp);
  float rightCurve = p.y - (-0.04 + 0.30 * sin(p.x * 1.18 - t * 0.62 + 1.8) - warp);
  float lowerCurve = p.y - (-0.56 + 0.20 * sin(p.x * 1.72 + t * 0.54 + 3.4) + warp * 0.7);

  float upper = silkRibbon(upperCurve, 0.42);
  float right = silkRibbon(rightCurve, 0.48) * smoothstep(0.18, 0.88, uv.x);
  float lower = silkRibbon(lowerCurve, 0.38) * smoothstep(0.24, 0.90, uv.x);

  float calmTextZone = 1.0 - smoothstep(0.14, 0.76, distance(uv, vec2(0.28, 0.68)));
  upper *= 1.0 - calmTextZone * 0.28;
  right *= 1.0 - calmTextZone * 0.46;
  lower *= 1.0 - calmTextZone * 0.30;

  float edgeDepth = smoothstep(0.38, 1.0, uv.x) * 0.58;
  edgeDepth += smoothstep(0.72, 1.0, uv.y) * 0.16;
  edgeDepth *= 1.0 - calmTextZone * 0.82;

  vec3 col = mix(CREAM, IVORY, 0.46 + 0.24 * broadWarp);
  col = mix(col, WARM_SHADOW, edgeDepth);
  col = mix(col, CHAMPAGNE, upper * 0.72 * uEnergy);
  col = mix(col, ROSE, right * 0.58 * uEnergy);
  col = mix(col, COPPER, lower * 0.50 * uEnergy);

  float pearl = pow(max(0.0, 1.0 - abs(upperCurve) / 0.30), 3.0);
  pearl += pow(max(0.0, 1.0 - abs(rightCurve) / 0.34), 3.0) * 0.82;
  col += mix(vec3(1.0), CHAMPAGNE, 0.18) * pearl * 0.28 * uEnergy;

  float foldShadow = smoothstep(0.11, 0.38, abs(upperCurve)) * upper;
  foldShadow += smoothstep(0.12, 0.44, abs(rightCurve)) * right * 0.84;
  foldShadow += smoothstep(0.10, 0.34, abs(lowerCurve)) * lower * 0.48;
  col = mix(col, mix(WARM_SHADOW, COPPER, 0.42), foldShadow * 0.34 * uEnergy);

  float roseGlow = exp(-pow(rightCurve / 0.24, 2.0)) * smoothstep(0.42, 0.98, uv.x);
  col = mix(col, ROSE, roseGlow * 0.34 * uEnergy);

  vec2 lightPosition = uLight / uRes;
  float light = exp(-dot(uv - lightPosition, uv - lightPosition) * 3.6);
  col = mix(col, IVORY, light * 0.12);
  return col;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  vec3 col = render(fc);

  float g = hash21(fc + fract(uTime) * 97.0) - 0.5;
  col += g * 0.018 * uGrain;

  vec2 q = fc / uRes;
  float vig = smoothstep(1.18, 0.18, distance(q, vec2(0.5)));
  col *= mix(0.965, 1.0, vig);

  col = clamp(col, 0.0, 1.0);
  col = pow(col, vec3(0.96));
  gl_FragColor = vec4(col, 1.0);
}
`;

const CONFIG = {
  motion: 0.28,
  energy: 1.22,
  grain: 0.16,
};

type Uniforms = {
  res: WebGLUniformLocation;
  time: WebGLUniformLocation;
  light: WebGLUniformLocation;
  energy: WebGLUniformLocation;
  grain: WebGLUniformLocation;
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Hero background shader compilation failed:", gl.getShaderInfoLog(shader));
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
    console.error("Hero background shader linking failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram): Uniforms | null {
  const uniformNames = {
    res: "uRes",
    time: "uTime",
    light: "uLight",
    energy: "uEnergy",
    grain: "uGrain",
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
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
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
      gl.uniform2f(uniforms.light, mouseX * width, (1 - mouseY) * height);
      gl.uniform1f(uniforms.energy, isMobile ? CONFIG.energy * 0.82 : CONFIG.energy);
      gl.uniform1f(uniforms.grain, isMobile ? CONFIG.grain * 0.5 : CONFIG.grain);
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
      style={{
        background:
          "radial-gradient(ellipse 75% 62% at 74% 42%, rgba(201, 164, 155, 0.92), transparent 54%), radial-gradient(ellipse 68% 70% at 88% 78%, rgba(166, 111, 76, 0.82), transparent 58%), linear-gradient(118deg, #f6f1e8 4%, #eee3d3 42%, #c9ae8b 70%, #5c463b 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 44% 52% at 22% 69%, rgba(246, 241, 232, 0.48), rgba(246, 241, 232, 0.16) 50%, transparent 84%)",
        }}
      />
    </div>
  );
}
