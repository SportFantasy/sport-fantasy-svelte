<script>
    import { gamesStore } from '../games/games.store'
    import { getTopScores } from '../games/games.service'

    export let topCount = 5
    export let topResultSlug = 'top-scores'


    $: {
        console.log(getTopScores(topResultSlug))
    }
</script>


<h1>Top {topCount} {topResultSlug}:</h1>
