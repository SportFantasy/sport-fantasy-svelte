<script>
  import Router from 'svelte-spa-router'
  import { onMount } from 'svelte';

  import GameTypeSelector from './GameTypeSelector.svelte'
  import GameCard from './GameCard.svelte'

  import { authStore } from '../auth/auth.store'
  import { gamesStore } from '../common/games.store'

  import { getAllUsers } from '../common/db/users.js'
  import { getAllGames } from '../common/db/games.js'
  import { getAllGameTypes } from '../common/db/gameTypes.js'
  import {
    addUsersToGames,
    addGameTypesToGames,
    getGamesByGameTypeId,
  } from '../common/games.store.helper'


  const getGamesData = () => Promise.all([
    getAllUsers(), getAllGameTypes(), getAllGames(),
  ])

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

  export let params = {}

  $: selectedGameTypeId = params.gameTypeId

  $: gamesArr = () => {
    const filteredGames = getGamesByGameTypeId($gamesStore.games, selectedGameTypeId)
    return [...Object.values(filteredGames)]
  }
</script>

<h1 class="main-header">Home</h1>

<GameTypeSelector gameTypes={$gamesStore.gameTypes} activeGameTypeId={selectedGameTypeId} />

<section>
  {#each gamesArr() as game}
    <GameCard {game} />
  {/each}
</section>

<style>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
