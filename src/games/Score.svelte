<script>
  import PlayerCard from "./PlayerCard.svelte";
  import ScoreTable from "./ScoreTable.svelte";
  import GameCard from "./GameCard.svelte";
  export let games;
</script>

<style>
  .score-card {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 20px 0;
  }
  .score-content {
    width: 60%;
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
    <div class="score-content flex-row justify-content-space-around w-100">
      <div class="flex-column w-100">
        <div class="text-align-center score-header">{games[0].gameType.name}</div>
        {#each games as game}
          <GameCard {game} />
        {/each}
      </div>

    </div>

  </div>
{:else}
  <div>Loading...</div>
{/if}
