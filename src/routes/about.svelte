<svelte:head>
	<title>About</title>
</svelte:head>


<script>
	import { Button } from 'sveltestrap/src';
	const handleClick = () => alert('I warned you!');
</script>

<Button color="danger" on:click={handleClick}>Do Not Press</Button>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
