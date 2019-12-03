<script>
  import Router, { push } from 'svelte-spa-router'
  import { onMount } from 'svelte'
  import { authStore } from './auth/auth.store'
  import {
    persistUserLoginData,
    getPersistedUserLoginData,
    getUserDataFromGoogleUser,
    getAndCreateUserById,
  } from './auth/auth.helper'
  import { updateUsersLastLoginTimeById } from './common/db/users'


  import NON_AUTH_APP_ROUTES from './auth/nonAuthRouter.config'
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
        .then( (googleUserData) => getUserDataFromGoogleUser(googleUserData) )
        .then( (userData) => {
          persistUserLoginData(userData)
          authStore.setLoggedUser(userData)
          return userData
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  onMount(() => {
    authStore.setIsAuthInProgress(true)

    autoSignIn()
      .then((userData) => {
        return getAndCreateUserById({
          id: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
        })
      })
      .then(() => updateUsersLastLoginTimeById($authStore.loggedUser.uid))
      .then(() => {
        authStore.setIsAuthenticated(true)
        authStore.setIsAuthInProgress(false)
        push('/')
      })
      .catch( (error) => {
        console.log(error)
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
