import Home from '../home/Home.svelte'
import Games from '../games/Games.svelte'
import SubmitGame from '../games/SubmitGame.svelte'
import User from '../common/User.svelte'
import Logout from './Logout/Logout.svelte'

const AUTH_ROUTER_CONFIG = {
  '/': Home,
  '/games': Games,
  '/games/:gameTypeId': Games,
  '/submit-game': SubmitGame,
  '/user' : User,
  '/logout' : Logout,
}

export default AUTH_ROUTER_CONFIG
