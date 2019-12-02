<script>
  // redirects to "/login" if route is invalid

  import { onMount, onDestroy } from 'svelte'
  import { location, push } from 'svelte-spa-router'
  import _filter from 'lodash/filter'
  import { NON_AUTH_ROUTES } from '../auth/auth.consts'


  let unsubscribeLocationChangeHandler

  const getIsRouteValidNonAuthRoute = (route, routes) => {
    const routesArr = Object.values(routes)
    const filteredArr = _filter(routesArr, (route) => (route !== NON_AUTH_ROUTES.ROOT) )
    return !!( ~filteredArr.indexOf(route) )
  }

  const handleLocationChange = (location) => {
    const isRouteValid = getIsRouteValidNonAuthRoute(location, NON_AUTH_ROUTES)
    if (!isRouteValid) {
      return push(NON_AUTH_ROUTES.LOGIN)
    }
  }

  onMount( () => {
    unsubscribeLocationChangeHandler = location.subscribe(handleLocationChange)
  })

  onDestroy( () => {
    unsubscribeLocationChangeHandler()
  })
</script>
