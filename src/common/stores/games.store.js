import { writable } from 'svelte/store'


const INITIAL_STORE = {
  gameTypes: {},
  games: {},
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
    }
}

export const gamesStore = createGamesStore()
