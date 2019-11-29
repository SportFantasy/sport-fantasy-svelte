<script>
import { onMount } from 'svelte'
import { authStore } from '../auth.store'
import { push } from 'svelte-spa-router'

import Spinner from '../../common/Spinner.svelte'
import { persistUserLoginData, getPersistedUserLoginData } from '../auth.helper'

let autoSignInErrorMessage = ''
export let params = {}

const googleSignInWithPopup = () => {
  autoSignInErrorMessage = ''
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(loginGoogleUser)
}

const autoSignIn = () => {
  const loggedUser = getPersistedUserLoginData()
  if (!loggedUser) {
    return Promise.reject()
  }

  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(loggedUser.credential.oauthIdToken)
    return firebase.auth().signInWithCredential(credential)
      .then( loginGoogleUser )
  } catch (error) {
    return Promise.reject(error)
  }
}

const loginGoogleUser = (googleData) => {
  const loggedUser = {
    uid: googleData.user.uid,
    displayName: googleData.user.displayName,
    email: googleData.user.email,
    token: googleData.credential.oauthIdToken,
    refreshToken: googleData.user.refreshToken,
    credential: googleData.credential,
  }

  persistUserLoginData(loggedUser)
  authStore.login(googleData.credential.oauthIdToken, loggedUser)

  push('/')
}

onMount(() => {
  if (params.type === 'manual') {
    autoSignInErrorMessage = ' '
    return
  }

  autoSignIn()
    .catch( googleSignInWithPopup )
    .catch( (error) => {
      autoSignInErrorMessage = (error && error.message) || 'error'
    })
})
</script>

<div class="login-page">
  <img src="images/football-icon.png" class="flex-row" />

  {#if autoSignInErrorMessage}
    <p>{autoSignInErrorMessage}</p>
    <button type="button" on:click={googleSignInWithPopup}>Login</button>
  {:else}
    <Spinner />
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
