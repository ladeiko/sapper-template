<script lang="ts">
  export let name;
  import { Button } from 'sveltestrap/src';

  let buttonText = 'Button'

  function handleClick() {
    buttonText = 'Button Clicked'
  }

</script>

<div class="text-center">
    <h1>Hello {name}!</h1>
    <Button on:click="{handleClick}">{buttonText}</Button>
</div>
