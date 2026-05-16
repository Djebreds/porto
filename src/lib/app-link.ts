import { resolve } from '$app/paths';

const toResolved = resolve as unknown as (path: string) => string;

/** Internal app links compatible with configured `paths.base` */
export function appLink(href: string): string {
	if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
		return href;
	}
	if (href.startsWith('#')) {
		return href;
	}
	const hashIdx = href.indexOf('#');
	if (href.startsWith('/') && hashIdx !== -1) {
		const pathPart = href.slice(0, hashIdx) || '/';
		const hash = href.slice(hashIdx + 1);
		return `${toResolved(pathPart)}#${hash}`;
	}
	if (href.startsWith('/')) {
		return toResolved(href);
	}
	return href;
}
