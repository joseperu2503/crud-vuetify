<template>
  <v-container>
    <v-layout>
      <v-app-bar :elevation="2" color="primary" density="compact">
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <template v-slot:append>
          <ToogleTheme/>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-account"></v-btn>
            </template>
            <v-list>
              <v-list-item :value="0" @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>
      <v-main class="mt-8">
        <v-card title="Articles" :loading="loading">
          <v-card-text>
            <v-btn prepend-icon="$plus" color="primary" @click="newArticle" class="mt-4">
              New
            </v-btn>

            <v-table class="mt-10">
              <thead>
                <tr>
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    Description
                  </th>
                  <th class="text-left">
                    Price
                  </th>
                  <th class="text-left">
                    Stock
                  </th>
                  <th class="text-left">
                    Date
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in articles" :key="article.id">
                  <td>{{ article.id }}</td>
                  <td>{{ article.description }}</td>
                  <td>{{ article.price }}</td>
                  <td>{{ article.stock }}</td>
                  <td>{{ article.created_at }}</td>
                  <td>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" icon="mdi-dots-vertical" size="small"></v-btn>
                      </template>
                      <v-list>
                        <v-list-item :value="0" @click="editArticle(article.id)" title="Edit" append-icon="mdi-pencil" />
                        <v-list-item :value="0" @click="deleteArticle(article.id)" title="Delete"
                          append-icon="mdi-delete" />
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-main>
    </v-layout>
    <ArticleForm v-model:showModal="showModal" :articleId="articleId" @reloadData="getArticles" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { http } from '@/http/http.service'
import ArticleForm from '@/components/ArticleForm.vue'
import { useLogout } from '@/composables/useLogout'
import { Article } from '@/interfaces/article.interface'
import ToogleTheme from '@/components/ToogleTheme.vue';

const { logout } = useLogout()

const articles = ref<Article[]>([])

const showModal = ref(false)
const loading = ref(false)
const articleId = ref<number | null>(null)

const newArticle = () => {
  articleId.value = null
  showModal.value = true
}

const getArticles = async () => {
  loading.value = true
  try {
    let response = await http.get("/articles")
    articles.value = response.data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const editArticle = (id: number) => {
  articleId.value = id
  showModal.value = true
}

const deleteArticle = (id: number) => {
  http.delete(`/articles/${id}`)
    .then(response => {
      getArticles()
    })
    .catch((error) => {
      console.log(error)
    });
}

getArticles()
</script>
