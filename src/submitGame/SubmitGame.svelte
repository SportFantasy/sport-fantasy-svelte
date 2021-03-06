<script>
import { fade } from 'svelte/transition'
import { onDestroy } from 'svelte'
import { createNewGame } from '../common/db/games'
import { gamesStore } from '../games/games.store'
import { usersStore } from '../user/users.store'
import { reloadAllDataAndGetConfirmedGamesByGameTypeId } from '../games/games.service'
import { getUnixTimeStampFromDate } from '../util/time.helper'
import { validate, buildHumanErrors} from '../util/validation.service'
import validationSchema from './SubmitGame.formValidationSchema'

import DropDownSelector from '../common/DropDownSelector.svelte'
import DatePicker from 'svelte-calendar'


const datePickerFormat = '#{d}/#{m}/#{Y}'
const datePickerStartDate = new Date(2018, 0, 1)
const datePickerEndDate = new Date()

let gameTypeId
let player1Id
let player2Id
let player1Score
let player2Score
let selectedDate
let validationErrors = ''
let message = ''
let clearSuccessMessageTimer
let scrollY = 0

const resetForm = () => {
    gameTypeId = undefined
    player1Id = undefined
    player2Id = undefined
    player1Score = undefined
    player2Score = undefined
    validationErrors = ''
    message = ''
}

const showSuccessMessage = (timeInMiliseconds = 5000) => {
    scrollY = 0
    message = 'Success!'
    clearSuccessMessageTimer = setTimeout(() => {
        message = ''
    }, timeInMiliseconds)
}

const handleSubmit = (event) => {
    event.preventDefault()

    const datePlayed = getUnixTimeStampFromDate(selectedDate)
    const inputGameData = {
        gameTypeId,
        player1Id,
        player2Id,
        player1Score,
        player2Score,
        datePlayed,
    }

    // validate form
    const validationErrorsArr = validate(validationSchema, inputGameData)
    if (validationErrorsArr.length) {
        validationErrors = buildHumanErrors( validationSchema, validationErrorsArr ).join(' ')
        return
    } else {
        validationErrors = ''
    }

    createNewGame(inputGameData)
        .then(() => {
            resetForm()
            showSuccessMessage(5)
        })
        .then(() => reloadAllDataAndGetConfirmedGamesByGameTypeId('all'))
        .catch((error) => {
            validationErrors = error.message
        })
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
      display: `${user.displayName} [${user.email}]`,
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

$: usersForDd = getUsersArrayForDD($usersStore.users)

onDestroy( () => {
    clearTimeout(clearSuccessMessageTimer)
    clearSuccessMessageTimer = null
})
</script>

<svelte:window bind:scrollY={scrollY}/>

<h1 class="text-center">Submit Game</h1>


<form class="styled-form" on:submit={handleSubmit} transition:fade>
  <ul>

      {#if message}
          <li>
              <p class="styled-form__message styled-form__message--success">{message}</p>
          </li>
      {/if}

    <li class="styled-form__row">
        <label class="styled-form__label" for="gameType">Game Type</label>
        <DropDownSelector
          isTransparent={true}
          textAlign="left"
          values={getGameTypesArrayForDD($gamesStore.gameTypes)}
          onClickCb={handleGameTypeDDClick}
          selectedValueId={gameTypeId}
        />
        <span class="styled-form__placeholder">Select game type from the list</span>
    </li>

    <li class="styled-form__row">
        <label class="styled-form__label" for="datePlayed">Date Played</label>
        <DatePicker
          bind:selected={selectedDate}
          format={datePickerFormat}
          start={datePickerStartDate}
          end={datePickerEndDate}
        />
        <span class="styled-form__placeholder">Select the date from calendar</span>
    </li>

    <li class="styled-form__row">
        <label class="styled-form__label" for="player1">Player 1</label>
        <DropDownSelector
          isTransparent={true}
          textAlign="left"
          values={usersForDd}
          onClickCb={handlePlayer1DDClick}
          selectedValueId={player1Id}
        />
        <span class="styled-form__placeholder">Select player 1 from the list</span>
    </li>

    <li class="styled-form__row">
        <label class="styled-form__label" for="player1Score">Player 1 score</label>
        <input
          required
          class="styled-form__input"
          type="number"
          name="player1Score"
          maxlength="100"
          min="0"
          max="100"
          bind:value={player1Score}
        />
        <span class="styled-form__placeholder">Enter player 1 score</span>
    </li>

    <li class="styled-form__row">
        <label class="styled-form__label" for="player2">Player 2</label>
        <DropDownSelector
          isTransparent={true}
          textAlign="left"
          values={usersForDd}
          onClickCb={handlePlayer2DDClick}
          selectedValueId={player2Id}
        />
        <span class="styled-form__placeholder">Select player 2 from the list</span>
    </li>

    <li class="styled-form__row">
        <label class="styled-form__label" for="player2Score">Player 2 score</label>
        <input
          required
          class="styled-form__input"
          type="number"
          name="player2Score"
          maxlength="100"
          min="0"
          max="100"
          bind:value={player2Score}
        />
        <span class="styled-form__placeholder">Enter player 2 score</span>
    </li>

    {#if validationErrors}
      <li>
          <p class="styled-form__message styled-form__message--error">{validationErrors}</p>
      </li>
    {/if}

    <li class="styled-form__row">
        <input
          class="styled-form__input styled-form__input--button"
          type="submit"
          value="Send This"
        />
    </li>
  </ul>
</form>


<style>
.styled-form {
	max-width: 400px;
	margin: 0 auto;
	background: #fff;
	border-radius: 2px;
	padding: 20px;
}
.styled-form__row {
	display: block;
	padding: 9px 0;
	border: 1px solid var(--form-border-color);
	margin-bottom: 30px;
	border-radius: 3px;
}
.styled-form__row:last-child {
	border:none;
	margin-bottom: 0;
	text-align: center;
}
.styled-form__label {
	display: block;
	float: left;
	margin-top: -19px;
	background: #FFFFFF;
	height: 14px;
	padding: 2px 5px 2px 5px;
	color: var(--color-emphasize);
	font-size: 14px;
	overflow: hidden;
}
.styled-form__input {
  display: block;
  width: 100%;
  color: var(--main-text-color);
	outline: none;
	border: none;
	height: 25px;
	line-height: 25px;
	font-size: 16px;
	padding: 0;
}
.styled-form__placeholder {
	background: var(--form-border-color);
	display: block;
	padding: 3px;
	margin: 0 0 -9px 0;
	text-align: center;
	color: var(--form-placeholder-color);
	font-size: 11px;
}
.styled-form__input--button {
  transition: background-color 0.2s;
	background-color: var(--palette-color-4);
  border: none;
  height: auto;
	padding: 0.5em;
	border-bottom: 3px solid var(--palette-color-5);
	border-radius: 3px;
  color: #fff;
}

.styled-form__input--button:hover,
.styled-form__input--button:focus {
  cursor: pointer;
  background-color: var(--color-emphasize);
  color:#fff;
}

.styled-form__message {
    margin: 0;
    text-align: center;
}
.styled-form__message--success {
    color: var(--color-success);
}
.styled-form__message--error {
    color: var(--color-error);
}
</style>
