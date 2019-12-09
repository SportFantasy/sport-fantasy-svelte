<script>
  export let label
  export let value
</script>

<div class="detail">
  <span class="detail__key">{label}</span>
  <span class="detail__value">{value}</span>
</div>

<style>
.detail {
  font-size: 1em;
  color: #555;
  display: flex;
}
.detail__key,
.detail__value {
  width: 50%;
  word-break: break-all;
  padding: 5px 0;
}
.detail__key {
  color: #111;
}
</style>
