import LoginPage from './auth/LoginPage/LoginPage.svelte'

const NON_AUTH_APP_ROUTES = {
  '*': LoginPage,
}

export default NON_AUTH_APP_ROUTES
