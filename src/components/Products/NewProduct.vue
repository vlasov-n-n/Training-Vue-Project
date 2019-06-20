<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new product</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mb-3"
        >
          <v-text-field
            name="title"
            label="Title*"
            type="text"
            required
            :rules="[v => !!v || 'Title is require']"
            v-model="title"> </v-text-field>
          <v-text-field
            name="vendor"
            label="Vendor Product"
            type="text"
            v-model="vendor"> </v-text-field>
          <v-text-field
            name="color"
            label="Color Product"
            type="text"
            v-model="color"> </v-text-field>
          <v-text-field
            name="material"
            label="Material Product"
            type="text"
            v-model="material"> </v-text-field>
          <v-text-field
            name="price"
            label="Price Product*"
            type="text"
            :rules="[v => !!v || 'Price is require']"
            requaired
            v-model="price"> </v-text-field>
          <v-textarea
            name="description"
            label="Description Product"
            type="text"
            v-model="description"> </v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn class="warning" @click="upload">
              UPLOAD
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              @change="onFileChange"
              style="display: none"
              accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-img :src="imageSrc" max-height="200" v-if="imageSrc"></v-img>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
            color="primary"
            label="Add to promo?"
            v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createProduct"
            >
              Create product
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { productConst } from '../../store/constants';

  export default {
    name: 'NewProduct',
    data () {
      return {
        title: '',
        vendor: '',
        color: '',
        material: '',
        price: 0,
        description: '',
        promo: false,
        valid: false,
        image: null,
        imageSrc: ''
      }
    },
    methods: {
      createProduct () {
        if (this.$refs.form.validate() && this.image) {
          const product = {
            title: this.title,
            vendor: this.vendor,
            color: this.color,
            material: this.material,
            price: this.price,
            description: this.description,
            promo: this.promo,
            image: this.image
          };

          this.$store.dispatch(productConst.createProduct, product)
            .then(() => this.$router.push('/list'))
            .catch(() => {})
        }
      },
      upload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.imageSrc = reader.result
        };
        reader.readAsDataURL(file);
        this.image = file
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
