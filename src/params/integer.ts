import type { ParamMatcher } from '@sveltejs/kit';

// Example: match numeric IDs only
// usage: src/routes/items/[id=integer]/+page.svelte
export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param);
};
