<script>
  import PlayerCard from "./PlayerCard.svelte";
  import ScoreTable from "./ScoreTable.svelte";
  import GameCard from "./GameCard.svelte";

  export let games;
  export let routeParams;
</script>

<style>
  .score-card {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 20px 0;
  }
  .score-content {
    width: 30%;
  }
  .score-header {
    text-transform: uppercase;
    font-size: 40px;
    margin: auto;
    text-align: center;
    padding: 5px;
  }
</style>

{#if games.length}
  <div class="score-wrapper flex-row justify-content-space-around">
    <div class="score-content flex-row justify-content-space-around">
      <div class="flex-column w-100">
        {#if routeParams.gameTypeId && routeParams.gameTypeId !== 'all'}
          <div class="text-align-center score-header">
            {games[0].gameType.name}
          </div>
        {:else}
          <div class="text-align-center score-header">All games</div>
        {/if}
        {#each games as game}
          <GameCard {game} />
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div>Loading...</div>
{/if}
