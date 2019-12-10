<script>
  import { link } from "svelte-spa-router";

  export let isAuthenticated;
</script>

<nav>
    <ul class="wrapper">
      {#if isAuthenticated}
        <li>
          <a use:link href="/">Home</a>
        </li>
        <li>
          <a use:link href="/games">Games</a>
        </li>
        <li>
          <a use:link href="/submit-game">Submit Game</a>
        </li>
        <li>
          <a use:link href="/profile">Profile</a>
        </li>
        <li>
          <a use:link href="/confirm">Confirm</a>
        </li>
        <li>
          <a use:link href="/logout">Log Out</a>
        </li>
      {:else}
        <li>
          <a use:link href="/login">Login</a>
        </li>
      {/if}
    </ul>
</nav>

<style>
nav {
    background-image: linear-gradient(var(--palette-color-1) 0%, var(--palette-color-2) 100%);
}
li {
  display: inline-block;
}
a {
  display: inline-block;
  color: var(--main-text-color);
  padding: 0.5em;
  transition: color 0.15s;
}
a:hover,
a:focus {
  color: var(--palette-color-5);
}
</style>
