<script>
    import { fade } from 'svelte/transition'
    import { location } from 'svelte-spa-router'
    import { authStore } from '../auth/auth.store'
    import TopResultSelector from './TopResultSelector.svelte'
    import TopResult from './TopResult.svelte'
    import { TOP_TYPES, HOME_URL_PREFIX } from './TopResult.consts'
    import _find from 'lodash/find'

    const getSelectedTopResultSlugFromUrl = (url) => {
        const slug = url.replace(HOME_URL_PREFIX, '')
        if (slug === '/') {  // in case of "/" Root location
            return ''
        }
        return slug
    }

    const getTopResultStringFromSlug = (topResults, slug) => {
        const foundTopResult = _find(topResults, {slug})
        if (foundTopResult) {
            return foundTopResult.display
        }
    }

    $: slug = getSelectedTopResultSlugFromUrl($location)
</script>

<section class="h-100">
    <h1 class="text-center">Welcome, {$authStore.loggedUser.displayName}</h1>

    <TopResultSelector selectedTopResultSlug={slug} />

    {#if slug}
    <div transition:fade|local>
        <h2>{getTopResultStringFromSlug(TOP_TYPES, slug)}</h2>
        <TopResult topCount={3} topResultSlug={slug} />
    </div>
    {/if}
</section>

<style>
    h2 {
        padding-bottom: 2em;
    }
</style>
