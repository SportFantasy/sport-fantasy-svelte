<script>
    import { getLoggedUser } from '../auth/auth.service'
    import { gamesStore } from '../games/games.store'
    import { getUnconfirmedGamesByUserId } from '../games/games.store.helper'
    import { confirmGameByPlayerId } from '../games/games.service'
    import GameCard from '../games/GameCard.svelte'


    const loggedUserId = getLoggedUser().uid

    $: unConfirmedGames = Object.values( getUnconfirmedGamesByUserId( $gamesStore.games, loggedUserId ) )

    const handleConfirmButtonClick = game => {
        confirmGameByPlayerId( game.id, game.player1Id, game.player2Id, loggedUserId )
                .then( console.log )
                .catch( console.log )
    }
</script>

<style>
    .confirm-wrapper {
        margin: auto;
        max-width: 30em;
    }

    li {
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
        background: white;
        margin: 20px 0;
        padding: 20px 0;
        border-radius: 8px;
    }

    button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: var(--palette-color-1);
        text-align: center;
        cursor: pointer;
        font-size: 18px;
    }
</style>

<div class="confirm-wrapper">
    <h1 class="text-center">Confirm</h1>

    <h2 class="text-center">Unconfirmed Games</h2>

    <ul class="confirm-game-ul">
        {#each unConfirmedGames as game (game.id)}
            <li>
                <GameCard {game} />
                <div class="text-center">
                    <button type="button" on:click={() => handleConfirmButtonClick(game)}>
                        Confirm game
                    </button>
                </div>
            </li>
        {/each}
    </ul>
</div>
