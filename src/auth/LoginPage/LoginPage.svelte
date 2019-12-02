<script>
import { onMount } from 'svelte'
import { authStore } from '../auth.store'
import { push } from 'svelte-spa-router'

import Spinner from '../../common/Spinner.svelte'
import {
  persistUserLoginData,
  getPersistedUserLoginData,
  getAndCreateUserById,
  getUserDataFromGoogleUser,
} from '../auth.helper'
import { updateUsersLastLoginTimeById } from '../../common/db/users'

let errorMessage = ''
$: isSpinnerVisible = $authStore.isAuthInProgress

const googleSignInWithPopup = () => {
  errorMessage = ''
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then( (googleUserData) => getUserDataFromGoogleUser(googleUserData) )
    .then( (userData) => {
      persistUserLoginData(userData)
      authStore.setLoggedUser(userData)
    })
    .then( () => {
      return getAndCreateUserById({
        id: $authStore.loggedUser.uid,
        email: $authStore.loggedUser.email,
        displayName: $authStore.loggedUser.displayName,
      })
    })
    .then( () => updateUsersLastLoginTimeById($authStore.loggedUser.uid) )
    .then( () => {
      authStore.setIsAuthenticated(true)
      authStore.setIsAuthInProgress(false)
      push('/')
    })
    .catch( (error) => errorMessage = error.message )
}

const handleLoginClick = () => {
  googleSignInWithPopup()
}

</script>

<div class="login-page">
  <img src="images/football-icon.png" class="flex-row" />

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  {#if isSpinnerVisible}
    <Spinner />
  {/if}

  {#if !isSpinnerVisible}
    <button type="button" on:click={googleSignInWithPopup}>Login</button>
  {/if}

</div>

<div id="firebaseui-auth-container" />

<style>
.login-page {
  max-width: 60%;
  min-width: 300px;
  margin: auto;
  text-align: center;
}
img {
  display: block;
  margin: 3em auto;
}
</style>
