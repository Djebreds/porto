/** Browser-only Mermaid hydration for `<pre class="mermaid">` (Marked) and mdsvex/Shiki `<pre><code class="language-mermaid">`. */

let initDone = false;
let hydrationGen = 0;

function normalizeMermaidBlocks(container: HTMLElement): void {
	for (const pre of container.querySelectorAll('pre')) {
		if (pre.classList.contains('mermaid')) continue;
		const code =
			pre.querySelector(':scope > code.language-mermaid') ??
			pre.querySelector(':scope > code[class*="language-mermaid"]');
		if (!code) continue;
		pre.classList.add('mermaid');
		pre.replaceChildren(document.createTextNode(code.textContent ?? ''));
	}
}

export async function hydrateMermaidIn(container: HTMLElement): Promise<void> {
	normalizeMermaidBlocks(container);

	const nodes = container.querySelectorAll<HTMLElement>('pre.mermaid');
	if (!nodes.length) return;

	const gen = ++hydrationGen;
	const mermaidMod = await import('mermaid');
	const mermaid = mermaidMod.default;

	if (!initDone) {
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'strict',
			theme: 'dark',
			fontFamily:
				'Circular Std, ui-sans-serif, system-ui, sans-serif',
			themeVariables: {
				darkMode: true,
				background: '#0a0a0c',
				mainBkg: '#15273f',
				primaryColor: '#223f66',
				primaryTextColor: '#e5e5e5',
				secondaryColor: '#1e293b',
				lineColor: '#64748b',
				nodeBorder: '#3868a7',
				clusterBkg: 'rgba(34, 63, 102, 0.35)',
				clusterBorder: 'rgba(56, 104, 167, 0.45)',
				edgeLabelBackground: 'rgba(15, 23, 42, 0.92)',
				titleColor: '#c2e5ff'
			}
		});
		initDone = true;
	}

	if (gen !== hydrationGen) return;

	try {
		await mermaid.run({ nodes: [...nodes] });
	} catch (err) {
		console.error('[mermaid]', err);
		for (const node of nodes) {
			if (node.dataset.mermaidErrorShown === '1') continue;
			node.dataset.mermaidErrorShown = '1';
			const msg = document.createElement('p');
			msg.className = 'mt-2 text-xs text-amber-200/90';
			msg.textContent =
				'Diagram failed to render. Check the mermaid syntax in the Markdown source.';
			node.parentElement?.append(msg);
		}
	}
}
