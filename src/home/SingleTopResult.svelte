<script>
    export let title = ''
    export let usersWithScores = []
</script>


<h1>{title}</h1>
<ul>
    {#each usersWithScores as user, index (user.id)}
        <li class="user">
            <span class="user__position">{index + 1}.</span>
            <span class="user__username">{user.displayName} [{user.email}]</span>
            <span class="user__score">{user.totalScore}</span>
        </li>
    {/each}
</ul>


<style>
    .user {
        padding-bottom: 0.5em;
        margin-bottom: 0.5em;
        border-bottom: 1px solid var(--palette-color-4)
    }
    .user__position {
        font-weight: bold;
    }
    .user__score {
        float: right;
        clear: right;
        color: var(--color-emphasize);
    }
</style>
