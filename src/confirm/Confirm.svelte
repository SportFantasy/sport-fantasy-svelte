<script>
  import { gamesStore } from '../common/stores/games.store'
  import { authStore } from '../auth/auth.store'
  import { getUnconfirmedGamesByUserId } from './confirm.helper'
  import { getShortDisplayDate } from '../util/date.helper'
  import { confirmSinglePlayerGame, getGameById } from '../common/db/games'
  import GameCard from '../games/GameCard.svelte'


  $: getUnconfirmedGames = () => {
    const unconfirmedGames = getUnconfirmedGamesByUserId($gamesStore.games, $authStore.loggedUser.uid)
    const unconfirmedGamesArr = Object.values(unconfirmedGames)
    console.log(unconfirmedGamesArr)
    return unconfirmedGamesArr
  }

  const handleConfirmButtonClick = (game) => {

    let playerNo
    if (game.player1Id === $authStore.loggedUser.uid) {
      playerNo = 1
    }
    if (game.player2Id === $authStore.loggedUser.uid) {
      playerNo = 2
    }

    confirmSinglePlayerGame(game.id, playerNo)
      .then(() => getGameById(game.id))
      .then(gamesStore.updateSingleGame)
      .then(console.log)
      .catch(console.log)

  }
</script>

<h1 class="text-center">Confirm</h1>

<h2>Unconfirmed Games</h2>

<ul>
  {#each getUnconfirmedGames() as game}
  <li>
    <p>{game.gameType.name}</p>
    <p>{getShortDisplayDate(game.datePlayed)}</p>

    <GameCard {game} />
    <button
      type="button"
      on:click={() => handleConfirmButtonClick(game)}
    >
      Confirm game
    </button>

  </li>
  {/each}
</ul>
