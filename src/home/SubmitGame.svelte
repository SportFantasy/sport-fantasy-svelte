<script>
import { createNewGame } from '../common/db/games'
import { gamesStore } from '../common/games.store'

import DropDownSelector from '../common/DropDownSelector.svelte'

let gameTypeId
let player1Id
let player2Id
let player1Score
let player2Score


const handleSubmit = (event) => {
  event.preventDefault()

  createNewGame({
    gameTypeId,
    player1Id,
    player2Id,
    player1Score,
    player2Score,
  })
    .then(console.log)
    .catch(console.log)
}

const getGameTypesArrayForDD = (gameTypes) => {
  return Object.values(gameTypes)
    .map(gameType => ({
      display: gameType.name,
      value: gameType.id,
    }))
}

const getUsersArrayForDD = (users) => {
  return Object.values(users)
    .map(user => ({
      display: user.username,
      value: user.id,
    }))
}

const handlePlayer1DDClick = ({value}) => {
  console.log(value)
  player1Id = value
}
const handlePlayer2DDClick = ({value}) => {
  console.log(value)
  player2Id = value
}

const handleGameTypeDDClick = ({value}) => {
  console.log(value)
  gameTypeId = value
}

$: usersForDd = getUsersArrayForDD($gamesStore.users)
</script>

<h1>Submit Game</h1>

<div class="login-page">

  <form on:submit={handleSubmit}>
    <label>
      <span>Game Type:</span>
      <div class="form-value">
        <DropDownSelector
          values={getGameTypesArrayForDD($gamesStore.gameTypes)}
          onClickCb={handleGameTypeDDClick}
        />
      </div>
    </label>

    <label>
      <span>Player 1:</span>
      <div class="form-value">
        <DropDownSelector
          values={usersForDd}
          onClickCb={handlePlayer1DDClick}
        />
      </div>
    </label>

    <label>
      <span>Player 2:</span>
      <div class="form-value">
        <DropDownSelector
          values={usersForDd}
          onClickCb={handlePlayer2DDClick}
        />
      </div>
    </label>

    <label>
      <span>Player 1 score:</span>
      <input type="number" bind:value={player1Score} />
    </label>

    <label>
      <span>Player 2 score:</span>
      <input type="number" bind:value={player2Score} />
    </label>

    <button type="submit">Submit</button>
  </form>

</div>

<style>
.form-value {
  display: inline-block;
}
</style>
