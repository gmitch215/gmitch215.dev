import typography from '@tailwindcss/typography';
import typewriter from './plugins/tailwind/typewriter';

// content is auto-detected by Tailwind v4; this config only carries plugins
export default {
	plugins: [typography, typewriter]
};
