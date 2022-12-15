<script lang="ts">
	export let data: { url: string };
	import { onMount } from 'svelte';

	onMount(() => {
		window.location.assign(data.url);
	});
</script>

<a class="underline" href={data.url}>You're being redirected, click here to be redirected sooner.</a
>
