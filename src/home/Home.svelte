<script>
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";

  import GameTypeSelector from "./GameTypeSelector.svelte";
  import GameCard from "./GameCard.svelte";
  import Score from "./Score.svelte";

  import { authStore } from "../auth/auth.store";
  import { gamesStore } from "../common/stores/games.store";
  import { usersStore } from "../common/stores/users.store";

  import { getAllUsers } from "../common/db/users.js";
  import { getAllGames } from "../common/db/games.js";
  import { getAllGameTypes } from "../common/db/gameTypes.js";
  import {
    addUsersToGames,
    addGameTypesToGames,
    getGamesByGameTypeId
  } from "../common/stores/games.store.helper";

  const getGamesData = () =>
    Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()]);

  let gamesArrayList = [];

  const setGamesStore = ([users, gameTypes, games]) => {
    const gamesWithUsers = addUsersToGames(games, users);
    const gamesWithTypes = addGameTypesToGames(gamesWithUsers, gameTypes);

    usersStore.setUsers(users);
    gamesStore.setGameTypes(gameTypes);
    gamesStore.setGames(gamesWithTypes);
  };

  onMount(() => {
    getGamesData().then(setGamesStore);
  });

  export let params = {};

  $: selectedGameTypeId = params.gameTypeId;

  $: gamesArr = () => {
    const filteredGames = getGamesByGameTypeId(
      $gamesStore.games,
      selectedGameTypeId
    );
    gamesArrayList = [...Object.values(filteredGames)];
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

<section class="h-100">
  <Score games={gamesArr()} />
</section>
