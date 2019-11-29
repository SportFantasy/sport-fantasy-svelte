<script>
  export let game = {};
  import PlayerCard from "./PlayerCard.svelte";
</script>

<style>
  h1 {
    text-align: center;
    font-size: 2em;
    color: #ff3e00;
    border-bottom: 2px solid #fff;
    padding-bottom: 0.25em;
    margin-bottom: 0.5em;
  }

  p {
    display: block;
    padding-bottom: 0.5em;
  }

  .text-align-center {
    margin: auto;
    text-align: center;
    padding: 5px;
  }
  .vs {
    font-size: 50px;
  }
  .f-s-40 {
    font-size: 40px;
  }

  .player--winner {
    color: #ff3e00;
    text-align: center;
    padding-bottom: 40px;
  }

  /* .player-involved {
    display: block;
  }
  .player-involved:nth-child(even) {
    float: left;
    clear: left;
  }
  .player-involved:nth-child(odd) {
    clear: right;
    float: right;
  } */

  .score-card {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    background: white;
    margin: 20px;
    border-radius: 8px;
  }

</style>

<div class="score-card w-100">
  <div class="flex-row justify-content-space-around">
    <PlayerCard playerInfo={game.player1} />
    <div class="flex-column justify-content-space-around">
      <div class="vs">VS</div>
    </div>
    <PlayerCard playerInfo={game.player2} />
  </div>
  <div class="text-align-center f-s-40">Score</div>
  <div class="text-align-center f-s-40">{game.result}</div>
  <div class="player player--winner text-align-center f-s-40">Winner: {game.winner.username}</div>
</div>
<!-- <p class="player player--winner">Winner: {game.winner.username}</p>
  <p>Score: {game.result}</p>

  <div class="players">
    <p class="player-involved">Player 1: {game.player1.username}</p>
    <p class="player-involved">Player 2: {game.player2.username}</p>
  </div> -->
