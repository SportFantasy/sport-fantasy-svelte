import Home from '../home/Home.svelte'
import Games from '../games/Games.svelte'
import SubmitGame from '../submitGame/SubmitGame.svelte'
import User from '../user/User.svelte'
import Logout from './Logout/Logout.svelte'
import Confirm from '../confirm/Confirm.svelte'


const AUTH_ROUTER_CONFIG = {
  '/': Home,
  '/home/:topResultSlug': Home,
  '/games': Games,
  '/games/:gameTypeId': Games,
  '/submit-game': SubmitGame,
  '/user' : User,
  '/user/:userId' : User,
  '/confirm' : Confirm,
  '/logout' : Logout,
}

export default AUTH_ROUTER_CONFIG
