<script>
import { push } from 'svelte-spa-router'
import { authStore } from '../auth.store'
import { clearUserLoginData } from '../auth.helper'


const handleLogoutButtonClick = () => {
  clearUserLoginData()
  authStore.logout()
  push('/login/manual')
}
</script>

<div class="center">
  <button type="button" on:click={handleLogoutButtonClick}>
    Log Out
  </button>
</div>

<style>
  button {
    margin: 3em auto;
  }
</style>
