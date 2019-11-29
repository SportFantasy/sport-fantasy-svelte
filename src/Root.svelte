<script>
  import Router from 'svelte-spa-router'

  import AuthRoot from './AuthRoot.svelte'
  import NonAuthRoot from './NonAuthRoot.svelte'
  import { authStore } from './auth/auth.store'
</script>


{#if $authStore.isAuthenticated}
  <AuthRoot />
{:else}
  <NonAuthRoot />
{/if}
