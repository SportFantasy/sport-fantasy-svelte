import { writable } from 'svelte/store'


const INITIAL_STORE = {
    isAuthenticated: false,
    authToken: '',
    loggedUser: null,
}

const createStore = () => {
    const store = writable(INITIAL_STORE)


    const login = (newAuthToken, newUser) => {
      store.update((storeData) => ({
        ...storeData,
        authToken: newAuthToken,
        isAuthenticated: true,
        loggedUser: newUser,
      }))
    }

    const logout = () => {
      store.update((storeData) => ({
        ...INITIAL_STORE,
      }))
    }

    return {
        subscribe: store.subscribe,
        logout,
        login,
    }
}

export const authStore = createStore()
