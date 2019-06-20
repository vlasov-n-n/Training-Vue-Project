<template>
  <v-container>
    <section class="product mt-3 elevation-10" v-if="!loading">
      <v-layout lg12 row wrap>
        <v-flex xs12 lg6>
          <v-img  class="product_img" :src="product.imgSrc"></v-img>
        </v-flex>
        <v-flex xs12 lg6>
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
            <p class="product_category title">
              <span class="product_title">Span:</span> {{ product.title }}
            </p>
            <p class="product_price title">
              <span class="product_title">Price:</span> ${{ product.price }}
            </p>
            <p class="product_color title">
              <span class="product_title">Color:</span>
              <span
                  :title="product.color"
                  :style="{ backgroundColor: product.color }"
                  class="product_color__bg"
              ></span>
            </p>
            <p class="product_material title">
              <span class="product_title">Material:</span> {{ product.material }}
            </p>
            <div class="title mb-5">
              <p class="product_title mb-2">Description:</p> {{ product.description }}
            </div>
            <app-edit-product v-if="isOwner" :product="product"></app-edit-product>
            <app-buy-dialog :product="product"></app-buy-dialog>
          </div>
        </v-flex>
      </v-layout>
    </section>
    <section v-else >
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
  import EditProduct from './EditProduct';

  export default {
    name: 'Product',
    props: ['id'],
    computed: {
      product () {
        const id = this.id;
        return this.$store.getters.productById(id)
      },
      loading () {
        return this.$store.getters.loading
      },
      isOwner () {
        return this.product.ownId === this.$store.getters.user.id
      }
    },
    components: {
      appEditProduct: EditProduct
    }
  }
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px;
    margin-bottom: 100px;
  }
  .product_img {
    height: 100%;
    width: 550px;
  }
  .product_info {
    margin-left: 50px;
  }
  .product_title {
    font-weight: bold;
    font-size: 1.6rem;
    color: #1875d0;
    margin-bottom: 0;
  }
  .product_price {
    color: red;
  }
  .product_color__bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
  }
</style>
