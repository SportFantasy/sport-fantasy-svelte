<script>
    import GameCard from './GameCard.svelte'

    export let games
    export let routeParams
</script>

<style>
    .score-header {
        text-transform: uppercase;
        font-size: 40px;
        margin: auto;
        text-align: center;
        padding: 5px;
    }

    .score-content {
        min-width: 400px;
    }

    .message {
        margin: auto;
    }
    .game-holder {
        margin: 1em 0;
    }
</style>

{#if games.length}
    <div class="score-wrapper flex-row justify-content-space-around">
        <div class="score-content flex-row justify-content-space-around w-50">
            <div class="flex-column w-100">
                {#if routeParams.gameTypeId && routeParams.gameTypeId !== 'all'}
                    <div class="text-align-center score-header">
                        {games[0].gameType.name}
                    </div>
                {:else}
                    <div class="text-align-center score-header">All games</div>
                {/if}

                {#each games as game (game.id)}
                <div class="game-holder">
                    <GameCard {game}/>
                </div>
                {/each}
            </div>
        </div>
    </div>
{:else}
    <h3 class="message">No games</h3>
{/if}
