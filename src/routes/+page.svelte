<script lang="ts">
	import type { ShortURL } from '@prisma/client';
	let inputValue: string;
	let ghostLinkElem: HTMLParagraphElement;

	const isURL = (url: string) => {
		if (
			url.toLowerCase().startsWith('http') &&
			url.length < 2048 &&
			!url.includes(window.location.origin)
		)
			return true;
	};

	const submitForShortening = async () => {
		if (isURL(inputValue + '')) {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url: inputValue })
			});
			const data: ShortURL = await response.json();
			if (data.shortCode) {
				ghostLinkElem.innerHTML = inputValue;
				inputValue = `${window.location.origin}/go/${data.shortCode}`;

				ghostLinkElem.classList.remove('opacity-0');
				ghostLinkElem.classList.add('opacity-100');
				ghostLinkElem.classList.add('top-2');
				// wait for the animation to finish
				await new Promise((resolve) => setTimeout(resolve, 100));
				ghostLinkElem.classList.add('opacity-0');
				ghostLinkElem.classList.remove('opacity-100');
				await new Promise((resolve) => setTimeout(resolve, 100));
				ghostLinkElem.classList.remove('top-2');
			}
		} else {
			alert('Please enter a valid URL');
		}
	};
</script>

<main class="h-screen w-full flex flex-col gap-4 justify-center items-center">
	<div
		class="bg-stone-800 w-full max-w-[800px] flex flex-col gap-2 border border-stone-700 rounded-md p-4 shadow-md"
	>
		<h1 class="text-2xl font-bold mb-2">URL Shortener</h1>

		<p class="text-stone-500">Paste your long url here:</p>

		<div class="bg-stone-700 relative flex gap-2 border border-stone-600 p-2 rounded-md">
			<input
				placeholder="https://www.google.com/"
				type="text"
				class="bg-transparent border-0 outline-none h-full flex-1"
				bind:value={inputValue}
			/>
			<button
				on:click={submitForShortening}
				class="transition-all bg-purple-600 hover:bg-purple-500 hover:border-purple-400 active:bg-purple-700 active:border-purple-800 text-purple-50 p-4 rounded-md py-2 border-2 border-purple-500 border-b-0 border-r-0"
				>Shorten!</button
			>
			<p
				bind:this={ghostLinkElem}
				class="absolute transition-all opacity-0 pointer-events-none top-1/2 left-2 -translate-y-1/2"
			/>
			<div class="top-2 pointer-events-none" />
		</div>
	</div>
</main>
