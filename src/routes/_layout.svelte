<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { setUserStateStoreForContext } from "../client/stores/userstate";
	import { createUserStateStore } from "../client/stores/userstate";

	export let segment: string;

	const userStateStore = createUserStateStore();
	setUserStateStoreForContext(userStateStore);

</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
