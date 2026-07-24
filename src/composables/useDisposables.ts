export function useDisposables() {
	const items: { dispose(): void }[] = [];
	const track = <T extends { dispose(): void }>(x: T): T => {
		items.push(x);
		return x;
	};
	onScopeDispose(() => items.forEach((d) => d.dispose()));
	return { track };
}
