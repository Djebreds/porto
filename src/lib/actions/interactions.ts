import type { Action } from 'svelte/action';

const reduced = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type TiltOptions = { max?: number; scale?: number };

/** 3D pointer tilt: rotates the element toward the cursor, springs back on leave. */
export const tilt: Action<HTMLElement, TiltOptions | undefined> = (node, options) => {
	let max = options?.max ?? 8;
	let scale = options?.scale ?? 1.02;
	let raf = 0;

	function onMove(e: PointerEvent) {
		if (reduced()) return;
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			const r = node.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - 0.5;
			const py = (e.clientY - r.top) / r.height - 0.5;
			node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})`;
		});
	}
	function onLeave() {
		cancelAnimationFrame(raf);
		node.style.transform = '';
	}

	node.style.transition = 'transform 350ms cubic-bezier(0.22,1,0.36,1)';
	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', onLeave);

	return {
		update(o) {
			max = o?.max ?? 8;
			scale = o?.scale ?? 1.02;
		},
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
			cancelAnimationFrame(raf);
		}
	};
};

/** Cursor spotlight: writes --mx/--my (px, element-local) for a CSS radial highlight. */
export const spotlight: Action<HTMLElement> = (node) => {
	function onMove(e: PointerEvent) {
		const r = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - r.left}px`);
		node.style.setProperty('--my', `${e.clientY - r.top}px`);
	}
	node.addEventListener('pointermove', onMove);
	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
		}
	};
};
