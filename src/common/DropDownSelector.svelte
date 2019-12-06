<script>
/**
    can work with just an array of strings/numbers
    or with array of objects { display, value }
 **/
import { getButtonClass, getSelectButtonText } from './DropDownSelector.helper'
export let values = []
export let onClickCb
export let isTransparent = false
export let textAlign = 'center' // align can be left/right/center
export let selectedValueId = null

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

$: buttonText = getSelectButtonText(values, selectedValueId)
$: getIsListVisibleClass = () => {
  return (isListVisible) ? '' : 'hidden'
}
</script>

<div>
  <button
    class={getButtonClass(isTransparent, textAlign)}
    type="button"
    on:click={handleSelectButtonClick}
  >
    { buttonText }
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
  width: 15em;
  position: absolute;
  z-index: 100;
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
  width: 100%;
}

.select-button--is-transparent {
  background: none;
  outline: 0;
  border: 0;
}

.select-button--text-align-left {
  text-align: left;
}

.select-button--text-align-center {
  text-align: center;
}

.select-button--text-align-right {
  text-align: right;
}
</style>
