<script>
  import GameTypeSelector from "./GameTypeSelector.svelte";
  import GameCard from "./GameCard.svelte";
  import Score from "./Score.svelte";
  import { gamesStore } from "../common/stores/games.store";
  import {
    getGamesByGameTypeId,
    filterOutUnconfirmedGames,
  } from "../common/stores/games.store.helper";


  export let params = {};

  $: selectedGameTypeId = params.gameTypeId;

  $: gamesArr = () => {
    const confirmedGames = filterOutUnconfirmedGames($gamesStore.games)
    const gameTypeId = (selectedGameTypeId !== 'all') ? selectedGameTypeId : undefined
    const filteredGames = getGamesByGameTypeId(
      confirmedGames,
      gameTypeId,
    );
    const gamesArrayList = [...Object.values(filteredGames)];
    return gamesArrayList;
  };
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
  <Score games={gamesArr()} routeParams={params}/>
</section>
