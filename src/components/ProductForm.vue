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
          <v-file-input accept="image/png, image/jpeg" prepend-icon="mdi-camera" label="Image" v-model="image"
            :error-messages="errors.image?.[0]" />
          <v-img v-if="form.image" :src="form.image"></v-img>
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
import { ProductForm, ProductError } from '@/interfaces/product.interface'
import { useUploadImage } from '@/composables/useUploadImage';

const props = defineProps(['showModal', 'productId']);
const emit = defineEmits(['update:showModal', 'reloadData']);
const title = computed(() => {
  return props.productId ? 'Edit Product' : 'New Product'
})
const form = ref<ProductForm>({
  name: '',
  price: null,
  stock: null,
  image: null
})
const errors = ref<ProductError>({});
const submitMethod = ref('')
const urlMethod = ref('')
const loading = ref(false)
const submitLoading = ref(false)
const image = ref<File[]>([])

const initForm = () => {
  form.value = {
    name: '',
    price: null,
    stock: null,
    image: null
  }
  errors.value = {}
  image.value = []
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

const { uploadImage } = useUploadImage()

watch(image, async (value) => {
  console.log(value[0])
  if (value[0]) {
    loading.value = true
    let response = await uploadImage(value[0])
    form.value.image = response.full_url_image
    loading.value = false
  } else {
    form.value.image = null
  }
})

const loadProduct = () => {
  loading.value = true
  if (props.productId) {
    submitMethod.value = 'put'
    urlMethod.value = `/products/${props.productId}`
    http.get(`/products/${props.productId}`)
      .then(response => {
        form.value = response.data
        loading.value = false
      })
  } else {
    submitMethod.value = 'post'
    urlMethod.value = `/products`
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
