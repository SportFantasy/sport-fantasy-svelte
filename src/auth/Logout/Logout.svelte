<script>
import { push } from 'svelte-spa-router'
import { logout } from '../auth.service'
import { NON_AUTH_ROUTES } from '../auth.consts'


const handleLogoutButtonClick = () => {
  logout()
  push(NON_AUTH_ROUTES.LOGIN)
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
