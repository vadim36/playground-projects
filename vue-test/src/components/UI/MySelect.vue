<template>
  <select v-model="modelValue" @change="changeOption">
    <option value="" disabled>Выберите что-нибудь из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export type Option = {
  value: string
  name: string
}

export default defineComponent({
  name: "my-select",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    }
  },
  methods: {
    changeOption(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
})
</script>

<style scoped>

</style>