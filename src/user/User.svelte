<script>
    import { onMount, beforeUpdate } from 'svelte'

    import { getLoggedUser } from '../auth/auth.service'
    import { gamesStore } from '../games/games.store'
    import {
        getConfirmedGamesArrByUserId,
        getUnconfirmedGamesArrByUserId,
    } from '../games/games.service'
    import { fetchUserDataById } from './users.service'

    import UserWidget from './UserWidget.svelte'
    import Spinner from '../common/Spinner.svelte'
    import GameCard from '../games/GameCard.svelte'

    export let params = {}

    let scrollY = 0
    let user = null
    let isLoading = true
    let errorMessage = ''
    let confirmedGamesArr = []
    let unConfirmedGamesArr = []
    let confirmedGamesNo = null
    let unConfirmedGamesNo = null
    let loggedUserId

    const loadUserData = userId => {
        isLoading = true
        user = null

        return fetchUserDataById( userId )
            .then( userData => {
                user = userData
                isLoading = false
                errorMessage = ''
                scrollY = 0
            } )
            .catch( error => {
                console.log( error )
                isLoading = false
                errorMessage = error.message
                scrollY = 0
            } )
    }

    $: {
        loggedUserId = getLoggedUser().uid

        confirmedGamesArr = getConfirmedGamesArrByUserId(
                $gamesStore.games,
                params.userId || loggedUserId,
        )
        unConfirmedGamesArr = getUnconfirmedGamesArrByUserId(
                $gamesStore.games,
                params.userId || loggedUserId,
        )
        confirmedGamesNo = confirmedGamesArr.length
        unConfirmedGamesNo = unConfirmedGamesArr.length
    }

    onMount( () => {
        const userId = params.userId || getLoggedUser().uid
        loadUserData( userId )
    } )

    beforeUpdate( () => {
        const requestedUserId = params.userId || loggedUserId
        if (user && user.id && user.id !== requestedUserId) {
            loadUserData( requestedUserId )
        }
    } )
</script>

<style>
    .games-wrapper {
        padding-top: 3em;
        margin: 10px;
        width: 450px;
    }

    .game-holder {
        margin: 1em 0;
    }
</style>

<svelte:window bind:scrollY/>

<div class="flex-row justify-content-space-around">
    <div class="flex-column justify-content-space-around">
        {#if isLoading}
            <Spinner/>
        {/if}

        {#if user}
            <div class="flex-row justify-content-space-around">
                <UserWidget {user} {confirmedGamesNo} {unConfirmedGamesNo}/>
            </div>
        {/if}
        <div class="flex-row justify-content-space-around flex-wrap">
            {#if confirmedGamesNo}
                <article class="games-wrapper">
                    <h1 class="text-center">My Confirmed Games</h1>
                    {#each confirmedGamesArr as game (game.id)}
                        <div class="game-holder">
                            <GameCard {game} showConfirm loggedUserId={loggedUserId} />
                        </div>
                    {/each}
                </article>
            {/if}

            {#if unConfirmedGamesNo}
                <article class="games-wrapper">
                    <h1 class="text-center">My Unconfirmed Games</h1>
                    {#each unConfirmedGamesArr as game (game.id)}
                        <div class="game-holder">
                            <GameCard {game} showConfirm loggedUserId={loggedUserId} />
                        </div>
                    {/each}
                </article>
            {/if}
        </div>

        {#if errorMessage}
            <p>{errorMessage}</p>
        {/if}
    </div>
</div>
