import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

const bundledLangs = [
	'bash',
	'css',
	'docker',
	'graphql',
	'html',
	'javascript',
	'json',
	'jsx',
	'markdown',
	'shell',
	'ruby',
	'sql',
	'svelte',
	'tsx',
	'typescript',
	'yaml'
];

const highlighterPromise = createHighlighter({
	themes: ['github-dark'],
	langs: bundledLangs
});

function escapeHtml(text) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

/** Escape braces so Svelte doesn't try to parse highlighted HTML as template expressions */
function escapeSvelteBraces(html) {
	return html.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
}

/** mdsvex highlighter using Shiki (build-time, same output as markdown.ts) */
async function mdsvexHighlighter(code, lang) {
	if (lang === 'mermaid') {
		const safe = escapeHtml(code);
		return `<div class="markdown-mermaid not-prose my-8 overflow-x-auto rounded-xl border border-white/10 bg-neutral-950/90 p-4 shadow-inner shadow-black/30"><pre class="mermaid">${safe}</pre></div>`;
	}

	const hl = await highlighterPromise;
	const loaded = hl.getLoadedLanguages();
	const normalized = lang && loaded.includes(lang) ? lang : 'typescript';
	const highlighted = hl.codeToHtml(code, {
		lang: normalized,
		theme: 'github-dark'
	});
	const wrapped = `<div class="markdown-code not-prose my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40">${highlighted}</div>`;
	return escapeSvelteBraces(wrapped);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx'],
			highlight: {
				highlighter: mdsvexHighlighter
			}
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
