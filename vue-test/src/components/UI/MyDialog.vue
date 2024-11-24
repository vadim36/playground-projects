<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import toggleMixin from '@/mixins/toggleMixin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'my-dialog',
  mixins: [toggleMixin]
})
</script>

<style scoped>
.dialog {
  inset: 0;
  position: fixed;
  background: rgba(0, 0, 0, .75);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog__content {
  background: #fff;
  min-height: 10rem;
}
</style>