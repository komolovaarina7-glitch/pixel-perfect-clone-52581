import{r as b,j as t,u as F,a as O,L as f}from"./index-_58MJC7m.js";const D=`
attribute vec2 aPos;

void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`,_=`
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
`,u={motion:.075,energy:.68,grain:.18,dark:0,patina:0};function T(a,r,i){const s=a.createShader(r);return s?(a.shaderSource(s,i),a.compileShader(s),a.getShaderParameter(s,a.COMPILE_STATUS)?s:(a.deleteShader(s),null)):null}function L(a){const r=T(a,a.VERTEX_SHADER,D),i=T(a,a.FRAGMENT_SHADER,_);if(!r||!i)return r&&a.deleteShader(r),i&&a.deleteShader(i),null;const s=a.createProgram();return s?(a.attachShader(s,r),a.attachShader(s,i),a.linkProgram(s),a.deleteShader(r),a.deleteShader(i),a.getProgramParameter(s,a.LINK_STATUS)?s:(a.deleteProgram(s),null)):(a.deleteShader(r),a.deleteShader(i),null)}function C(a,r){const s=Object.entries({res:"uRes",time:"uTime",mouse:"uMouse",hover:"uHover",ripples:"uRipples[0]",energy:"uEnergy",grain:"uGrain",dark:"uDark",patina:"uPatina"}).map(([e,o])=>{const n=a.getUniformLocation(r,o);return[e,n]});return s.some(([,e])=>e===null)?null:Object.fromEntries(s)}function I(){const a=b.useRef(null),r=b.useRef(null);return b.useEffect(()=>{const i=a.current,s=r.current;if(!i||!s)return;const e=s.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,premultipliedAlpha:!1,powerPreference:"high-performance",stencil:!1});if(!e)return;const o=L(e);if(!o)return;const n=C(e,o);if(!n){e.deleteProgram(o);return}const c=e.createBuffer(),x=e.getAttribLocation(o,"aPos");if(!c||x<0){e.deleteProgram(o),c&&e.deleteBuffer(c);return}e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let m=1,d=1,p=1,N=0,w=performance.now(),j=0,v=.62,g=.52,R=.62,A=.52;const B=new Float32Array(32),y=window.matchMedia("(prefers-reduced-motion: reduce)"),E=()=>{const l=i.getBoundingClientRect();p=Math.min(window.devicePixelRatio||1,1.5),m=Math.max(1,Math.floor(l.width*p)),d=Math.max(1,Math.floor(l.height*p)),s.width=m,s.height=d,s.style.width=`${l.width}px`,s.style.height=`${l.height}px`,e.viewport(0,0,m,d)},P=l=>{const M=Math.min((l-w)/1e3,.05);w=l,y.matches||(j+=M*u.motion);const h=l*16e-5;R=.58+.18*Math.sin(h*1.1)+.04*Math.sin(h*2.3),A=.52+.18*Math.cos(h*.9)+.04*Math.cos(h*2),v+=(R-v)*.08,g+=(A-g)*.08,e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,c),e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0),e.uniform2f(n.res,m,d),e.uniform1f(n.time,j),e.uniform2f(n.mouse,v*m,(1-g)*d),e.uniform1f(n.hover,.16),e.uniform4fv(n.ripples,B),e.uniform1f(n.energy,u.energy),e.uniform1f(n.grain,u.grain),e.uniform1f(n.dark,u.dark),e.uniform1f(n.patina,u.patina),e.drawArrays(e.TRIANGLES,0,3)},S=l=>{P(l),y.matches||(N=window.requestAnimationFrame(S))},k=new ResizeObserver(()=>{E(),P(performance.now())});return E(),k.observe(i),S(performance.now()),()=>{window.cancelAnimationFrame(N),k.disconnect(),e.deleteBuffer(c),e.deleteProgram(o)}},[]),t.jsxs("div",{ref:a,className:"pointer-events-none absolute inset-0 overflow-hidden","aria-hidden":"true",children:[t.jsx("canvas",{ref:r,className:"absolute inset-0 h-full w-full"}),t.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(ellipse 76% 88% at 7% 58%, rgba(251, 250, 247, 0.98), rgba(251, 250, 247, 0.72) 39%, rgba(251, 250, 247, 0.18) 76%, rgba(251, 250, 247, 0) 100%), radial-gradient(ellipse 88% 62% at 42% 100%, rgba(251, 250, 247, 0.74), rgba(251, 250, 247, 0.28) 58%, rgba(251, 250, 247, 0) 100%), linear-gradient(90deg, rgba(251, 250, 247, 0.44), rgba(251, 250, 247, 0.08) 58%, rgba(251, 250, 247, 0.18))"}})]})}const H=["slovenia-castle","industrial-heritage-slovenia","bauskas-16a-riga"],G=["/who-we-are","/services","/cases","/approach","/recovery-validation","/selected-thinking","/contact","/submit"];function z(){const{t:a,l:r}=F(),i=H.map(e=>O.find(o=>o.slug===e)).filter(e=>!!e),s=G.map(e=>a.home.directions.find(o=>o.to===e)).filter(e=>!!e);return t.jsxs("div",{children:[t.jsxs("section",{className:"relative flex min-h-[70vh] items-end overflow-hidden bg-background",children:[t.jsx(I,{}),t.jsxs("div",{className:"container-rl relative pb-16 pt-32",children:[t.jsx("p",{className:"eyebrow hero-text-reveal hero-text-reveal-eyebrow page-reveal page-reveal-delay-1 text-accent",children:r(a.home.eyebrow)}),t.jsxs("h1",{className:"mobile-safe-text serif hero-text-reveal hero-text-reveal-headline page-reveal page-reveal-delay-2 mt-5 max-w-4xl text-3xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl",children:[r(a.home.headlineStart)," ",t.jsx("em",{className:"not-italic text-accent",children:r(a.home.headlineEm)})]}),t.jsx("p",{className:"hero-text-reveal hero-text-reveal-subtitle page-reveal page-reveal-delay-3 mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base",children:r(a.home.intro)})]})]}),t.jsx("section",{className:"home-value-proof",children:t.jsxs("div",{className:"container-rl home-value-proof-shell",children:[t.jsxs("div",{className:"home-value-proof-intro",children:[t.jsx("h2",{className:"mobile-safe-text serif home-value-proof-thesis",children:r(a.home.valueProof.thesis)}),t.jsx("p",{className:"mobile-safe-text home-value-proof-explanation",children:r(a.home.valueProof.explanation)})]}),t.jsx("div",{className:"home-value-proof-directions",children:a.home.valueProof.directions.map(e=>t.jsxs("div",{className:"home-value-proof-direction",children:[t.jsx("h3",{className:"mobile-safe-text serif",children:r(e.title)}),t.jsx("p",{className:"mobile-safe-text",children:r(e.text)})]},e.title.en))})]})}),t.jsx("section",{className:"border-t border-rule py-20",children:t.jsxs("div",{className:"container-rl",children:[t.jsx("div",{className:"mb-10 flex flex-wrap items-end justify-between gap-6",children:t.jsx("div",{children:t.jsx("h2",{className:"serif mt-3 max-w-2xl text-2xl text-foreground md:text-4xl",children:r(a.home.directionTitle)})})}),t.jsx("div",{className:"grid gap-4 md:grid-cols-2",children:s.map(e=>{const o=e.to==="/recovery-validation"?{en:"Potential Review",ru:"Оценка потенциала"}:e.title;return t.jsxs(f,{to:e.to,className:"homepage-hub-card group flex min-h-[190px] flex-col p-6 sm:min-h-[210px] md:p-7",children:[t.jsxs("div",{className:"flex items-start justify-between gap-5",children:[t.jsx("h3",{className:"mobile-safe-text serif min-w-0 text-2xl text-foreground transition-colors group-hover:text-accent md:text-[30px] md:leading-tight",children:r(o)}),t.jsx("span",{className:"shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 transition-colors group-hover:text-accent",children:r(a.common.open)})]}),t.jsx("p",{className:"mobile-safe-text mt-auto pt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]",children:r(e.desc)})]},e.to)})})]})}),t.jsx("section",{className:"paper py-16",children:t.jsx("div",{className:"container-rl max-w-3xl",children:t.jsx("p",{className:"serif text-xl leading-snug text-ink md:text-2xl",children:r(a.home.position)})})}),t.jsx("section",{className:"py-20",children:t.jsxs("div",{className:"container-rl",children:[t.jsxs("div",{className:"mb-8 flex flex-wrap items-end justify-between gap-4",children:[t.jsxs("div",{children:[t.jsx("p",{className:"eyebrow text-accent",children:r(a.home.selectedCasesLabel)}),t.jsx("h2",{className:"mobile-safe-text serif mt-3 text-2xl text-foreground md:text-3xl",children:r(a.home.selectedCasesTitle)})]}),t.jsx(f,{to:"/cases",className:"premium-action px-4 py-2 text-[11px] uppercase tracking-[0.18em]",children:r(a.common.viewAllCases)})]}),t.jsx("div",{className:"grid gap-6 md:grid-cols-3",children:i.map(e=>t.jsxs(f,{to:"/cases/$slug",params:{slug:e.slug},className:"group block",children:[t.jsx("div",{className:"aspect-[4/3] overflow-hidden border border-rule bg-muted",children:t.jsx("img",{src:e.img,alt:r(e.title),loading:"lazy",width:1280,height:960,className:"h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"})}),t.jsx("div",{className:"mt-4 flex items-baseline justify-between gap-3",children:t.jsx("h3",{className:"mobile-safe-text serif text-lg text-foreground",children:r(e.title)})})]},e.slug))})]})}),t.jsx("section",{className:"border-t border-rule py-20",children:t.jsxs("div",{className:"container-rl max-w-2xl text-center",children:[t.jsx("p",{className:"eyebrow text-accent",children:r(a.home.confidential)}),t.jsx("h2",{className:"serif mt-5 text-2xl leading-tight text-foreground md:text-3xl",children:r(a.home.ctaTitle)}),t.jsxs("div",{className:"mt-8 flex flex-wrap justify-center gap-3",children:[t.jsx(f,{to:"/submit",className:"premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]",children:r(a.common.submitAnAsset)}),t.jsx(f,{to:"/contact",className:"premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]",children:r(a.common.contact)})]})]})})]})}export{z as component};
