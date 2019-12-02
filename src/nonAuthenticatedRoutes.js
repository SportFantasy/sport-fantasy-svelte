import LoginPage from './auth/LoginPage/LoginPage.svelte'
import NonAuthRedirect from './common/NonAuthRedirect.svelte'


export const NON_AUTH_ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
}

const NON_AUTH_ROUTER_CONFIG = {
  [NON_AUTH_ROUTES.LOGIN]: LoginPage,
  '*': NonAuthRedirect,
}

export default NON_AUTH_ROUTER_CONFIG
