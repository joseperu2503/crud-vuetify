<template>
  <v-dialog :modelValue="showModal" width="95%" max-width="500px"
    @update:modelValue="($event) => emit('update:showModal', $event)">
    <v-card :title="title" :loading="loading">
      <v-card-text>
        <v-form @keydown.enter="submit" class="mt-6">
          <v-text-field label="Name*" v-model="form.name" :error-messages="errors.name?.[0]" class="mt-4"
            color="primary" />
          <v-text-field label="Price*" type="number" v-model="form.price" :error-messages="errors.price?.[0]" prefix="$"
            class="mt-4" color="primary" />
          <v-text-field label="Stock*" type="number" v-model="form.stock" :error-messages="errors.stock?.[0]" class="mt-4"
            color="primary" />
          <v-file-input accept="image/png, image/jpeg" prepend-icon="mdi-camera" label="Images" v-model="images"
            :error-messages="errors.images?.[0]" multiple class="mt-4" />
        </v-form>
        <v-carousel hide-delimiters v-if="form.images.length > 0" height="300">
          <v-carousel-item v-for="(image, index) in form.images" :key="index" :src="image" contain></v-carousel-item>
        </v-carousel>
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
import { ref, watch } from 'vue';
import { appApi } from '@/api/appApi'
import { ProductForm, ProductErrors } from '@/interfaces/product.interface'
import { useUploadImage } from '@/composables/useUploadImage';
import { useSnackbar } from '@/composables/useSnackbar';

const props = defineProps(['showModal', 'productId']);
const emit = defineEmits(['update:showModal', 'reloadData']);
const form = ref<ProductForm>({
  name: '',
  price: null,
  stock: null,
  images: []
})
const errors = ref<ProductErrors>({});
const submitMethod = ref('')
const urlMethod = ref('')
const loading = ref(false)
const submitLoading = ref(false)
const images = ref<File[]>([])
const title = ref('')

const initForm = () => {
  form.value = {
    name: '',
    price: null,
    stock: null,
    images: []
  }
  errors.value = {}
  images.value = []
}

const openModal = () => {
  initForm()
  loadProduct()
}

const closeModal = () => {
  emit('update:showModal', false)
}

watch(() => props.showModal, (showModal) => {
  if (showModal) {
    openModal()
  }
})

const { uploadImages } = useUploadImage()

watch(images, async (newValue) => {
  if (newValue.length != 0) {
    loading.value = true
    try {
      let response = await uploadImages(newValue)
      response.images.map(image => {
        form.value.images?.push(image.full_url_image)
      })
      images.value = []
      openSnackbar(response.message, 'info')
    } catch (error) {
      images.value = []
      openSnackbar('An error occurred. Please try again.', 'error')
    }
    loading.value = false
  }
})

const loadProduct = async () => {
  loading.value = true
  if (props.productId) {
    title.value = 'Edit Product'
    submitMethod.value = 'put'
    urlMethod.value = `/products/${props.productId}`
    let response = await appApi.get(`/products/${props.productId}`)
    form.value = response.data
  } else {
    title.value = 'New Product'
    submitMethod.value = 'post'
    urlMethod.value = `/products`
  }
  loading.value = false
}

const { openSnackbar } = useSnackbar()

const submit = async () => {
  submitLoading.value = true
  try {
    let response = await appApi({
      method: submitMethod.value,
      url: urlMethod.value,
      data: form.value
    })
    emit('reloadData')
    openSnackbar(response.data.message, 'success')
    closeModal()
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      openSnackbar('An error occurred. Please try again.', 'error')
    }
  }
  submitLoading.value = false
}

</script>
