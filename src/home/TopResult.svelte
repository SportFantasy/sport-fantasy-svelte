<script>
    import { getTopScores } from '../games/games.service'
    import { getTopScoresLimited } from './TopResult.helper'

    export let topCount = 5
    export let topResultSlug = 'top-scores'

    let topScores = []

    $: {
        if (topResultSlug === 'top-scores') {
            const topScoresData = getTopScores( topResultSlug )
            topScores = getTopScoresLimited( topScoresData, topCount )
        } else {
            topScores = []
        }
    }
</script>


{#if topScores && topScores.length}
<section class="top-scores">
    {#each topScores as topScore (topScore.id)}
    <article class="top-result">
        <h1>{topScore.name}</h1>
        <ul class="top-result__users">
            {#each topScore.users as user, index (user.id)}
                <li class="top-result__user">
                    <span class="top-result__position">{index + 1}.</span>
                    <span class="top-result__username">{user.displayName} [{user.email}]</span>
                    <span class="top-result__score">{user.totalScore}</span>
                </li>
            {/each}
        </ul>
    </article>
    {/each}
</section>
{:else}
<h2>Coming soon</h2>
{/if}

<style>
    .top-scores {
        display: grid;
        grid-column-gap: 3em;
        grid-template-columns: 1fr 1fr 1fr;
        padding-bottom: 2em;
    }
    .top-result {
        background-color: var(--palette-color-1);
        padding: 0 1em 1em;
        border-radius: 0.5em;
        box-shadow: 0 2px 4px var(--color-shadow);
    }
    .top-result__user {
        padding-bottom: 0.5em;
        margin-bottom: 0.5em;
        border-bottom: 1px solid var(--palette-color-4)
    }
    .top-result__position {
        font-weight: bold;
    }
    .top-result__score {
        float: right;
        clear: right;
        color: var(--color-emphasize);
    }
</style>
