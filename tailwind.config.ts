import typography from '@tailwindcss/typography'
import typewriter from "./plugins/tailwind/typewriter"

export default {
    content: [
        './src/**/*.{vue,ts,js}',
        './src/app.vue',
    ],
    plugins: [typography, typewriter]
}