<template>
	<div class="absolute inset-0 overflow-hidden bg-[#04060b]">
		<div class="cosmos absolute inset-0" />
		<svg
			class="absolute inset-0 h-full w-full"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
		>
			<circle
				v-for="(s, i) in stars"
				:key="i"
				:cx="s.x"
				:cy="s.y"
				:r="s.s * 0.12"
				fill="#eafff0"
				:opacity="s.o"
				:class="{ twinkle: s.tw }"
				:style="s.tw ? { '--o': s.o, '--tw-delay': s.td, '--tw-dur': s.tdur } : undefined"
			/>
		</svg>
		<div class="orb orb-amber" />
		<div class="orb orb-teal" />
		<div class="orb orb-lime" />
		<div class="orb orb-earth" />
		<span class="comet comet-1" />
		<span class="comet comet-2" />
		<span class="comet comet-3" />
	</div>
</template>

<script setup lang="ts">
const stars = Array.from({ length: 96 }, (_, i) => {
	const a = i * 2.399963;
	const r = Math.sqrt((i + 0.5) / 96);
	return {
		x: 50 + Math.cos(a) * r * 54,
		y: 50 + Math.sin(a) * r * 52,
		s: i % 6 === 0 ? 1.8 : 1,
		o: 0.25 + (i % 8) / 12,
		tw: i % 4 === 0,
		td: `${((i % 7) * 0.6).toFixed(2)}s`,
		tdur: `${(2.4 + (i % 5) * 0.7).toFixed(2)}s`
	};
});
</script>

<style scoped>
.cosmos {
	background:
		radial-gradient(circle at 70% 30%, rgba(73, 120, 0, 0.22), transparent 45%),
		radial-gradient(circle at 20% 80%, rgba(43, 127, 212, 0.15), transparent 45%),
		radial-gradient(circle at 50% 50%, #071006, #04060b 80%);
}
.orb {
	position: absolute;
	border-radius: 9999px;
	filter: blur(2px);
}
.orb-amber {
	width: 90px;
	height: 90px;
	top: 14%;
	left: 12%;
	background: radial-gradient(circle at 35% 30%, #e6b366, #7a4a12 70%, transparent);
	box-shadow: 0 0 60px rgba(201, 134, 63, 0.4);
}
.orb-teal {
	width: 70px;
	height: 70px;
	top: 22%;
	right: 16%;
	background: radial-gradient(circle at 35% 30%, #4fd6c4, #145049 70%, transparent);
}
.orb-lime {
	width: 60px;
	height: 60px;
	bottom: 18%;
	left: 18%;
	background: radial-gradient(circle at 40% 35%, #d6ff8a, #4a9200 70%, transparent);
	box-shadow: 0 0 70px rgba(162, 242, 19, 0.45);
}
.orb-earth {
	width: 150px;
	height: 150px;
	right: 12%;
	bottom: 12%;
	background: radial-gradient(circle at 38% 32%, #7fe3b0, #2b7fd4 55%, #0c2f4a 80%, transparent);
	box-shadow: 0 0 90px rgba(127, 227, 176, 0.35);
}
.comet {
	position: absolute;
	top: 0;
	left: 0;
	width: 3px;
	height: 3px;
	border-radius: 9999px;
	background: #eafff0;
	box-shadow:
		0 0 6px 2px rgba(188, 255, 67, 0.85),
		0 0 14px rgba(162, 242, 19, 0.5);
	opacity: 0;
	will-change: transform, opacity;
}
.comet::before {
	content: '';
	position: absolute;
	top: 50%;
	right: 2px;
	width: 120px;
	height: 2px;
	transform: translateY(-50%);
	border-radius: 9999px;
	background: linear-gradient(to left, rgba(188, 255, 67, 0.9), rgba(162, 242, 19, 0));
}
.comet-1 {
	animation: comet-1 8s ease-in-out 1s infinite;
}
.comet-2 {
	animation: comet-2 11s ease-in-out 4.5s infinite;
}
.comet-3 {
	animation: comet-3 9.5s ease-in-out 7s infinite;
}
@keyframes comet-1 {
	0% {
		transform: translate(-18vmax, -14vmax) rotate(30deg);
		opacity: 0;
	}
	4% {
		opacity: 1;
	}
	38% {
		opacity: 1;
	}
	44% {
		transform: translate(107vmax, 58vmax) rotate(30deg);
		opacity: 0;
	}
	100% {
		transform: translate(107vmax, 58vmax) rotate(30deg);
		opacity: 0;
	}
}
@keyframes comet-2 {
	0% {
		transform: translate(-20vmax, 5vmax) rotate(41deg);
		opacity: 0;
	}
	5% {
		opacity: 1;
	}
	40% {
		opacity: 1;
	}
	46% {
		transform: translate(90vmax, 100vmax) rotate(41deg);
		opacity: 0;
	}
	100% {
		transform: translate(90vmax, 100vmax) rotate(41deg);
		opacity: 0;
	}
}
@keyframes comet-3 {
	0% {
		transform: translate(115vmax, -12vmax) rotate(147deg);
		opacity: 0;
	}
	5% {
		opacity: 1;
	}
	40% {
		opacity: 1;
	}
	47% {
		transform: translate(-5vmax, 66vmax) rotate(147deg);
		opacity: 0;
	}
	100% {
		transform: translate(-5vmax, 66vmax) rotate(147deg);
		opacity: 0;
	}
}
.twinkle {
	animation: twinkle var(--tw-dur, 3s) ease-in-out var(--tw-delay, 0s) infinite;
}
@keyframes twinkle {
	0%,
	100% {
		opacity: var(--o, 0.6);
	}
	50% {
		opacity: calc(var(--o, 0.6) * 0.3);
	}
}
@media (prefers-reduced-motion: reduce) {
	.comet,
	.twinkle {
		animation: none;
	}
	.comet {
		opacity: 0;
	}
}
</style>
