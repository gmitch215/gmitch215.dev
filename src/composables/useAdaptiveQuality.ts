import { useStorage } from '@vueuse/core';
import { computed, readonly, ref, watch } from 'vue';

export type Tier = 'off' | 'low' | 'medium' | 'high' | 'ultra';
export type QualityPref = 'auto' | Tier;

export const TIER_ORDER: Tier[] = ['off', 'low', 'medium', 'high', 'ultra'];

export interface QualitySettings {
	render3D: boolean;
	shaderBg: boolean;
	postFX: boolean;
	dprCap: number;
	globePoints: number;
	particleScale: number;
	antialias: boolean;
}

const PRESETS: Record<Tier, QualitySettings> = {
	off: {
		render3D: false,
		shaderBg: false,
		postFX: false,
		dprCap: 1,
		globePoints: 0,
		particleScale: 0,
		antialias: false
	},
	low: {
		render3D: true,
		shaderBg: false,
		postFX: false,
		dprCap: 1,
		globePoints: 1800,
		particleScale: 0.35,
		antialias: false
	},
	medium: {
		render3D: true,
		shaderBg: false,
		postFX: false,
		dprCap: 1.1,
		globePoints: 3800,
		particleScale: 0.6,
		antialias: true
	},
	high: {
		render3D: true,
		shaderBg: true,
		postFX: false,
		dprCap: 1.35,
		globePoints: 7000,
		particleScale: 0.85,
		antialias: true
	},
	ultra: {
		render3D: true,
		shaderBg: true,
		postFX: true,
		dprCap: 1.5,
		globePoints: 12000,
		particleScale: 1,
		antialias: true
	}
};

export interface Capabilities {
	cores: number;
	memory: number | null;
	webgl2: boolean;
	renderer: string;
	maxTextureSize: number;
	software: boolean;
	coarsePointer: boolean;
	reducedMotion: boolean;
	saveData: boolean;
}

const idx = (t: Tier) => TIER_ORDER.indexOf(t);
const minTier = (a: Tier, b: Tier): Tier => TIER_ORDER[Math.min(idx(a), idx(b))];
const lower = (t: Tier): Tier => TIER_ORDER[Math.max(0, idx(t) - 1)];

const pref = ref<QualityPref>('auto');
const detected = ref<Tier>('off');
const runtimeCap = ref<Tier>('ultra');
const caps = ref<Capabilities | null>(null);
const ready = ref(false);
let initialized = false;

function probe(): { tier: Tier; capabilities: Capabilities } {
	const nav = navigator as Navigator & {
		deviceMemory?: number;
		connection?: { saveData?: boolean; effectiveType?: string };
	};
	const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const coarsePointer = matchMedia('(pointer: coarse)').matches;
	const saveData = !!nav.connection?.saveData;
	const slowNet = /(^|\b)(2g|slow-2g)\b/.test(nav.connection?.effectiveType ?? '');
	const cores = nav.hardwareConcurrency || 4;
	const memory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null;

	let webgl2 = false;
	let renderer = 'unknown';
	let maxTextureSize = 0;
	let hasGL = false;
	try {
		const c = document.createElement('canvas');
		const gl =
			(c.getContext('webgl2') as WebGL2RenderingContext | null) ??
			(c.getContext('webgl') as WebGLRenderingContext | null);
		if (gl) {
			hasGL = true;
			webgl2 =
				'WebGL2RenderingContext' in globalThis &&
				gl instanceof
					(globalThis as { WebGL2RenderingContext: typeof WebGL2RenderingContext })
						.WebGL2RenderingContext;
			maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
			const dbg = gl.getExtension('WEBGL_debug_renderer_info');
			if (dbg) renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
		}
	} catch {
		hasGL = false;
	}

	const software = /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(renderer);
	const capabilities: Capabilities = {
		cores,
		memory,
		webgl2,
		renderer,
		maxTextureSize,
		software,
		coarsePointer,
		reducedMotion,
		saveData
	};

	if (reducedMotion || !hasGL || software || saveData || slowNet) {
		return { tier: 'off', capabilities };
	}

	let score = 0;
	score += cores >= 8 ? 2 : cores >= 4 ? 1 : 0;
	score += memory === null ? 1 : memory >= 8 ? 2 : memory >= 4 ? 1 : 0;
	score += webgl2 ? 1 : 0;
	score += maxTextureSize >= 8192 ? 1 : 0;
	if (coarsePointer) score -= 1;

	let tier: Tier = score >= 6 ? 'ultra' : score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
	if (coarsePointer) tier = minTier(tier, 'high');
	return { tier, capabilities };
}

