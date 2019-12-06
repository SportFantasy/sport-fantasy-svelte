import { writable } from 'svelte/store'


const INITIAL_STORE = {
    isLoading: false,
    errorMessage: '',
    users: null,
}

const createUsersStore = () => {
    const store = writable(INITIAL_STORE)

    return {
        subscribe: store.subscribe,
        setUsers: (users) => {
            store.update((currentData) => ({
                ...currentData,
                users,
            }))
        },
        updateUser: (user) => {
            store.update((currentData) => ({
                ...currentData,
                users: {
                    ...currentData.users,
                    [user.id]: {
                        ...currentData[user.id],
                        ...user,
                    },
                },
            }))
        },
    }
}

export const usersStore = createUsersStore()
