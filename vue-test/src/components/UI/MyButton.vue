<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-button'
})
</script>

<style scoped>
button {
  border: 2px solid green;
  padding: 0.25rem;
  border-radius: .35rem;
  cursor: pointer;
}
</style>