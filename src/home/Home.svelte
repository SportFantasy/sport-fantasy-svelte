<script>
  import { gamesStore } from '../common/games.store'
  import { getGamesByGameTypeId } from '../common/games.store.helper'
  import GameTypeSelector from './GameTypeSelector.svelte'
  import GameCard from './GameCard.svelte'

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
