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

    const setLoggedUser = (newUser) => {
      store.update((storeData) => ({
        ...storeData,
        loggedUser: newUser,
      }))
    }

    const setIsAuthenticated = (newIsAuthenticated) => {
      store.update((storeData) => ({
        ...storeData,
        isAuthenticated: newIsAuthenticated,
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
        setLoggedUser,
        setIsAuthenticated,
        setIsAuthInProgress,
        logout,
        login,
    }
}

export const authStore = createStore()
