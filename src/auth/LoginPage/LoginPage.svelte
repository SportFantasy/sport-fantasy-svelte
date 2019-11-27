<script>
import { authStore } from '../auth.store'
import { push } from 'svelte-spa-router'


let email = ''
let password = ''

const handleSubmit = (event) => {
  event.preventDefault()

  const authToken = email + password
  authStore.setAuthToken(authToken)
  authStore.setIsAuthenticated(true)

  push('/home')
}
</script>

<div class="login-page">

  <form on:submit={handleSubmit}>
    <label>
      <span>Email:</span>
      <input type="text" required bind:value={email} />
    </label>

    <label>
      <span>Password:</span>
      <input type="password" required bind:value={password} />
    </label>

    <button type="submit">Log in</button>
  </form>

</div>

<style>
.login-page {
  max-width: 60%;
  min-width: 300px;
  margin: auto;
}

</style>
