<script>
  import { link } from "svelte-spa-router";

  export let isAuthenticated;
</script>

<nav>
  <div class="nav-wrapper">
    <div class="container">
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        {#if isAuthenticated}
          <li>
            <a use:link href="/home">Home</a>
          </li>
          <li>
            <a use:link href="/submit-game">Submit Game</a>
          </li>
          <li>
            <a use:link href="/user">User</a>
          </li>
        {:else}
          <li>
            <a use:link href="/login">Login</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
