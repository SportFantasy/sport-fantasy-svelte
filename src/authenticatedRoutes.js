import Home from './home/Home.svelte';
import Nest from './nest/Nest.svelte';

const AUTH_APP_ROUTES = {
  '/': Home,
  '/home': Home,
  '/home/:gameTypeId': Home,
  '/nest': Nest,
  '/nest/*': Nest,
  '*': Home,
}

export default AUTH_APP_ROUTES
