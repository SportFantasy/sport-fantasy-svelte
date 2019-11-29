import Home from './home/Home.svelte';
import LoginPage from './auth/LoginPage/LoginPage.svelte'


const NON_AUTH_APP_ROUTES = {
  '/login': LoginPage,
  '/home': LoginPage,
  '/':LoginPage
}

export default NON_AUTH_APP_ROUTES
