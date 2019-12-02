<script>
import { onMount } from 'svelte'
import { authStore } from '../auth.store'
import { push } from 'svelte-spa-router'

import Spinner from '../../common/Spinner.svelte'
import { persistUserLoginData, getPersistedUserLoginData, loginGoogleUser } from '../auth.helper'

let errorMessage = ''
$: isSpinnerVisible = $authStore.isAuthInProgress

const googleSignInWithPopup = () => {
  errorMessage = ''
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then( (googleUserData) => loginGoogleUser(googleUserData, authStore.login) )
    .then( () => push('/') )
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
