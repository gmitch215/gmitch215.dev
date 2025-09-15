import type { PluginAPI } from 'tailwindcss/plugin';
import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addBase, matchUtilities }: PluginAPI) {
	addBase({
		'@keyframes typewriter-invisible': {
			'0%': { opacity: '0' },
			'99.9%': { opacity: '0' },
			'100%': { opacity: '1' }
		},
		'@keyframes typewriter-typing': {
			'0%': { width: '0', 'text-wrap': 'no-wrap' },
			'25%': { width: '0' },
			'50%': { width: 'var(--typewriter-width)' },
			'100%': { width: 'var(--typewriter-width)', 'text-wrap': 'wrap' }
		},
		'@keyframes typewriter-blink': {
			'50%': { borderColor: 'transparent' }
		}
	});

	matchUtilities(
		{
			typewriter: (value) => {
				const args = value.split('+');
				const width = args[0];
				const time = args[1] || '3s';
				const delay = args[2] || '0s';

				return {
					'--typewriter-width': `${width}ch`,
					animation: [
						`typewriter-invisible ${delay} steps(1, end) forwards`,
						`typewriter-typing ${time} steps(${width}) forwards ${delay}`,
						`typewriter-blink 0.4s step-end infinite alternate`
					].join(', '),
					whiteSpace: 'nowrap',
					borderRight: '2px solid',
					fontFamily: 'monospace',
					overflow: 'hidden',
					maxWidth: 'fit-content'
				};
			}
		},
		{
			values: { 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' }
		}
	);
});
