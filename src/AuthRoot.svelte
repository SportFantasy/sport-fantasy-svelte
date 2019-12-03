<script>
  import Router from 'svelte-spa-router'

  import Navbar from './common/Navbar.svelte';
  import AUTH_APP_ROUTES from './auth/authRouter.config'
  import { authStore } from './auth/auth.store'
</script>


<Navbar isAuthenticated={$authStore.isAuthenticated} />

<main class="global-main">
  <section>
      <Router routes={AUTH_APP_ROUTES} />
  </section>
</main>
