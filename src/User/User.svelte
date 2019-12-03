<script>
  import { onMount, beforeUpdate } from 'svelte'

  import { authStore } from '../auth/auth.store'
  import { usersStore } from '../common/stores/users.store'
  import { gamesStore } from '../common/stores/games.store'
  import {
    getUnconfirmedGamesByUserId,
    getConfirmedGamesByUserId,
  } from '../common/stores/games.store.helper'
  import { getUserById } from '../common/stores/users.store.helper'
  import { fetchUserById } from '../common/db/users'
  import { getShortDisplayDate } from '../util/date.helper'

  import Spinner from '../common/Spinner.svelte'

  export let params = {}

  const loadUserData = (userId) => {
    isLoading = true
    user = null

    return fetchUserById(userId)
      .then(usersStore.updateUser)
      .then(() => {
        user = getUserById($usersStore, userId)
        isLoading = false
        errorMessage = ''
      })
      .catch((error) => {
        console.log(error)
        isLoading = false
        errorMessage = error.message
      })
  }

  const loadUnconfirmedGames = (userId) => {
    const unconfirmedGamesObject = getUnconfirmedGamesByUserId($gamesStore.games, userId)
    unconfirmedGamesNo = Object.keys(unconfirmedGamesObject).length
  }

  const loadConfirmedGames = (userId) => {
    const confirmedGamesObject = getConfirmedGamesByUserId($gamesStore.games, userId)
    confirmedGamesNo = Object.keys(confirmedGamesObject).length
  }


  let user = null
  let isLoading = true
  let errorMessage = ''
  let unconfirmedGamesNo = null
  let confirmedGamesNo = null

  onMount(() => {
    const userId = params.userId || $authStore.loggedUser.uid
    loadUserData(userId)
    loadConfirmedGames(userId)
    loadUnconfirmedGames(userId)
  })
</script>

<div class="flex-row justify-content-space-around">
  <div class="flex-column justify-content-space-around">
    {#if isLoading}
      <Spinner />
    {/if}

    {#if user}
    <h2>User: {user.displayName}</h2>
    <p>Email: {user.email}</p>
    <p>Created: {getShortDisplayDate(user.createdAt)}</p>
    <p>Confirmed Games: {confirmedGamesNo}</p>
    <p>Unconfirmed Games: {unconfirmedGamesNo}</p>
    {/if}

    {#if errorMessage}
    <p>{errorMessage}</p>
    {/if}
  </div>
</div>
