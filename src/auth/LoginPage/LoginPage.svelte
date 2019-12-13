<script>
  import { authStore } from "../auth.store";
  import { push } from "svelte-spa-router";
  import { googleSignInWithPopup } from "../auth.service";
  import { extractFriendlyErrorMessage } from "../../util/messages.helper";

  import Spinner from "../../common/Spinner.svelte";
  import FOOTBALL_IMAGE from '../../assets/football-icon.png'

  let errorMessage = "";

  $: isSpinnerVisible = $authStore.isAuthInProgress;

  const handleLoginClick = () => {
    errorMessage = "";
    googleSignInWithPopup()
      .then(() => push("/"))
      .catch(error => (errorMessage = extractFriendlyErrorMessage(error)));
  };
</script>

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

<div class="login-page">
  <img src={FOOTBALL_IMAGE} class="flex-row" />

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  {#if isSpinnerVisible}
    <Spinner />
  {/if}

  {#if !isSpinnerVisible}
    <button type="button" on:click={handleLoginClick}>Login</button>
  {/if}

</div>

<div id="firebaseui-auth-container" />
