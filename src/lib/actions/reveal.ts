import type { Action } from 'svelte/action';

type RevealOptions = {
	/** Translate direction: 'up' | 'down' | 'left' | 'right' (default: 'up') */
	direction?: 'up' | 'down' | 'left' | 'right';
	/** Distance in px (default: 24) */
	distance?: number;
	/** Duration in ms (default: 600) */
	duration?: number;
	/** Delay in ms (default: 0) */
	delay?: number;
	/** IntersectionObserver threshold (default: 0.15) */
	threshold?: number;
};

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const {
		direction = 'up',
		distance = 24,
		duration = 600,
		delay = 0,
		threshold = 0.15
	} = options ?? {};

	const translate = {
		up:    `translateY(${distance}px)`,
		down:  `translateY(-${distance}px)`,
		left:  `translateX(${distance}px)`,
		right: `translateX(-${distance}px)`
	}[direction];

	// Set initial hidden state
	node.style.opacity = '0';
	node.style.transform = translate;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'none';
					observer.unobserve(node);
				}
			}
		},
		{ threshold }
	);

	// Respect prefers-reduced-motion
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		node.style.transition = 'none';
	} else {
		observer.observe(node);
	}

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
