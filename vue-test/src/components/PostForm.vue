<template>
  <form @submit.prevent="createPost">
    <h3>Создание поста</h3>
    <my-input v-model="newPost.title" type="text" placeholder="Name..." v-focus/>
    <my-input v-model="newPost.body" type="text" placeholder="Body..."/>
    <my-button>Submit</my-button>
  </form>
</template>

<script lang="ts">
import type { Post } from '../pages/PostsPage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      newPost: {
        title: '',
        body: ''
      } as Omit<Post, 'id'>
    }
  },
  methods: {
    createPost() {
      if (!this.newPost.title || !this.newPost.body) return
      const post: Post = {id: Date.now(), ...this.newPost}
      this.$emit('create', post)
      this.newPost.title = ''
      this.newPost.body = ''
    }
  }
})
</script>