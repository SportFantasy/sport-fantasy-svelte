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
        }
    }
}

export const usersStore = createUsersStore()
