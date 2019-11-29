<script>
  import Router from 'svelte-spa-router'

  import TopNavigation from './common/TopNavigation.svelte'
  import Welcome from './common/Welcome.svelte';
  import Navbar from './common/Navbar.svelte';
  import NON_AUTH_APP_ROUTES from './nonAuthenticatedRoutes'
  import { authStore } from './auth/auth.store'
</script>


<main class="global-main h-100">
  <section class="h-100">
    <Router routes={NON_AUTH_APP_ROUTES} />
  </section>
</main>
