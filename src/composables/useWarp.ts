export function useWarp() {
	const warping = useState<boolean>('gm-warp', () => false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function warp(ms = 900) {
		if (!import.meta.client) return;
		warping.value = true;
		clearTimeout(timer);
		timer = setTimeout(() => (warping.value = false), ms);
	}

	return { warping, warp };
}
