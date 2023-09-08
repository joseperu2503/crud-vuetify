<template>
  <v-card :title="title" :loading="loading">
    <v-card-text>
      <v-form @keydown.enter="submit" class="mt-6">
        <v-row>
          <v-col cols="12" md="7">
            <v-text-field label="Name*" v-model="form.name" :error-messages="errors.name?.[0]" color="primary" />
            <v-textarea variant="filled" label="Description*" auto-grow v-model="form.description"
              :error-messages="errors.description?.[0]" class="mt-4"></v-textarea>
            <v-select :items="brands" v-model="form.brand_id" label="Brand" item-title="name" item-value="id"
              class="mt-4"></v-select>
            <v-text-field label="Price*" type="number" v-model="form.price" :error-messages="errors.price?.[0]" prefix="$"
              class="mt-4" color="primary" />
            <v-text-field label="Stock*" type="number" v-model="form.stock" :error-messages="errors.stock?.[0]"
              class="mt-4" color="primary" />
            <v-select :items="categories" v-model="form.category_id" label="Category" item-title="name" item-value="id"
              class="mt-4" />
            <v-btn-toggle multiple divided variant="outlined" color="primary" v-model="form.genders">
              <v-btn :value="gender.id" v-for="(gender, index) in genders" :key="index">{{ gender.name }}</v-btn>
            </v-btn-toggle>
            <v-btn-toggle multiple divided variant="outlined" color="primary" class="mt-4" v-model="form.sizes">
              <v-btn :value="size.id" v-for="(size, index) in sizes" :key="index">{{ size.name }}</v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" md="5">
            <v-color-picker :modes="['hex']" width="100%" v-model="colorPicker"></v-color-picker>
            <v-btn class="mt-4 w-100" prepend-icon="mdi-plus" @click="addColor">
              Add color
            </v-btn>
            <div class="colors mt-4 mb-4">
              <div v-for="(color, index) in form.colors" :key="index" class="color-item" :style="{ 'background': color }">
              </div>
            </div>
            <v-divider></v-divider>

            <v-file-input accept="image/png, image/jpeg" prepend-icon="mdi-camera" label="Images" v-model="images"
              :error-messages="errors.images?.[0]" multiple class="d-none" ref="imageInput" />
            <v-btn prepend-icon="mdi-camera" class="mt-4 w-100" @click="clickAddImage">
              Subir imagen
            </v-btn>
            <v-carousel hide-delimiters v-if="form.images.length > 0" height="300" class="mt-4 mb-4">
              <v-carousel-item v-for="(image, index) in form.images" :key="index" :src="image" contain></v-carousel-item>
            </v-carousel>
            <v-divider></v-divider>

            <v-switch hide-details label="Publico" color="primary" v-model="form.is_public"></v-switch>
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
import { ProductForm, ProductErrors, Brand, Size, Gender, Category } from '@/interfaces/product.interface'
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
  images: [],
  brand_id: null,
  category_id: null,
  colors: [],
  description: '',
  is_public: false,
  genders: [],
  sizes: []
})

const brands = ref<Brand[]>([])
const categories = ref<Category[]>([])
const sizes = ref<Size[]>([])
const genders = ref<Gender[]>([])

const errors = ref<ProductErrors>({});
const submitMethod = ref('')
const urlMethod = ref('')
const loading = ref(false)
const submitLoading = ref(false)
const images = ref<File[]>([])
const title = ref('')
const colorPicker = ref('#000000')

const initForm = () => {
  form.value = {
    name: '',
    price: null,
    stock: null,
    images: [],
    brand_id: null,
    category_id: null,
    colors: [],
    description: '',
    is_public: false,
    genders: [],
    sizes: []
  }
  errors.value = {}
  images.value = []
  colorPicker.value = '#000000'
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
    try {
      let response = await appApi.get(`/products/${productId.value}`)
      form.value = response.data
    } catch (error) {
      openSnackbar('An error occurred. Please try again.', 'error')
    }
  } else {
    title.value = 'New Product'
    submitMethod.value = 'post'
    urlMethod.value = `/products`
  }
  await loadFormData()
  loading.value = false
}

const loadFormData = async () => {
  let response = await appApi.get(`/products/form-data`)
  brands.value = response.data.brands
  categories.value = response.data.brands
  sizes.value = response.data.sizes
  genders.value = response.data.genders
}

const { openSnackbar } = useSnackbar()

const submit = async () => {
  console.log(form.value)
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
  console.log(imageInput.value?.click())
}

initForm()
loadProduct()

const closeForm = () => {
  router.push('/my-products')
}

const addColor = () => {
  form.value.colors.push(colorPicker.value)
}

</script>
<style>
.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-item {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}
</style>