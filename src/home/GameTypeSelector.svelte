<script>
  import { push } from "svelte-spa-router";
  import { link } from "svelte-spa-router";

  export let gameTypes = {};
  export let activeGameTypeId;

  $: gameTypeArr = Object.values(gameTypes);
  const getImageSrc = (currentGame, activeGameTypeId) => {
    let imgSrc = "";
    switch (currentGame.name) {
      case "fifa 2019":
        imgSrc = "images/football-icon.png";
        break;
      case "stoni tenis":
        imgSrc = "images/tennis-racket.png";
        break;
      case "sah":
        imgSrc = "images/chess.png";
        break;
      default:
        imgSrc = "images/football-icon.png";
    }
    return imgSrc;
  };
  const getLink = currentGame => {
    let routeString = "/home";
    switch (currentGame.name) {
      case "fifa 2019":
        routeString = `/home/${currentGame.id}`;
        break;
      case "stoni tenis":
        routeString = `/home/${currentGame.id}`;
        break;
      case "sah":
        routeString = `/home/${currentGame.id}`;
    }
    return routeString;
  };
  const getActiveButtonClass = (currentGame, activeGameTypeId) => {
    let classes = "game-card";
    let isActive =
      currentGame.id === activeGameTypeId ? classes.concat(" active") : classes;
    return classes;
  };
</script>

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

<div class="game-selector-wrapper justify-content-space-around flex-row">
  <div class="w-30 justify-content-space-around flex-row">
    {#each gameTypeArr as gameType}
      <a
        use:link
        href={getLink(gameType)}
        class={getActiveButtonClass(gameType, activeGameTypeId)}>
        <img src={getImageSrc(gameType, activeGameTypeId)} alt="sport image" />
      </a>
    {/each}
  </div>
</div>
