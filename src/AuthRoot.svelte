<script>
  import Router from 'svelte-spa-router'
  import { onMount } from 'svelte';

  import TopNavigation from './common/TopNavigation.svelte'
  import Welcome from './common/Welcome.svelte'
  import AUTH_APP_ROUTES from './authenticatedRoutes'
  import { authStore } from './auth/auth.store'
  import { gamesStore } from './common/games.store'


  import { getAllUsers } from './common/db/users.js'
  import { getAllGames } from './common/db/games.js'
  import { getAllGameTypes } from './common/db/gameTypes.js'
  import { addUsersToGames, addGameTypesToGames } from './common/games.store.helper'

  const getGamesData = () => {
    return Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()])
  }

  const setGamesStore = ([users, gameTypes, games]) => {
    const gamesWithUsers = addUsersToGames(games, users)
    const gamesWithTypes = addGameTypesToGames(gamesWithUsers, gameTypes)

    gamesStore.setUsers(users)
    gamesStore.setGameTypes(gameTypes)
    gamesStore.setGames(gamesWithTypes)
  }

  onMount(() => {
    getGamesData().then(setGamesStore)
  })
</script>

<TopNavigation isAuthenticated={$authStore.isAuthenticated} />

<Welcome name="Test User" />

<main class="global-main">
  <section>
      <Router routes={AUTH_APP_ROUTES} />
  </section>
</main>
