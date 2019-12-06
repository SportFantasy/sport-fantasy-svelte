<script>
  import { onMount, beforeUpdate } from 'svelte'

  import { authStore } from '../auth/auth.store'
  import { usersStore } from '../common/stores/users.store'
  import { gamesStore } from '../games/games.store'
  import {
    getUnconfirmedGamesByUserId,
    getConfirmedGamesByUserId,
  } from '../games/games.store.helper'
  import { getUserById } from '../common/stores/users.store.helper'
  import { fetchUserById } from '../common/db/users'
  import { getShortDisplayDate } from '../util/date.helper'

  import UserWidget from './UserWidget.svelte'
  import Spinner from '../common/Spinner.svelte'
  import GameCard from '../games/GameCard.svelte'

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
    unConfirmedGamesArr = Object.values(unconfirmedGamesObject)
    unConfirmedGamesNo = unConfirmedGamesArr.length
  }

  const loadConfirmedGames = (userId) => {
    const confirmedGamesObject = getConfirmedGamesByUserId($gamesStore.games, userId)
    confirmedGamesArr = Object.values(confirmedGamesObject)
    confirmedGamesNo = confirmedGamesArr.length
  }


  let user = null
  let isLoading = true
  let errorMessage = ''
  let confirmedGamesArr = null
  let unConfirmedGamesArr = null
  let confirmedGamesNo = null
  let unConfirmedGamesNo = null

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
      <UserWidget
        {user}
        {confirmedGamesNo}
        {unConfirmedGamesNo}
      />
    {/if}

    {#if confirmedGamesNo}
      <article class="games-wrapper">
        <h1>Confirmed Games</h1>
        {#each confirmedGamesArr as game}
          <GameCard {game} />
        {/each}
      </article>
    {/if}

    {#if unConfirmedGamesNo}
      <article class="games-wrapper">
        <h1>Unconfirmed Games</h1>
        {#each unConfirmedGamesArr as game}
          <GameCard {game} />
        {/each}
      </article>
    {/if}

    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
  </div>
</div>

<style>
.games-wrapper {
  padding-top: 3em;
}
</style>
