<script>
  import { authStore } from '../auth/auth.store'
</script>

<section class="h-100">
  <h1 class="text-center">Welcome, {$authStore.loggedUser.displayName}</h1>
</section>
