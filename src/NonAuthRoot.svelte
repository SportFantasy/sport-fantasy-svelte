<script>
  import Router from 'svelte-spa-router'

  import NON_AUTH_APP_ROUTES from './nonAuthenticatedRoutes'
</script>


<main class="global-main h-100">
  <section class="h-100">
    <Router routes={NON_AUTH_APP_ROUTES} />
  </section>
</main>
