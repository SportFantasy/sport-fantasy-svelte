<script>
    import {

    } from '../auth.store'
    import { push } from 'svelte-spa-router'
    import { googleSignInWithPopup } from '../auth.service'
    import { extractFriendlyErrorMessage } from '../../util/messages.helper'

    import Spinner from '../../common/Spinner.svelte'


    let errorMessage = ''

    $: isSpinnerVisible = $authStore.isAuthInProgress

    const handleLoginClick = () => {
        errorMessage = ''
        googleSignInWithPopup()
            .then( () => push('/') )
            .catch( (error) => errorMessage = extractFriendlyErrorMessage(error) )
    }

</script>

<div class="login-page">
    <img src="images/football-icon.png" class="flex-row"/>

    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}

    {#if isSpinnerVisible}
        <Spinner/>
    {/if}

    {#if !isSpinnerVisible}
        <button type="button" on:click={handleLoginClick}>Login</button>
    {/if}

</div>

<div id="firebaseui-auth-container"></div>

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
