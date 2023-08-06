<template>
  <v-dialog :modelValue="showModal" width="95%" max-width="500px"
    @update:modelValue="($event) => emit('update:showModal', $event)">
    <v-card :title="title" :loading="loading">
      <v-card-text>
        <v-form @keydown.enter="submit" class="mt-6">
          <v-text-field label="Description*" v-model="form.description" :error-messages="errors.description?.[0]"
            class="mt-4" color="primary"/>
          <v-text-field label="Price*" type="number" v-model="form.price" :error-messages="errors.price?.[0]" prefix="$"
            class="mt-4" color="primary"/>
          <v-text-field label="Stock*" type="number" v-model="form.stock" :error-messages="errors.stock?.[0]"
            class="mt-4" color="primary"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeModal" color="blue-darken-1" variant="text">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="submit" :loading="submitLoading">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { http } from '@/http/http.service'
import { ArticleForm, ArticleError } from '@/interfaces/article.interface'

const props = defineProps(['showModal', 'articleId']);
const emit = defineEmits(['update:showModal', 'reloadData']);
const title = computed(() => {
  return props.articleId ? 'Edit Article' : 'New Article'
})
const form = ref<ArticleForm>({
  description: '',
  price: null,
  stock: null
})
const errors = ref<ArticleError>({});
const submitMethod = ref('')
const urlMethod = ref('')
const loading = ref(false)
const submitLoading = ref(false)

const initForm = () => {
  form.value = {
    description: '',
    price: null,
    stock: null
  }
  errors.value = {}
}

const openModal = () => {
  initForm()
  loadArticle()
}

const closeModal = () => {
  emit('update:showModal', false)
}

watch(() => props.showModal, (showModal) => {
  if (showModal) {
    openModal()
  }
})

const loadArticle = () => {
  loading.value = true
  if (props.articleId) {
    submitMethod.value = 'put'
    urlMethod.value = `/articles/${props.articleId}`
    http.get(`/articles/${props.articleId}`)
      .then(response => {
        form.value = response.data
        loading.value = false
      })
  } else {
    submitMethod.value = 'post'
    urlMethod.value = `/articles`
    loading.value = false
  }
}

const submit = () => {
  submitLoading.value = true
  http({
    method: submitMethod.value,
    url: urlMethod.value,
    data: form.value
  })
    .then(response => {
      submitLoading.value = false
      emit('reloadData')
      closeModal()
    })
    .catch((error) => {
      submitLoading.value = false
      console.log(error)
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

</script>
