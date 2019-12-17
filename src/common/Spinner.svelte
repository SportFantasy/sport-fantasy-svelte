<div class="loading" />

<style>
.loading {
  position: relative;
  z-index: 999;
  height: 2em;
  width: 2em;
  margin: auto;

  background-color: var(--palette-color-4);

  animation: spinner 1500ms infinite linear;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
