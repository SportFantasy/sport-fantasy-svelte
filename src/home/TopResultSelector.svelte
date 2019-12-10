<script>
  import { link } from "svelte-spa-router";
  import { TOP_TYPES, HOME_URL_PREFIX } from './TopResult.consts'

  export let selectedTopResultSlug

  const getTopTypeLink = (linkPrefix, topType) => {
      return `${linkPrefix}${topType.slug}`
  }

  const getActiveButtonClass = (topType, selectedTopResultSlug) => {
      const isActive = (topType.slug === selectedTopResultSlug)
      return isActive ? 'item item--active' : 'item'
  }
</script>

<style>
  .item {
      font-weight: bold;
      color: var(--palette-color-1);
      padding: 2em 1em;
      text-align: center;
      border-radius: 20px;
      background-color: white;
      box-shadow: 0 2px 2px var(--color-shadow);
      border-bottom: 4px solid transparent;
      transition: border 0.15s;
  }
  .item:hover,
  .item:focus,
  .item--active {
      border-bottom: 4px solid var(--palette-color-1);
  }
</style>

<div class="game-selector-wrapper justify-content-space-around flex-row">
  <div class="w-50 justify-content-space-around flex-row">
    {#each TOP_TYPES as topType}
      <a
        use:link
        href={getTopTypeLink(HOME_URL_PREFIX, topType)}
        class={getActiveButtonClass(topType, selectedTopResultSlug)}>
          {topType.display}
      </a>
    {/each}
  </div>
</div>
