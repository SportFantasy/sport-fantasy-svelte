<script>
  import Router, { push } from 'svelte-spa-router'
  import { onMount } from 'svelte'
  import { autoSignIn } from './auth/auth.service'
  import NON_AUTH_APP_ROUTES from './auth/nonAuthRouter.config'


  onMount(() => {
    autoSignIn()
      .then( () => push('/') )
      .catch( () => push('/login') )
  })
</script>


<main class="global-main wrapper">
    <Router routes={NON_AUTH_APP_ROUTES} />
</main>
