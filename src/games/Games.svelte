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
    getGamesByGameTypeId,
    addResultAndWinnerToGames,
  } from "../common/stores/games.store.helper";

  const getGamesData = () =>
    Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()]);

  let gamesArrayList = [];

  const setGamesStore = ([users, gameTypes, games]) => {
    // console.log(games)
    const gamesWithUsers = addUsersToGames(games, users);
    // console.log(gamesWithUsers)
    const gamesWithTypes = addGameTypesToGames(gamesWithUsers, gameTypes);
    // console.log(gamesWithTypes)
    const gamesWithWinners = addResultAndWinnerToGames(gamesWithTypes);
    // console.log(gamesWithWinners)

    usersStore.setUsers(users);
    gamesStore.setGameTypes(gameTypes);
    gamesStore.setGames(gamesWithWinners);
  };

  onMount(() => {
    getGamesData().then(setGamesStore);
  });

  export let params = {};

  $: selectedGameTypeId = params.gameTypeId;
  

  $: gamesArr = () => {
    let selctedGameType = selectedGameTypeId !== 'all'? selectedGameTypeId : undefined;
    const filteredGames = getGamesByGameTypeId(
      $gamesStore.games,
      selctedGameType
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
  <Score games={gamesArr()} routeParams={params}/>
</section>
