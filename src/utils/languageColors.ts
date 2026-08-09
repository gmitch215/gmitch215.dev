const COLORS: Record<string, string> = {
	Java: '#e76f00',
	Kotlin: '#a97bff',
	TypeScript: '#3178c6',
	JavaScript: '#e8d44d',
	C: '#a8b9cc',
	'C++': '#6a96cf',
	Python: '#4b8bbe',
	Vue: '#42b883',
	PHP: '#8892bf',
	Rust: '#e08a5a',
	Shell: '#89e051',
	CMake: '#3f8bd8',
	Swift: '#f05138',
	HTML: '#e34c26',
	CSS: '#8a63d2',
	'Multi-language': '#cbd5e1'
};

export function languageColor(name: string): string {
	return COLORS[name] ?? '#94a3b8';
}
