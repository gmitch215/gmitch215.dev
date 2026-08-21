import * as THREE from 'three';
import type { Surface } from '~/data/planets';

const SURFACE_TYPE: Record<Surface, number> = {
	earth: 0,
	gas: 1,
	lava: 2,
	metal: 3,
	grass: 4,
	islands: 5,
	rock: 6,
	energy: 7,
	wasm: 8,
	hive: 9
};

interface Palette {
	a: string;
	b: string;
	c: string;
	atmo: string;
	emissive: string;
}

const PALETTE: Record<Surface, Palette> = {
	earth: { a: '#0f4c81', b: '#2f7d4f', c: '#eaf6ff', atmo: '#7fc9ff', emissive: '#ffd27a' },
	gas: { a: '#8a4e1e', b: '#e6b366', c: '#c9863f', atmo: '#f0d7a0', emissive: '#000000' },
	lava: { a: '#1a0e06', b: '#3a1e08', c: '#2a160a', atmo: '#ff8a1e', emissive: '#ff8a1e' },
	metal: { a: '#79879a', b: '#8a97a6', c: '#c2d0dd', atmo: '#a2f213', emissive: '#a2f213' },
	grass: { a: '#3c7d38', b: '#4e9a45', c: '#8fb85a', atmo: '#9fe08a', emissive: '#000000' },
	islands: { a: '#0f4a48', b: '#2fa89a', c: '#5fc059', atmo: '#7fe3d0', emissive: '#000000' },
	rock: { a: '#3a3c30', b: '#6b6f5c', c: '#8c9074', atmo: '#8c9074', emissive: '#000000' },
	energy: { a: '#15220a', b: '#2a3a12', c: '#bcff43', atmo: '#bcff43', emissive: '#bcff43' },
	wasm: { a: '#08243c', b: '#0678be', c: '#f38020', atmo: '#f38020', emissive: '#f38020' },
	hive: { a: '#1a1033', b: '#3d2a6b', c: '#8b6fd4', atmo: '#c9a6ff', emissive: '#ffcf7a' }
};

const vertexShader = /* glsl */ `
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vViewDir;
uniform float uSeed;
void main() {
	vDir = normalize(position);
	vec4 wp = modelMatrix * vec4(position, 1.0);
	vNormalW = normalize(mat3(modelMatrix) * normal);
	vViewDir = normalize(cameraPosition - wp.xyz);
	gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

// ashima/webgl-noise snoise(vec3) (MIT) + fbm/ridge + parametrized surface
const fragmentShader = /* glsl */ `
#define MAX_OCTAVES 6
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vViewDir;
uniform float uTime;
uniform int uType;
uniform int uOctaves;
uniform vec3 uSunDir;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uAtmo;
uniform vec3 uEmissive;
uniform float uSeed;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
	const vec2 C = vec2(1.0/6.0, 1.0/3.0);
	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
	vec3 i = floor(v + dot(v, C.yyy));
	vec3 x0 = v - i + dot(i, C.xxx);
	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min(g.xyz, l.zxy);
	vec3 i2 = max(g.xyz, l.zxy);
	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy;
	vec3 x3 = x0 - D.yyy;
	i = mod289(i);
	vec4 p = permute(permute(permute(
		i.z + vec4(0.0, i1.z, i2.z, 1.0))
		+ i.y + vec4(0.0, i1.y, i2.y, 1.0))
		+ i.x + vec4(0.0, i1.x, i2.x, 1.0));
	float n_ = 0.142857142857;
	vec3 ns = n_ * D.wyz - D.xzx;
	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_);
	vec4 x = x_ * ns.x + ns.yyyy;
	vec4 y = y_ * ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);
	vec4 b0 = vec4(x.xy, y.xy);
	vec4 b1 = vec4(x.zw, y.zw);
	vec4 s0 = floor(b0) * 2.0 + 1.0;
	vec4 s1 = floor(b1) * 2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));
	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
	vec3 p0 = vec3(a0.xy, h.x);
	vec3 p1 = vec3(a0.zw, h.y);
	vec3 p2 = vec3(a1.xy, h.z);
	vec3 p3 = vec3(a1.zw, h.w);
	vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
	p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
	vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
	m = m * m;
	return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p){
	float sum = 0.0, amp = 0.5, freq = 1.0;
	for (int i = 0; i < MAX_OCTAVES; i++){
		if (i >= uOctaves) break;
		sum += amp * snoise(p * freq);
		freq *= 2.0; amp *= 0.5;
	}
	return sum;
}
float ridge(vec3 p){
	float sum = 0.0, amp = 0.5, freq = 1.0;
	for (int i = 0; i < MAX_OCTAVES; i++){
		if (i >= uOctaves) break;
		float n = 1.0 - abs(snoise(p * freq));
		sum += amp * n * n;
		freq *= 2.0; amp *= 0.5;
	}
	return sum;
}

