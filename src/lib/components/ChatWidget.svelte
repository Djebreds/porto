<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { marked } from 'marked';
	import Send from 'lucide-svelte/icons/send';
	import X from 'lucide-svelte/icons/x';
	import { appLink } from '$lib/app-link';
	import { buildChatPageContext } from '$lib/data/chat-page-context';

	type Role = 'user' | 'assistant';
	type ChatMessage = {
		id: string;
		role: Role;
		text: string;
		html: string;
		streaming?: boolean;
		error?: boolean;
	};

	marked.setOptions({ gfm: true, breaks: true });
	function renderMd(text: string): string {
		return marked.parse(text) as string;
	}

	const chatCtx = $derived(buildChatPageContext(page));

	let active     = $state(false);
	let input      = $state('');
	let typing     = $state(false);
	let viewport   = $state<HTMLDivElement | null>(null);
	let textareaEl = $state<HTMLTextAreaElement | null>(null);

	const history  = $state<{ role: Role; content: string }[]>([]);
	const messages = $state<ChatMessage[]>([
		{
			id: crypto.randomUUID?.() ?? `${Date.now()}`,
			role: 'assistant',
			text: "Hi — I'm Refi's AI assistant. Ask me about this page, his stack, experience, blog, or how to get in touch.",
			html: renderMd("Hi — I'm Refi's AI assistant. Ask me about this page, his stack, experience, blog, or how to get in touch.")
		}
	]);

	function isNearBottom(): boolean {
		if (!viewport) return true;
		return viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 80;
	}

	async function scrollToEnd(force = false) {
		if (!force && !isNearBottom()) return;
		await tick();
		viewport?.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
	}

	async function handleSend() {
		const q = input.trim();
		if (!q || typing) return;
		input = '';
		active = true;

		messages.push({ id: crypto.randomUUID?.() ?? `${Date.now()}-u`, role: 'user', text: q, html: renderMd(q) });
		history.push({ role: 'user', content: q });
		await scrollToEnd(true);

		const assistantId = crypto.randomUUID?.() ?? `${Date.now()}-a`;
		messages.push({ id: assistantId, role: 'assistant', text: '', html: '', streaming: true });
		typing = true;
		await scrollToEnd(true);

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: history, context: chatCtx })
			});

			if (!res.ok || !res.body) {
				showError();
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let fullText = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				fullText += decoder.decode(value, { stream: true });
				setLastMessage(fullText);
				await scrollToEnd();
			}

			const last = messages[messages.length - 1];
			if (last?.role === 'assistant') last.streaming = false;
			history.push({ role: 'assistant', content: fullText });
		} catch (e) {
			console.error('[chat]', e);
			showError();
		} finally {
			typing = false;
			await scrollToEnd(true);
		}
	}

	function showError() {
		const last = messages[messages.length - 1];
		if (last?.role === 'assistant') {
			last.streaming = false;
			last.error = true;
			last.text = "Couldn't process the request. Please try again.";
			last.html = last.text;
		}
		// Remove from history so the user can retry cleanly
		history.splice(history.length - 1, 1);
	}

	function setLastMessage(text: string) {
		const last = messages[messages.length - 1];
		if (last?.role === 'assistant') {
			last.text = text;
			last.html = renderMd(text);
		}
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			void handleSend();
		}
	}

	function dismiss() {
		active = false;
		textareaEl?.blur();
	}

	function onBackdropPointerDown(e: PointerEvent) {
		e.preventDefault();
		dismiss();
	}

	function onGlobalKeydown(e: KeyboardEvent) {
		if (e.key !== 'Escape') return;
		dismiss();
	}

	async function onFocusInput() {
		active = true;
		await tick();
		await scrollToEnd(true);
	}

	$effect(() => {
		if (!active || typeof window === 'undefined') return;
		window.addEventListener('keydown', onGlobalKeydown);
		return () => window.removeEventListener('keydown', onGlobalKeydown);
	});

	$effect(() => {
		if (active) void scrollToEnd(true);
	});
