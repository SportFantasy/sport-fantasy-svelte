<script>
  import GameTypeSelector from "./GameTypeSelector.svelte";
  import Score from "./Score.svelte";
  import { gamesStore } from "./games.store";
  import { getConfirmedGamesByGameTypeId } from './games.service'


  export let params = {};

  $: selectedGameTypeId = params.gameTypeId;

  $: games = getConfirmedGamesByGameTypeId(selectedGameTypeId)
</script>

<style>
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>

<GameTypeSelector
  gameTypes={$gamesStore.gameTypes}
  activeGameTypeId={selectedGameTypeId} />

<section>
  <Score {games} routeParams={params}/>
</section>