vec3 surface(vec3 dir, out float emit){
	emit = 0.0;
	vec3 p = dir * 2.0 + uSeed;

	if (uType == 1){ // gas giant: scrolling domain-warped bands
		float warp = fbm(p + vec3(uTime * 0.03, 0.0, 0.0));
		float t = 0.5 + 0.5 * sin(dir.y * 6.0 + warp * 2.0);
		return mix(uColorA, uColorB, t) + uColorC * warp * 0.12;
	}
	if (uType == 2){ // lava: dark crust, glowing ridged cracks, slow pulse
		float crack = ridge(p * 1.5 + vec3(0.0, uTime * 0.03, 0.0));
		emit = smoothstep(0.55, 0.95, crack) * (0.7 + 0.3 * sin(uTime * 2.0));
		return mix(uColorA, uColorB, fbm(p) * 0.5 + 0.5);
	}
	if (uType == 7){ // energy: all-emissive fast cracks
		float e = ridge(p * 2.0 + vec3(uTime * 0.12));
		emit = smoothstep(0.5, 1.0, e) * (0.6 + 0.4 * sin(uTime * 4.0));
		return mix(uColorA, uColorB, fbm(p) * 0.5 + 0.5);
	}
	if (uType == 3){ // metal: high-freq mottle + faint glowing seams
		float m = fbm(p * 3.0) * 0.5 + 0.5;
		float seam = smoothstep(0.9, 1.0, ridge(p * 1.2));
		emit = seam * 0.5;
		return mix(uColorA, uColorC, m);
	}
	if (uType == 8){ // wasm: plated crust with hot molten seams between the plates
		float plate = fbm(p * 2.4) * 0.5 + 0.5;
		float seam = smoothstep(0.82, 0.99, ridge(p * 1.6));
		emit = seam * (0.75 + 0.25 * sin(uTime * 1.5));
		return mix(mix(uColorA, uColorB, plate), uColorC, seam * 0.7);
	}

	// earth / grass / islands / rock: shared elevation field
	float h = fbm(p) * 0.5 + 0.5;
	float sea = (uType == 0 || uType == 5) ? 0.5 : -1.0;
	if (h < sea) return uColorA;
	float land = smoothstep(sea, 1.0, h);
	vec3 col = mix(uColorB, uColorC, land);
	if (uType == 0 && abs(dir.y) > 0.78)
		col = mix(col, vec3(0.86, 0.9, 0.96), smoothstep(0.78, 0.96, abs(dir.y)));
	return col;
}

void main(){
	float emit;
	vec3 albedo = surface(vDir, emit);
	vec3 N = normalize(vNormalW);
	vec3 V = normalize(vViewDir);

	float ndl = dot(N, normalize(uSunDir));
	float day = smoothstep(-0.12, 0.28, ndl);

	vec3 night = vec3(0.0);
	if (uType == 0){
		float land = step(0.5, fbm(vDir * 2.0 + uSeed) * 0.5 + 0.5);
		float city = step(0.72, fbm(vDir * 9.0 + 20.0) * 0.5 + 0.5);
		night = uEmissive * land * city * (1.0 - day);
	}
	if (uType == 9){
		// settled everywhere, not just on land: a fully inhabited world
		float town = step(0.6, fbm(vDir * 13.0 + 40.0) * 0.5 + 0.5);
		night = uEmissive * town * (1.0 - day) * 1.15;
	}

	vec3 lit = albedo * (0.07 + 0.93 * day);
	lit += uEmissive * emit;
	lit += night;

	float fres = pow(1.0 - max(dot(V, N), 0.0), 3.0);
	lit += uAtmo * fres * (0.35 + 0.65 * day);

	gl_FragColor = vec4(lit, 1.0);
}
`;

export const SUN_DIR = new THREE.Vector3(0.6, 0.35, 0.55).normalize();

// one unit sphere shared by every planet (persistent; scaled per-planet via mesh.scale)
let sphereGeo: THREE.SphereGeometry | null = null;
export function sharedSphere(): THREE.SphereGeometry {
	if (!sphereGeo) sphereGeo = new THREE.SphereGeometry(1, 48, 48);
	return sphereGeo;
}

const SUN = SUN_DIR;
let template: THREE.ShaderMaterial | null = null;

function getTemplate(): THREE.ShaderMaterial {
	if (!template) {
		template = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uType: { value: 0 },
				uOctaves: { value: 4 },
				uSeed: { value: 0 },
				uSunDir: { value: SUN.clone() },
				uColorA: { value: new THREE.Color() },
				uColorB: { value: new THREE.Color() },
				uColorC: { value: new THREE.Color() },
				uAtmo: { value: new THREE.Color() },
				uEmissive: { value: new THREE.Color() }
			}
		});
	}
	return template;
}

export function makePlanetMaterial(
	surface: Surface,
	seed: number,
	octaves: number,
	atmoOverride?: string
): THREE.ShaderMaterial {
	const pal = PALETTE[surface];
	const m = getTemplate().clone();
	m.uniforms.uType.value = SURFACE_TYPE[surface];
	m.uniforms.uOctaves.value = octaves;
	m.uniforms.uSeed.value = seed * 3.17;
	m.uniforms.uColorA.value = new THREE.Color(pal.a).convertSRGBToLinear();
	m.uniforms.uColorB.value = new THREE.Color(pal.b).convertSRGBToLinear();
	m.uniforms.uColorC.value = new THREE.Color(pal.c).convertSRGBToLinear();
	m.uniforms.uAtmo.value = new THREE.Color(atmoOverride || pal.atmo).convertSRGBToLinear();
	m.uniforms.uEmissive.value = new THREE.Color(pal.emissive).convertSRGBToLinear();
	return m;
}
