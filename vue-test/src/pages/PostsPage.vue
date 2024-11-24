<template>
  <my-button @click="dialogVisible = true">Создать пост</my-button>
  <my-input v-model="searchQuery" placeholder="Поиск..."/>
  <my-select v-model="selectedSort" :options="sortOptions"/>
  <my-dialog v-model:show="dialogVisible">
    <post-form @create="createPost"/>
  </my-dialog>
  <!--<pagination-buttons :totalPages="totalPages" :currentPage="page"
    @changePage="changePage"/>-->
  <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
  <h2 v-else>Идет загрузка...</h2>
  <div class="observer" v-intersection="loadMorePosts"></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';
import axios from 'axios';
import type { Option } from '../components/UI/MySelect.vue';

export type Post = {
  id: number,
  title: string,
  body: string
}

export default defineComponent({
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false as boolean,
      isPostsLoading: false as boolean,
      selectedSort: '' as string,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ] as Option[],
      searchQuery: '' as string,
      page: 1 as number,
      postsLimit: 10 as number,
      totalPages: 0 as number
    }
  },
  components: {
    PostList, PostForm
  },
  methods: {
    createPost(newPost: Post) {
      this.posts.push(newPost)
    },
    removePost(removingPost: Post) {
      this.posts = this.posts.filter((post) => post.id !== removingPost.id)
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _limit: this.postsLimit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsLimit)
        this.posts = response.data 
      } catch (error) {
        alert(error)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _limit: this.postsLimit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsLimit)
        this.posts = [...this.posts, ...response.data] 
      } catch (error) {
        alert(error)
      }
    },
    //changePage(pageNumber: number) {
    //  this.page = pageNumber
    //  this.fetchPosts()
    //}
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts():Post[] {
      if (!this.selectedSort) return [...this.posts]
      return [...this.posts.sort((a: Post, b: Post) => {
        //@ts-ignore
        return a[this.selectedSort].localeCompare(b[this.selectedSort])
      })]
    },
    sortedAndSearchedPosts():Post[] {
      console.log(this.sortedPosts)
      return this.sortedPosts.filter(post => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  }
})
</script>

<style scoped>
.observer {
  height: 4rem;
  background-color: red;
}
</style>