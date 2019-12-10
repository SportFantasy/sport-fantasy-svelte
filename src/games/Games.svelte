<script>
  import { fade } from 'svelte/transition'
  import GameTypeSelector from "./GameTypeSelector.svelte";
  import Score from "./Score.svelte";
  import Spinner from '../common/Spinner.svelte'
  import { gamesStore } from "./games.store";
  import { reloadAllDataAndGetConfirmedGamesByGameTypeId } from './games.service'
  import { extractFriendlyErrorMessage } from '../util/messages.helper'

  export let params = {};

  $: selectedGameTypeId = params.gameTypeId;
</script>

<style>
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  p {
    margin: auto;
    color: var(--color-error)
  }
</style>

<GameTypeSelector
  gameTypes={$gamesStore.gameTypes}
  activeGameTypeId={selectedGameTypeId}
/>

<section transition:fade>
{#await reloadAllDataAndGetConfirmedGamesByGameTypeId(selectedGameTypeId)}
  <Spinner />
{:then games}
  <Score {games} routeParams={params}/>
{:catch error}
  <p>Error: {extractFriendlyErrorMessage(error)}</p>
{/await}

</section>
