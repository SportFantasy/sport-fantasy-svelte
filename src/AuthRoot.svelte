<script>
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'

  import Navbar from './common/Navbar.svelte';
  import AUTH_APP_ROUTES from './auth/authRouter.config'
  import { authStore } from './auth/auth.store'
  import { gamesStore } from "./common/stores/games.store";
  import { usersStore } from "./common/stores/users.store";

  import { getAllUsers } from "./common/db/users.js";
  import { getAllGames } from "./common/db/games.js";
  import { getAllGameTypes } from "./common/db/gameTypes.js";
  import {
    addUsersToGames,
    addGameTypesToGames,
    getGamesByGameTypeId,
    addResultAndWinnerToGames,
    filterOutUnconfirmedGames,
  } from "./common/stores/games.store.helper";



  const getGamesData = () => {
    return Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()])
  }

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

</script>


<Navbar isAuthenticated={$authStore.isAuthenticated} />

<main class="global-main">
  <section>
      <Router routes={AUTH_APP_ROUTES} />
  </section>
</main>
