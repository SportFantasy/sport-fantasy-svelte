<script>
import WidgetDetailRow from '../common/WidgetDetailRow.svelte'
import { getShortDisplayDateTime } from '../util/date.helper'

export let user = {}
export let confirmedGamesNo = null
export let unConfirmedGamesNo = null
</script>

<article class="user-widget">
  <h1 class="user-widget__title">{user.displayName}</h1>

  <WidgetDetailRow label="Email" value={user.email} />
  <WidgetDetailRow label="Created" value={getShortDisplayDateTime(user.createdAt)} />
  <WidgetDetailRow label="Last Login" value={getShortDisplayDateTime(user.lastLoginAt)} />
  <WidgetDetailRow label="Identifier" value={user.id} />
  <WidgetDetailRow label="Confirmed Games" value={confirmedGamesNo} />
  <WidgetDetailRow label="Unconfirmed Games" value={unConfirmedGamesNo} />
</article>

<style>
.user-widget {
  position: relative;
  border: 2px solid #555;
  padding: 1em;
  margin-top: 5vh;
}

.user-widget__title {
  margin: 0;
  margin-bottom: 1em;
}
</style>
