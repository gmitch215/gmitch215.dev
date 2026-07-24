export const GRAVATAR_HASH = '0a21a5244a8953b2afe451dbf2978755b27aab8b84a80400e551775dd456327b';

export type GravatarFallback = 'identicon' | 'mp' | 'retro' | 'robohash' | 'monsterid' | '404';

/** avatar URL for the primary email; `d` is the fallback when no gravatar is set */
export function gravatarUrl(size = 200, d: GravatarFallback = 'identicon'): string {
	return `https://gravatar.com/avatar/${GRAVATAR_HASH}?s=${size}&d=${d}`;
}

/** escape hatch: hash an arbitrary email (client-only; async via SubtleCrypto) */
export async function gravatarUrlFor(
	email: string,
	size = 200,
	d: GravatarFallback = 'identicon'
): Promise<string> {
	const data = new TextEncoder().encode(email.trim().toLowerCase());
	const buf = await crypto.subtle.digest('SHA-256', data);
	const hash = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
	return `https://gravatar.com/avatar/${hash}?s=${size}&d=${d}`;
}
