import { authStore } from './auth.store'
import { get } from 'svelte/store'
import {
    clearUserLoginData,
    getAndCreateUserById,
    getPersistedUserLoginData,
    getUserDataFromGoogleUser,
    persistUserLoginData,
} from './auth.helper'
import { updateUsersLastLoginTimeById } from '../common/db/users'


const _handleGoogleUserAndLastLogin = (googleUserData) => {
    const userData = getUserDataFromGoogleUser(googleUserData)
    persistUserLoginData(userData)
    authStore.setLoggedUser(userData)

    return getAndCreateUserById({
        id: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
    })
        .then((userData) => updateUsersLastLoginTimeById(userData.id))
        .then(() => {
            authStore.setIsAuthenticated(true)
            authStore.setIsAuthInProgress(false)
        })
        .catch( (error) => {
            console.log(error)
            authStore.setIsAuthInProgress(false)
            return Promise.reject(error)
        })
}

export const googleSignInWithPopup = () => {
    authStore.setIsAuthInProgress(true)
    const provider = new firebase.auth.GoogleAuthProvider()

    return firebase.auth().signInWithPopup(provider)
        .then(_handleGoogleUserAndLastLogin)
}

export const logout = () => {
    clearUserLoginData()
    authStore.logout()
}

export const autoSignIn = () => {
    const loggedUser = getPersistedUserLoginData()
    if (!loggedUser) {
        authStore.setIsAuthInProgress(false)
        return Promise.reject('no saved user')
    }

    try {
        authStore.setIsAuthInProgress(true)
        const credential = firebase.auth.GoogleAuthProvider.credential(loggedUser.credential.oauthIdToken)
        return firebase.auth().signInWithCredential(credential)
            .then( _handleGoogleUserAndLastLogin )
            .catch( (error)=> {
                authStore.setIsAuthInProgress(false)
                return Promise.reject(error)
            })
    } catch (error) {
        console.log(error)
        authStore.setIsAuthInProgress(false)
        return Promise.reject(error)
    }
}

export const getLoggedUser = () => {
    return get(authStore).loggedUser
}
