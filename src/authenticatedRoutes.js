import Home from './home/Home.svelte';
import Games from './games/Games.svelte';
import SubmitGame from './games/SubmitGame.svelte';
import User from './common/User.svelte'

const AUTH_APP_ROUTES = {
  '/': Home,
  '/games': Games,
  '/games/:gameTypeId': Games,
  '/submit-game': SubmitGame,
  '/user' : User,
  '*': Home,
}

export default AUTH_APP_ROUTES
