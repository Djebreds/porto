// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	/** View Transitions API (Chromium); see https://svelte.dev/blog/view-transitions */
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition?: (callback: () => Promise<void>) => ViewTransition;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			metaTitle?: string;
			metaDescription?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
