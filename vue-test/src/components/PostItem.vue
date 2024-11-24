<template>
  <li class="post">
    <p><strong>Название:</strong> {{ post.title }}</p>
    <p><strong>Описание:</strong> {{ post.body }}</p>
    <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
    <my-button @click="$emit('remove', post)">Удалить</my-button>
  </li>
</template>

<script lang="ts">
import type { Post } from '../pages/PostsPage.vue';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  }
})
</script>

<style scoped>
.post {
  border: 3px solid green;
  padding: 0.75rem;
  font-family: sans-serif;
  margin-top: 10px;
}
</style>