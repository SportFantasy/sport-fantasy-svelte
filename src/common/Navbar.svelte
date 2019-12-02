<script>
  import { link } from "svelte-spa-router";

  export let isAuthenticated;
</script>
<style>
.nav-wrapper {
  padding-left: 10vw;
}
</style>

<nav>
  <div class="nav-wrapper flex-column justify-content-space-around hv-5">
    <div class="container">
      <ul id="nav-mobile" class="left hide-on-med-and-down flex-row">
        {#if isAuthenticated}
          <li class="p-10">
            <a use:link href="/">Home</a>
          </li>
          <li class="p-10">
            <a use:link href="/games">Games</a>
          </li>
          <li class="p-10">
            <a use:link href="/submit-game">Submit Game</a>
          </li>
          <li class="p-10">
            <a use:link href="/user">User</a>
          </li>
          <li class="p-10">
            <a use:link href="/logout">Log Out</a>
          </li>
        {:else}
          <li class="p-10">
            <a use:link href="/login">Login</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
