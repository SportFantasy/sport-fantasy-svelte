<script>
import { createNewGame } from '../common/db/games'
import { gamesStore } from '../common/stores/games.store'
import { usersStore } from '../common/stores/users.store'
import { getUnixTimeStampFromDate } from '../util/time.helper'

import DropDownSelector from '../common/DropDownSelector.svelte'
import Datepicker from 'svelte-calendar'

let gameTypeId;
let player1Id;
let player2Id;
let player1Score;
let player2Score;


const datepickerFormat = '#{d}/#{m}/#{Y}'
let selectedDate


const handleSubmit = (event) => {
  event.preventDefault()
  const datePlayed = getUnixTimeStampFromDate(selectedDate)

  createNewGame({
    gameTypeId,
    player1Id,
    player2Id,
    player1Score,
    player2Score,
    datePlayed,
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
      display: user.displayName,
      value: user.id,
    }))
}

const handlePlayer1DDClick = ({value}) => {
  player1Id = value
}
const handlePlayer2DDClick = ({value}) => {
  player2Id = value
}

const handleGameTypeDDClick = ({value}) => {
  gameTypeId = value
}

$: usersForDd = getUsersArrayForDD($usersStore)
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

    <label>
      <span>Date played:</span>
      <div class="form-value">
        <Datepicker
          bind:selected={selectedDate}
          format={datepickerFormat}
         />
      </div>
    </label>

    <button type="submit">Submit</button>
  </form>

</div>

<style>
.form-value {
  display: inline-block;
}
</style>
