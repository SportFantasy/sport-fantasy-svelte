import { get } from 'svelte/store'
import { usersStore } from './users.store'
import { fetchUserById } from '../common/db/users'


export const getUserByIdFromStore = (userId) => {
    const users = get(usersStore).users
    return users[userId]
}

export const fetchUserDataById = (userId) => {
    return fetchUserById(userId)
        .then(usersStore.updateUser)
        .then(() => getUserByIdFromStore(userId) )
}
