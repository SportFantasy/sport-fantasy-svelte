<script>
    import { link } from 'svelte-spa-router'

    export let playerInfo = {}
    export let isWinner = false
    export let isConfirmVisible = false
    export let confirmCb

    const getPlayerNameClass = () => {
        if (isWinner) {
            return 'player player--winner'
        } else {
            return 'player'
        }
    }

    const handleConfirmButtonClick = (playerId) => {
        if (typeof confirmCb === 'function') {
            confirmCb(playerId)
        }
    }
</script>

<style>
    .card {
        box-shadow: none;
        max-width: 300px;
        text-align: center;
        background-color: transparent;
        padding-top: 20px;
        width: 120px;
        height: 250px;
    }

    .card img {
        height: 70px;
        width: 70px;
        align-self: center;
    }

    .card-user-info {
        height: 100px;
    }

    .card-user-info div {
        text-transform: uppercase;
        padding-bottom: 10px;
        height: 80px;
    }

    .user-info-button {
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
    .user-info-button--confirm {
        margin-top: 0.5em;
    }

    a {
        text-decoration: none;
        font-size: 22px;
        color: black;
    }

    button:hover,
    a:hover {
        opacity: 0.7;
    }

    .player--winner {
        color: var(--color-success);
    }

    .player--winner:before {
        content: '*';
        color: var(--color-emphasize)
    }
</style>

<div class="card flex-column justify-content-space-around">
    <img src="images/football-icon.png" alt="John"/>
    <div class="card-user-info flex-column justify-content-space-around">
        <div class={getPlayerNameClass()} title={playerInfo.email}>{playerInfo.displayName}</div>
        <a class="user-info-button" href="/user/{playerInfo.id}" use:link>
            User Info
        </a>

        {#if isConfirmVisible}
        <button class="user-info-button user-info-button--confirm" on:click={() => handleConfirmButtonClick(playerInfo.id)}>
            Confirm
        </button>
        {/if}
    </div>

</div>
