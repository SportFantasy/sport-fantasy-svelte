<script>
  import Router from 'svelte-spa-router'

  import TopNavigation from './common/TopNavigation.svelte'
  import Welcome from './common/Welcome.svelte'
  import NON_AUTH_APP_ROUTES from './nonAuthenticatedRoutes'
  import { authStore } from './auth/auth.store'
</script>

<TopNavigation isAuthenticated={$authStore.isAuthenticated} />

<Welcome name="Test User" />

<main class="global-main">
  <section>
    <Router routes={NON_AUTH_APP_ROUTES} />
  </section>
</main>
