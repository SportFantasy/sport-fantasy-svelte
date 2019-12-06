<script>
  import { link } from "svelte-spa-router";

  export let gameTypes = {};
  export let activeGameTypeId;

  $: gameTypeArr = Object.values(gameTypes);
  const getImageSrc = (currentGame) => {
    let imgSrc = "";
    let gameName = !(currentGame && currentGame.name)
      ? "all"
      : currentGame.name;
    switch (gameName) {
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
        imgSrc = "images/trophy.png";
    }
    return imgSrc;
  };
  const getLink = currentGame => {
    let gameName = !(currentGame && currentGame.name)
      ? "all"
      : currentGame.name;
    let routeString = "";
    switch (gameName) {
      case "all":
        routeString = `/games/${gameName}`;
        break;
      case "fifa 2019":
        routeString = `/games/${currentGame.id}`;
        break;
      case "stoni tenis":
        routeString = `/games/${currentGame.id}`;
        break;
      case "sah":
        routeString = `/games/${currentGame.id}`;
        break;
      default:
        routeString = `/games`;
    }
    return routeString;
  };
  const getActiveButtonClass = (currentGame, activeGameTypeId) => {
    let gameId = !(currentGame && currentGame.id) ? "all" : currentGame.id;
    let classes = "game-card";
    let isActive =
      gameId === activeGameTypeId ? classes.concat(" active") : classes;
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
    <a use:link href={getLink()} class={getActiveButtonClass(undefined, 'all')}>
      <img src={getImageSrc(undefined, 'all')} alt="sport image" />
    </a>
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
