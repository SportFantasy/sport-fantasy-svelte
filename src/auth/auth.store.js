import { writable } from 'svelte/store'


const INITIAL_STORE = {
    isAuthenticated: false,
    authToken: '',
}

const createStore = () => {
    const store = writable(INITIAL_STORE)

    const login = (newAuthToken) => {
      store.update((storeData) => ({
        ...storeData,
        authToken: newAuthToken,
        isAuthenticated: true,
      }))
    }

    return {
        subscribe: store.subscribe,
        login,
    }
}

export const authStore = createStore()
