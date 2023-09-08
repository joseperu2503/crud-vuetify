<template>
  <v-card :title="title" :loading="loading">
    <v-card-text>
      <v-form @keydown.enter="submit" class="mt-6">
        <v-row>
          <v-col cols="12" md="7">
            <v-text-field label="Name*" v-model="form.name" :error-messages="errors.name?.[0]" class="mt-4"
              color="primary" />
            <v-textarea variant="filled" label="Description" auto-grow
              model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."></v-textarea>
            <v-autocomplete label="Brand"
              :items="['Nike', 'Adidas', 'Puma', 'Xiaomi', 'Apple', 'Samsung']"></v-autocomplete>
            <v-text-field label="Price*" type="number" v-model="form.price" :error-messages="errors.price?.[0]" prefix="$"
              class="mt-4" color="primary" />
            <v-text-field label="Stock*" type="number" v-model="form.stock" :error-messages="errors.stock?.[0]"
              class="mt-4" color="primary" />
            <v-autocomplete label="Category"
              :items="['Electronics', 'Clothing and Fashion', 'Home and Garden', 'Health and Beauty', 'Toys and Entertainment', 'Pets', 'Jewelry and Watches']"></v-autocomplete>
            <v-btn-toggle multiple divided variant="outlined" color="primary">
              <v-btn value="s">Hombre</v-btn>
              <v-btn value="m">Mujer</v-btn>
              <v-btn value="l">Niño</v-btn>
              <v-btn value="xl">Niña</v-btn>
            </v-btn-toggle>
            <v-btn-toggle multiple divided variant="outlined" color="primary" class="mt-4">
              <v-btn value="s">S</v-btn>
              <v-btn value="m">M</v-btn>
              <v-btn value="l">L</v-btn>
              <v-btn value="xl">XL</v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" md="5">
            <v-color-picker :modes="['hex']" width="100%"></v-color-picker>
            <v-btn class="mt-4 w-100" prepend-icon="mdi-plus">
              Add color
            </v-btn>
            <v-file-input accept="image/png, image/jpeg" prepend-icon="mdi-camera" label="Images" v-model="images"
              :error-messages="errors.images?.[0]" multiple class="d-none" ref="imageInput" />
            <v-btn prepend-icon="mdi-camera" class="mt-4 w-100" @click="clickAddImage">
              Subir imagen
            </v-btn>
            <v-carousel hide-delimiters v-if="form.images.length > 0" height="300" class="mt-4">
              <v-carousel-item v-for="(image, index) in form.images" :key="index" :src="image" contain></v-carousel-item>
            </v-carousel>
            <v-switch hide-details label="Publico" color="primary"></v-switch>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="closeForm" color="blue-darken-1" variant="text">
        Cancel
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="submit" :loading="submitLoading">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { appApi } from '@/api/appApi'
import { ProductForm, ProductErrors } from '@/interfaces/product.interface'
import { useUploadImage } from '@/composables/useUploadImage';
import { useSnackbar } from '@/composables/useSnackbar';
import { useRoute, useRouter } from 'vue-router';

//ruteo
const route = useRoute()
const router = useRouter()
const productId = ref(route.params.productId)

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

//carga de imagenes
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

//carga del producto
const loadProduct = async () => {
  loading.value = true
  if (productId.value) {
    title.value = 'Edit Product'
    submitMethod.value = 'put'
    urlMethod.value = `/products/${productId.value}`
    let response = await appApi.get(`/products/${productId.value}`)
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
    openSnackbar(response.data.message, 'success')
    closeForm()
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      openSnackbar('An error occurred. Please try again.', 'error')
    }
  }
  submitLoading.value = false
}

const imageInput = ref<any>(null)
const clickAddImage = () => {
  console.log('click')
  console.log(imageInput.value?.click())
}

initForm()
loadProduct()

const closeForm = () => {
  router.push('/my-products')
}

</script>
