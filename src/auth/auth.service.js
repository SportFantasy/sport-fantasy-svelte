import { authStore } from './auth.store'
import {
  persistUserLoginData,
  getPersistedUserLoginData,
  getAndCreateUserById,
  getUserDataFromGoogleUser,
  clearUserLoginData,
} from './auth.helper'
import { updateUsersLastLoginTimeById } from '../common/db/users'


export const googleSignInWithPopup = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(provider)
    .then( (googleUserData) => getUserDataFromGoogleUser(googleUserData) )
    .then( (userData) => {
      persistUserLoginData(userData)
      authStore.setLoggedUser(userData)
      return userData
    })
    .then( (userData) => {
      return getAndCreateUserById({
        id: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
      })
    })
    .then( (userData) => updateUsersLastLoginTimeById(userData.id) )
    .then( () => {
      authStore.setIsAuthenticated(true)
      authStore.setIsAuthInProgress(false)
    })
}

export const logout = () => {
  clearUserLoginData()
  authStore.logout()
}
