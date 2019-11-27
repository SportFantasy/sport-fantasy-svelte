import { writable } from 'svelte/store'


const INITIAL_STORE = {
    isAuthenticated: true,
    authToken: '',
}

const createStore = () => {
    const store = writable(INITIAL_STORE)

    const setAuthToken = (newAuthToken) => {
      store.update((storeData) => ({
        ...storeData,
        authToken: newAuthToken,
      }))
    }

    const setIsAuthenticated = (newIsAuthenticated) => {
      store.update((storeData) => ({
        ...storeData,
        isAuthenticated: newIsAuthenticated,
      }))
    }

    return {
        subscribe: store.subscribe,
        setIsAuthenticated,
        setAuthToken,
    }
}

export const authStore = createStore()
