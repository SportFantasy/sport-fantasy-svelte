import Home from './home/Home.svelte';
import HomeIdNum from './home/HomeIdNum.svelte';
import Nest from './nest/Nest.svelte';

const AUTH_APP_ROUTES = {
  '/': Home,
  '/home': Home,
  '/home/:gameTypeId': Home,
  '/home/:id/:num': HomeIdNum,
  '/nest': Nest,
  '/nest/*': Nest,
  '*': Home,
}

export default AUTH_APP_ROUTES
