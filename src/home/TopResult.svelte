<script>
    import { getTopScores } from '../games/games.service'
    import { getTopScoresLimited } from './TopResult.helper'
    import SingleTopResult from './SingleTopResult.svelte'

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
        <SingleTopResult
            title={topScore.name}
            usersWithScores={topScore.users}
        />
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
</style>