</script>

<!-- Dim overlay -->
{#if active}
	<button
		type="button"
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[38] cursor-default border-0 bg-black/20 p-0"
		aria-label="Close chat"
		onpointerdown={onBackdropPointerDown}
	></button>
{/if}

<div
	class="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex flex-col items-center px-3 pb-4 sm:pb-6"
>
	{#if active}
		<div class="pointer-events-auto mb-2 flex w-full max-w-2xl flex-col">
			<!-- Header -->
			<div class="mb-1 flex items-start justify-between gap-2 px-3">
				<div class="flex min-w-0 flex-col gap-0.5">
					<span class="flex items-center gap-1.5 text-xs font-medium text-neutral-300">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary-300 shadow-[0_0_6px] shadow-secondary-300/70" aria-hidden="true"></span>
						Portfolio assistant
					</span>
					<span class="truncate text-[11px] text-slate-500" title={chatCtx.pathname}>
						On this page: {chatCtx.label}
					</span>
				</div>
				<button
					type="button"
					class="inline-flex shrink-0 rounded-full p-2 text-slate-500 transition-colors hover:bg-primary-500/20 hover:text-primary-500"
					onclick={dismiss}
					aria-label="Close chat"
				>
					<X class="h-4 w-4" />
				</button>
			</div>

			<!-- Message list -->
			<div
				bind:this={viewport}
				class="glass-frost max-h-[30vh] overflow-y-auto rounded-3xl bg-primary-100/10 px-4 py-3 shadow-lg shadow-black/[0.04]"
				aria-live="polite"
				aria-label="Chat messages"
			>
				<div class="flex flex-col gap-3">
					{#each messages as m (m.id)}
						<div class="flex {m.role === 'user' ? 'justify-end' : 'justify-start'}">
							<div
								class="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed {m.role === 'user'
									? 'bg-gradient-to-br from-primary-500/70 to-primary-600/80 text-white'
									: m.error
										? 'border border-red-500/20 bg-red-950/30 text-red-300'
										: 'border border-white/10 bg-white/5 text-neutral-100'}"
							>
								{#if m.role === 'assistant' && typing && m === messages[messages.length - 1] && m.text === ''}
									<span class="flex gap-1 py-0.5" aria-label="Thinking">
										<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style="animation-delay:0ms"></span>
										<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style="animation-delay:150ms"></span>
										<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style="animation-delay:300ms"></span>
									</span>
								{:else if m.role === 'assistant'}
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									<div class="chat-prose">{@html m.html}{#if m.streaming}<span class="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-neutral-300 align-middle"></span>{/if}</div>
								{:else}
									<p class="whitespace-pre-wrap">{m.text}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Composer -->
	<div class="pointer-events-auto w-full max-w-2xl">
		<div
			class="glass-frost flex min-h-12 items-end gap-3 rounded-full bg-primary-100/10 px-3 py-2 shadow-lg shadow-black/[0.04] transition-shadow duration-200 focus-within:shadow-lg focus-within:shadow-primary-500/10"
		>
			<textarea
				bind:this={textareaEl}
				bind:value={input}
				rows="1"
				maxlength="4000"
				class="max-h-32 min-h-[1.25rem] w-full resize-none bg-transparent py-2 pr-1 pl-2 text-sm font-normal text-white outline-none placeholder:text-slate-500"
				placeholder="Ask about this page or anything else…"
				{onkeydown}
				onfocus={onFocusInput}
			></textarea>
			<button
				type="button"
				class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/50 text-white transition-colors hover:bg-primary-500/65 disabled:pointer-events-none disabled:opacity-40"
				disabled={!input.trim() || typing}
				onclick={() => void handleSend()}
				aria-label="Send message"
			>
				<Send class="h-4 w-4" />
			</button>
		</div>
	</div>
</div>
