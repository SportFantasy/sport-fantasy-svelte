<script>
    import PlayerCard from './PlayerCard.svelte'
    import { confirmGameByPlayerId } from '../games/games.service'

    export let game = {}
    export let showConfirm = false
    export let loggedUserId = null

    const getIsPlayerWinner = (playerId, game) => {
        let result = false
        if (game.winner && game.winner.id === playerId) {
            result = true
        }
        return result
    }

    const isConfirmVisible = (isPlayerConfirmed, currentPlayerId, loggedUserId, showConfirm) => {
        return !!(
            showConfirm &&
            !isPlayerConfirmed &&
            (currentPlayerId === loggedUserId)
        )
    }

    const handlePlayerConfirm = (playerId, game) => {
        confirmGameByPlayerId( game.id, game.player1Id, game.player2Id, playerId )
            .then( console.log )
            .catch( console.log )
    }
</script>

<style>
    h1 {
        text-align: center;
        font-size: 2em;
        color: #ff3e00;
        border-bottom: 2px solid #fff;
        padding-bottom: 0.25em;
        margin-bottom: 0.5em;
    }

    p {
        display: block;
        padding-bottom: 0.5em;
    }

    .text-align-center {
        margin: auto;
        text-align: center;
        padding: 5px;
    }

    .vs {
        font-size: 30px;
        font-family: serif;
        font-style: italic;
    }

    .player--winner {
        color: #ff3e00;
        text-align: center;
        padding-bottom: 40px;
    }

    .score-card {
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
        background: white;
        border-radius: 8px;
        padding-bottom: 1em;
    }
</style>

<div class="score-card w-100">
    <div class="flex-row justify-content-space-around">
        <PlayerCard
                playerInfo={game.player1}
                confirmCb={handlePlayerConfirm}
                isWinner={ getIsPlayerWinner(game.player1Id, game) }
                isConfirmVisible={isConfirmVisible(game.isConfirmedPlayer1, game.player1Id, loggedUserId, showConfirm)}
        />
        <div class="flex-column justify-content-space-around">
            <div class="vs">VS</div>
        </div>
        <PlayerCard
            playerInfo={game.player2}
            confirmCb={(playerId) => handlePlayerConfirm(playerId, game)}
            isWinner={ getIsPlayerWinner(game.player2Id, game) }
            isConfirmVisible={isConfirmVisible(game.isConfirmedPlayer2, game.player2Id, loggedUserId, showConfirm)}
        />
    </div>
    <div class="text-align-center f-s-25">
        <div>Score</div>
        {game.player1Score} : {game.player2Score}
    </div>

    {#if !game.winner}
        <div class="player player--winner text-align-center f-s-25">
            <div>Result</div>
            {game.result}
        </div>
    {/if}
</div>
