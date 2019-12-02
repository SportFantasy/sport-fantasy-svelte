import { writable } from 'svelte/store'


const INITIAL_STORE = {
    isAuthInProgress: false,
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

    const setIsAuthInProgress = (newIsAuthInProgress) => {
      store.update((storeData) => ({
        ...storeData,
        isAuthInProgress: newIsAuthInProgress,
      }))
    }

    return {
        subscribe: store.subscribe,
        setIsAuthInProgress,
        logout,
        login,
    }
}

export const authStore = createStore()
