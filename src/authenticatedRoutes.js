import Home from './home/Home.svelte';
import SubmitGame from './home/SubmitGame.svelte';
import Nest from './nest/Nest.svelte';
import User from './common/User.svelte'

const AUTH_APP_ROUTES = {
  '/': Home,
  '/home': Home,
  '/home/:gameTypeId': Home,
  '/submit-game': SubmitGame,
  '/nest': Nest,
  '/nest/*': Nest,
  '/user' : User,
  '*': Home,
}

export default AUTH_APP_ROUTES
