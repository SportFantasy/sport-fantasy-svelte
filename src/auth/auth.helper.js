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
