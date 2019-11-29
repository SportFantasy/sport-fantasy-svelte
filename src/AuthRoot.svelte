<script>
  import Router from 'svelte-spa-router'
  import { onMount } from 'svelte';

  import TopNavigation from './common/TopNavigation.svelte'
  import Welcome from './common/Welcome.svelte'
  import Navbar from './common/Navbar.svelte';
  import AUTH_APP_ROUTES from './authenticatedRoutes'
  import { authStore } from './auth/auth.store'
</script>


<Navbar isAuthenticated={$authStore.isAuthenticated} />

<main class="global-main">
  <section>
      <Router routes={AUTH_APP_ROUTES} />
  </section>
</main>
