<template>
  <div>
    Страницы:
    <ul>
      <li v-for="page in totalPages" :key="page" :class="{
        'current-page': currentPage === page
      }" @click="changePage(page)">
        <my-button>{{ page }}</my-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }  
  },
  name: 'pagination-buttons',
  methods: {
    changePage(pageNumber: number) {
      this.$emit('changePage', pageNumber)
    }
  }
})
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  gap: .25rem;
}

.current-page {
  border: 4px solid green;
}
</style>