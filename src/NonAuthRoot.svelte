<script>
  import Router, { push } from 'svelte-spa-router'
  import { onMount } from 'svelte'
  import { authStore } from './auth/auth.store'
  import { persistUserLoginData, getPersistedUserLoginData, loginGoogleUser } from './auth/auth.helper'

  import NON_AUTH_APP_ROUTES from './nonAuthenticatedRoutes'
  import Spinner from './common/Spinner.svelte'


  $: isSpinnerVisible = $authStore.isAuthInProgress

  const autoSignIn = () => {
    const loggedUser = getPersistedUserLoginData()
    if (!loggedUser) {
      return Promise.reject('no saved user')
    }

    try {
      const credential = firebase.auth.GoogleAuthProvider.credential(loggedUser.credential.oauthIdToken)
      return firebase.auth().signInWithCredential(credential)
        .then( (googleUserData) => loginGoogleUser(googleUserData, authStore.login) )
    } catch (error) {
      return Promise.reject(error)
    }
  }

  onMount(() => {
    authStore.setIsAuthInProgress(true)

    autoSignIn()
      .then(() => {
        authStore.setIsAuthInProgress(false)
        push('/')
      })
      .catch( () => {
        authStore.setIsAuthInProgress(false)
        push('/login')
      })
  })
</script>


<main class="global-main h-100">
  <section class="h-100">
    <Router routes={NON_AUTH_APP_ROUTES} />
  </section>
</main>
