import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useLanguage, c as cases } from "./router-BOowU5Nw.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
  patina: 0
};
function compileShader(gl, type, source) {
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
function createProgram(gl) {
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
function getUniforms(gl, program) {
  const uniformNames = {
    res: "uRes",
    time: "uTime",
    mouse: "uMouse",
    hover: "uHover",
    ripples: "uRipples[0]",
    energy: "uEnergy",
    grain: "uGrain",
    dark: "uDark",
    patina: "uPatina"
  };
  const entries = Object.entries(uniformNames).map(([key, name]) => {
    const location = gl.getUniformLocation(program, name);
    return [key, location];
  });
  if (entries.some(([, location]) => location === null)) {
    return null;
  }
  return Object.fromEntries(entries);
}
function AnimatedHeroBackground() {
  const containerRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
      stencil: false
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
    const draw = (now) => {
      const dt = Math.min((now - lastFrame) / 1e3, 0.05);
      lastFrame = now;
      if (!reducedMotionQuery.matches) {
        shaderTime += dt * CONFIG.motion;
      }
      const drift = now * 16e-5;
      targetX = 0.58 + 0.18 * Math.sin(drift * 1.1) + 0.04 * Math.sin(drift * 2.3);
      targetY = 0.52 + 0.18 * Math.cos(drift * 0.9) + 0.04 * Math.cos(drift * 2);
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
    const tick = (now) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "pointer-events-none absolute inset-0 overflow-hidden",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 h-full w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "radial-gradient(ellipse 76% 88% at 7% 58%, rgba(251, 250, 247, 0.98), rgba(251, 250, 247, 0.72) 39%, rgba(251, 250, 247, 0.18) 76%, rgba(251, 250, 247, 0) 100%), radial-gradient(ellipse 88% 62% at 42% 100%, rgba(251, 250, 247, 0.74), rgba(251, 250, 247, 0.28) 58%, rgba(251, 250, 247, 0) 100%), linear-gradient(90deg, rgba(251, 250, 247, 0.44), rgba(251, 250, 247, 0.08) 58%, rgba(251, 250, 247, 0.18))"
            }
          }
        )
      ]
    }
  );
}
const previewSlugs = ["slovenia-castle", "industrial-heritage-slovenia", "bauskas-16a-riga"];
const directionOrder = ["/who-we-are", "/services", "/cases", "/approach", "/recovery-validation", "/selected-thinking", "/contact", "/submit"];
function Home() {
  const {
    t,
    l
  } = useLanguage();
  const previewCases = previewSlugs.map((slug) => cases.find((caseStudy) => caseStudy.slug === slug)).filter((caseStudy) => Boolean(caseStudy));
  const directions = directionOrder.map((path) => t.home.directions.find((direction) => direction.to === path)).filter((direction) => Boolean(direction));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-[70vh] items-end overflow-hidden bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedHeroBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl relative pb-16 pt-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow hero-text-reveal hero-text-reveal-eyebrow page-reveal page-reveal-delay-1 text-accent", children: l(t.home.eyebrow) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mobile-safe-text serif hero-text-reveal hero-text-reveal-headline page-reveal page-reveal-delay-2 mt-5 max-w-4xl text-3xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl", children: [
          l(t.home.headlineStart),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-accent", children: l(t.home.headlineEm) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hero-text-reveal hero-text-reveal-subtitle page-reveal page-reveal-delay-3 mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base", children: l(t.home.intro) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "home-value-proof", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl home-value-proof-shell", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-value-proof-intro", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mobile-safe-text serif home-value-proof-thesis", children: l(t.home.valueProof.thesis) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mobile-safe-text home-value-proof-explanation", children: l(t.home.valueProof.explanation) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-value-proof-directions", children: t.home.valueProof.directions.map((direction) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-value-proof-direction", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mobile-safe-text serif", children: l(direction.title) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mobile-safe-text", children: l(direction.text) })
      ] }, direction.title.en)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-rule py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex flex-wrap items-end justify-between gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "serif mt-3 max-w-2xl text-2xl text-foreground md:text-4xl", children: l(t.home.directionTitle) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: directions.map((direction) => {
        const title = direction.to === "/recovery-validation" ? {
          en: "Potential Review",
          ru: "Оценка потенциала"
        } : direction.title;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: direction.to, className: "homepage-hub-card group flex min-h-[190px] flex-col p-6 sm:min-h-[210px] md:p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mobile-safe-text serif min-w-0 text-2xl text-foreground transition-colors group-hover:text-accent md:text-[30px] md:leading-tight", children: l(title) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 transition-colors group-hover:text-accent", children: l(t.common.open) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mobile-safe-text mt-auto pt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]", children: l(direction.desc) })
        ] }, direction.to);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "paper py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "serif text-xl leading-snug text-ink md:text-2xl", children: l(t.home.position) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.home.selectedCasesLabel) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mobile-safe-text serif mt-3 text-2xl text-foreground md:text-3xl", children: l(t.home.selectedCasesTitle) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases", className: "premium-action px-4 py-2 text-[11px] uppercase tracking-[0.18em]", children: l(t.common.viewAllCases) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: previewCases.map((caseStudy) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases/$slug", params: {
        slug: caseStudy.slug
      }, className: "group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden border border-rule bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: caseStudy.img, alt: l(caseStudy.title), loading: "lazy", width: 1280, height: 960, className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-baseline justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mobile-safe-text serif text-lg text-foreground", children: l(caseStudy.title) }) })
      ] }, caseStudy.slug)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-rule py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.home.confidential) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "serif mt-5 text-2xl leading-tight text-foreground md:text-3xl", children: l(t.home.ctaTitle) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]", children: l(t.common.submitAnAsset) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]", children: l(t.common.contact) })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