let rafId = 0;
let activeScenes = 0;
let frames = 0;
let lastStamp = 0;
let lowStreak = 0;
let cooldownUntil = 0;
const LOW_FPS = 45;

function tick(now: number) {
	frames++;
	const dt = now - lastStamp;
	if (dt >= 1000) {
		const fps = (frames * 1000) / dt;
		frames = 0;
		lastStamp = now;
		if (pref.value === 'auto' && now > cooldownUntil) {
			if (fps < LOW_FPS) {
				lowStreak++;
				if (lowStreak >= 2) {
					const effective = minTier(detected.value, runtimeCap.value);
					if (idx(effective) > 0) {
						runtimeCap.value = lower(effective);
						cooldownUntil = now + 4000;
					}
					lowStreak = 0;
				}
			} else {
				lowStreak = 0;
			}
		}
	}
	rafId = requestAnimationFrame(tick);
}

function startWatchdog() {
	if (rafId || typeof requestAnimationFrame === 'undefined') return;
	frames = 0;
	lastStamp = performance.now();
	rafId = requestAnimationFrame(tick);
}
function stopWatchdog() {
	if (rafId) cancelAnimationFrame(rafId);
	rafId = 0;
}

function ensureInit() {
	if (initialized || !import.meta.client) return;
	initialized = true;
	const stored = useStorage<QualityPref>('gm-quality', 'auto');
	const validPrefs: QualityPref[] = ['auto', ...TIER_ORDER];
	pref.value = validPrefs.includes(stored.value) ? stored.value : 'auto';
	watch(pref, (v) => (stored.value = v));

	const { tier, capabilities } = probe();
	detected.value = tier;
	caps.value = capabilities;
	ready.value = true;

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopWatchdog();
		else if (activeScenes > 0) startWatchdog();
	});
}

export function useAdaptiveQuality() {
	ensureInit();

	const tier = computed<Tier>(() => {
		const p = pref.value;
		if (p !== 'auto' && (TIER_ORDER as string[]).includes(p)) return p as Tier;
		return minTier(detected.value, runtimeCap.value);
	});

	const settings = computed<QualitySettings>(() => PRESETS[tier.value] ?? PRESETS.off);

	function setQuality(p: QualityPref) {
		pref.value = p;
		if (p === 'auto') runtimeCap.value = 'ultra';
	}

	function cycleQuality() {
		const order: QualityPref[] = ['auto', 'ultra', 'high', 'medium', 'low', 'off'];
		const next = order[(order.indexOf(pref.value) + 1) % order.length];
		setQuality(next);
	}

	function registerScene() {
		if (!import.meta.client) return () => {};
		activeScenes++;
		if (!document.hidden) startWatchdog();
		return () => {
			activeScenes = Math.max(0, activeScenes - 1);
			if (activeScenes === 0) stopWatchdog();
		};
	}

	return {
		tier,
		settings,
		pref: readonly(pref),
		isAuto: computed(() => pref.value === 'auto'),
		capabilities: readonly(caps),
		ready: readonly(ready),
		options: ['auto', 'ultra', 'high', 'medium', 'low', 'off'] as QualityPref[],
		setQuality,
		cycleQuality,
		registerScene
	};
}
