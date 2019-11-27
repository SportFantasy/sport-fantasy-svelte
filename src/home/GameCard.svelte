<script>
export let game = {}
</script>

<article>
  <h1>{game.gameType.name}</h1>
  <p class="player player--winner">Winner: {game.winner.username}</p>
  <p>Score: {game.result}</p>

  <div class="players">
    <p class="player-involved">Player 1: {game.player1.username}</p>
    <p class="player-involved">Player 2: {game.player2.username}</p>
  </div>
</article>

<style>

article {
  box-sizing: border-box;
  width: 48%;
  margin: 0.5em 1%;
  padding: 1em;
  border: 2px solid #fff;
}

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

.player--winner {
  color: #ff3e00;
}

.player-involved {
  display: block;
}
.player-involved:nth-child(even) {
  float: left;
  clear: left;
}
.player-involved:nth-child(odd) {
  clear: right;
  float: right
}
</style>
