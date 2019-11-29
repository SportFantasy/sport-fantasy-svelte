<script>
export let values = []
export let onClickCb

let isListVisible = false
let selectedValue = null

const handleSelectButtonClick = () => {
  isListVisible ? closeList() : openList()
}

const openList = () => {
  isListVisible = true
}

const closeList = () => {
  isListVisible = false
}

const handleButtonClick = (value) => {
  selectedValue = value
  closeList()
  if (typeof onClickCb === 'function') {
    onClickCb(value)
  }
}

$: getIsListVisibleClass = () => {
  return (isListVisible) ? '' : 'hidden'
}
</script>

<div>
  <button
    class="select-button"
    type="button"
    on:click={handleSelectButtonClick}
  >
    {
      (selectedValue && selectedValue.display) ||
      selectedValue ||
      'Select...'
    }
  </button>

  <ul class={getIsListVisibleClass()}>
    {#each values as value}
    <li>
      <button
        class="list-button"
        type="button"
        on:click={(event) => { event.preventDefault(); handleButtonClick(value)} }>
        {value.display || value}
      </button>
    </li>
    {/each}
  </ul>
</div>

<style>
ul {
  width: 10em;
  position: absolute;
}
  ul.hidden {
    display: none;
  }

li {
  display: block;
  margin: 0;
  padding: 0;
}
.list-button {
  width: 100%;
  margin: 0;
}

.select-button {
  margin: 0;
}
</style>
