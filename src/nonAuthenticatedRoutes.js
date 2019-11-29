import LoginPage from './auth/LoginPage/LoginPage.svelte'

const NON_AUTH_APP_ROUTES = {
  '/login/:type': LoginPage,
  '/': LoginPage,
}

export default NON_AUTH_APP_ROUTES
