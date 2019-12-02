import LoginPage from './LoginPage/LoginPage.svelte'
import NonAuthRedirect from '../common/NonAuthRedirect.svelte'
import { NON_AUTH_ROUTES } from './auth.consts'


const NON_AUTH_ROUTER_CONFIG = {
  [NON_AUTH_ROUTES.LOGIN]: LoginPage,
  '*': NonAuthRedirect,
}

export default NON_AUTH_ROUTER_CONFIG
