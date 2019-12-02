<script>
  import { authStore } from '../auth/auth.store'
</script>

<section class="h-100">
  <h1>Welcome, {$authStore.loggedUser.displayName}</h1>
</section>
