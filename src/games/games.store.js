import { writable } from 'svelte/store'


const INITIAL_STORE = {
  gameTypes: {},
  games: {},
}

const updateSingleGame = (games, singleGame) => {
  let newGames = { ...games }
  const gameId = singleGame.id
  newGames[gameId] = {
    ...newGames[gameId],
    ...singleGame,
  }
  return newGames
}

const createGamesStore = () => {
    const store = writable(INITIAL_STORE)

    return {
        subscribe: store.subscribe,
        setGameTypes: (gameTypes) => {
            store.update((currentData) => ({
              ...currentData,
              gameTypes,
            }))
        },
        setGames: (games) => {
            store.update((currentData) => ({
              ...currentData,
              games,
            }))
        },
        updateSingleGame: singleGame => {
          store.update((currentData) => ({
            ...currentData,
            games: updateSingleGame(currentData.games, singleGame),
          }))
        },
    }
}

export const gamesStore = createGamesStore()
