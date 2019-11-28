<script>
import { push } from 'svelte-spa-router'

export let gameTypes = {}
export let activeGameTypeId

$: gameTypeArr = Object.values(gameTypes)

const getActiveButtonClass = (currentButtonId, activeGameTypeId) => {
  return (currentButtonId === activeGameTypeId) ? 'active' : ''
}

const handleClick = (gameTypeId) => {
  push(`/home/${gameTypeId}`)
}
</script>


<ul>
  {#each gameTypeArr as gameType}
    <li>
      <button
        class={getActiveButtonClass(gameType.id, activeGameTypeId)}
        on:click={() => handleClick(gameType.id)}>
        {gameType.name}
      </button>
    </li>
  {/each}
</ul>


<style>
ul {
  display: block;
  clear: both;
}
li {
  display: inline-block;
}
button {
  background-color: #e4e4e4;
}
button.active {
  background-color: #fff;
}
</style>
