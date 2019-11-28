<script>
  import { link } from 'svelte-spa-router'


  export let isAuthenticated = false
</script>

<nav>
  <ul>
    {#if isAuthenticated}
    <li><a use:link href="/">/</a></li>
    <li><a use:link href="/home">Home</a></li>
    <li><a use:link href="/nest">Nest</a></li>
    <li><a use:link href="/nest/first">Nest #First</a></li>
    {:else}
    <li><a use:link href="/">/</a></li>
    <li><a use:link href="/login">Login</a></li>
    {/if}

  </ul>
</nav>

<style>

nav {
  border-bottom: 3px solid #111;
}

li {
  display: inline-block;
}

a {
  display: block;
  padding: 0.5em;
  margin: 0.125em;

  background-color: #eee;

  transition: background-color 0.2s;
}

a:hover,
a:focus,
a:active {
  background-color: #ddd;
}

</style>
