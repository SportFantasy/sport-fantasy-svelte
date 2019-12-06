<script>
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'

  import Navbar from './common/Navbar.svelte';
  import AUTH_APP_ROUTES from './auth/authRouter.config'
  import { authStore } from './auth/auth.store'
  import { fetchAndInitGamesData } from './games/games.service'


  onMount(() => {
      fetchAndInitGamesData()
  });
</script>


<Navbar isAuthenticated={$authStore.isAuthenticated} />

<main class="global-main wrapper">
    <Router routes={AUTH_APP_ROUTES} />
</main>
