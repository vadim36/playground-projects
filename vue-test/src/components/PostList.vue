<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <ul>
      <TransitionGroup name="posts-list">
        <post-item v-for="post in posts" :post="post" :key="post.id"
          @remove="$emit('remove', post)"/>
      </TransitionGroup>
    </ul>
  </div>
  <h2 v-else style="color: red;">Список постов пуст</h2>
</template>

<script lang="ts">
import { defineComponent, TransitionGroup, type PropType } from 'vue';
import type {Post} from '../pages/PostsPage.vue'
import PostItem from './PostItem.vue';

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true
    }
  },
  components: {
    PostItem
  }
})
</script>

<style scoped>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}

.posts-list-enter-active,
.posts-list-leave-active {
  transition: all .35s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.posts-list-move {
  transition: transform .8s ease;
}
</style>