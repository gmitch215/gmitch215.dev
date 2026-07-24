import type { Surface } from '~/utils/planetTextures';

export interface PlanetConfig {
	order: number;
	name: string;
	surface: Surface;
	color: string;
	emissive: string;
	emissiveIntensity: number;
	radius: number;
	roughness: number;
	metalness: number;
	flatShading: boolean;
	spin: number;
	rings?: { color: string; inner: number; outer: number };
	moons?: number;
	satellites?: number;
	atmosphere?: string;
	glow?: number;
	position: [number, number, number];
}

const SEG = 24;
const z = (order: number) => -order * SEG;

export const TRAVEL = 8 * SEG - 8;

export const PLANETS: PlanetConfig[] = [
	{
		order: 1,
		name: 'Genesis',
		surface: 'rock',
		color: '#6b6f5c',
		emissive: '#0a0f06',
		emissiveIntensity: 0,
		radius: 1.5,
		roughness: 1,
		metalness: 0,
		flatShading: false,
		spin: 0.1,
		moons: 1,
		position: [-7, 2, z(1)]
	},
	{
		order: 2,
		name: 'Cubehaven',
		surface: 'grass',
		color: '#5aa84b',
		emissive: '#0e2a10',
		emissiveIntensity: 0.15,
		radius: 2.1,
		roughness: 0.9,
		metalness: 0,
		flatShading: true,
		spin: 0.13,
		position: [8, -3, z(2)]
	},
	{
		order: 3,
		name: 'Forge',
		surface: 'gas',
		color: '#c9863f',
		emissive: '#3a1e08',
		emissiveIntensity: 0.1,
		radius: 2.7,
		roughness: 0.7,
		metalness: 0.1,
		flatShading: false,
		spin: 0.08,
		rings: { color: '#f0d7a0', inner: 3.4, outer: 5.4 },
		moons: 4,
		position: [-9, 3, z(3)]
	},
	{
		order: 4,
		name: 'Anvil',
		surface: 'metal',
		color: '#9aa7b4',
		emissive: '#0e2100',
		emissiveIntensity: 0.3,
		radius: 2.2,
		roughness: 0.35,
		metalness: 0.85,
		flatShading: true,
		spin: 0.14,
		position: [9, -2, z(4)]
	},
	{
		order: 5,
		name: 'Polyglot',
		surface: 'islands',
		color: '#2fa89a',
		emissive: '#0a2b28',
		emissiveIntensity: 0.16,
		radius: 2.3,
		roughness: 0.6,
		metalness: 0.1,
		flatShading: false,
		spin: 0.1,
		satellites: 10,
		position: [-8, 2, z(5)]
	},
	{
		order: 6,
		name: 'Ignition',
		surface: 'lava',
		color: '#ffcf8a',
		emissive: '#ff9a3c',
		emissiveIntensity: 1.5,
		radius: 3,
		roughness: 0.5,
		metalness: 0,
		flatShading: false,
		spin: 0.05,
		glow: 3.2,
		position: [7, 1, z(6)]
	},
	{
		order: 7,
		name: 'Velocity',
		surface: 'energy',
		color: '#bcff43',
		emissive: '#a2f213',
		emissiveIntensity: 1.3,
		radius: 2,
		roughness: 0.5,
		metalness: 0.2,
		flatShading: false,
		spin: 0.5,
		rings: { color: '#a2f213', inner: 2.6, outer: 3.1 },
		glow: 2.2,
		position: [-7, -3, z(7)]
	},
	{
		order: 8,
		name: 'Earth',
		surface: 'earth',
		color: '#2b7fd4',
		emissive: '#08351f',
		emissiveIntensity: 0.2,
		radius: 3,
		roughness: 0.7,
		metalness: 0.1,
		flatShading: false,
		spin: 0.08,
		atmosphere: '#7fe3b0',
		moons: 1,
		glow: 1.4,
		position: [3, 1, z(8)]
	}
];
