import { writable } from 'svelte/store'


const INITIAL_STORE = {}

const createUsersStore = () => {
    const store = writable(INITIAL_STORE)

    return {
        subscribe: store.subscribe,
        setUsers: (users) => {
            store.update((currentData) => ({
              ...users,
            }))
        },
        updateUser: (user) => {
            store.update((currentData) => ({
              ...currentData,
              [user.id]: {
                ...currentData[user.id],
                ...user,
              }
            }))
        },
    }
}

export const usersStore = createUsersStore()
