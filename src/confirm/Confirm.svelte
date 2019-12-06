<script>
  import { getShortDisplayDate } from '../util/date.helper'
  import { getLoggedUser } from '../auth/auth.service'
  import { confirmGameByPlayerId, getUnconfirmedGamesArrByUserId } from '../games/games.service'
  import GameCard from '../games/GameCard.svelte'


  const loggedUserId = getLoggedUser().uid

  $: unConfirmedGames = getUnconfirmedGamesArrByUserId(loggedUserId)

  const handleConfirmButtonClick = (game) => {
      confirmGameByPlayerId(game.id, game.player1Id, game.player2Id, loggedUserId)
        .then(console.log)
        .catch(console.log)
  }
</script>

<h1 class="text-center">Confirm</h1>

<h2>Unconfirmed Games</h2>

<ul>
  {#each unConfirmedGames as game}
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
