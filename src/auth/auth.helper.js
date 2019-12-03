import { fetchUserById, createUserById } from '../common/db/users'

const LOCAL_STORAGE_USER_DATA_KEY = 'LOGGED_USER'


export const persistUserLoginData = (loggedUserData) => {
  localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(loggedUserData))
}

export const clearUserLoginData = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY)
}

export const getPersistedUserLoginData = () => {
  const foundUser = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)
  try {
    if (foundUser) {
      return JSON.parse(foundUser)
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export const getUserDataFromGoogleUser = (googleData) => {
  const token = googleData.credential.oauthIdToken || googleData.credential.idToken
  const loggedUser = {
    uid: googleData.user.uid,
    displayName: googleData.user.displayName,
    email: googleData.user.email,
    token,
    refreshToken: googleData.user.refreshToken,
    credential: googleData.credential,
  }

  return loggedUser
}

export const getAndCreateUserById = ({id, email, displayName}) => {
  return fetchUserById(id)
    .catch((error) => {
      return createUserById({
        id,
        email,
        displayName,
      })
    })
}
