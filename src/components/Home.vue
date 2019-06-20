<template>
  <div v-if="!loading">
    <v-container
      v-if="promoProducts.length > 0"
      fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            delimiter-icon="stop"
            prev-icon="mdi-arrow-left"
            next-icon="mdi-arrow-right"
          >
            <v-carousel-item
              v-for="(item,i) in promoProducts"
              :key="i"
              :src="item.imgSrc"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="(product, index) in products"
          :key="index"
        >
          <v-card>
            <router-link
              :aria-label="product.title"
              :to="'/product/'+product.id"
            >
              <v-img
                :src="product.imgSrc"
                min-height="250px"
              ></v-img>
            </router-link>
            <v-card-title class="card_heading heading" primary-title>
              <div>
                <h3 class="headline mb-0">{{ product.title }}</h3>
                <div class="card_describe">
                  <p class="subheading">{{ product.description }}</p>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat dark color="light-blue darken-4" :to="'/product/'+product.id">More</v-btn>
              <app-buy-dialog :product="product"></app-buy-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    products () {
      return this.$store.getters.products
    },
    promoProducts () {
      return this.$store.getters.promoProducts
    },
    loading () {
      return this.$store.getters.loading
    }
  }
};
</script>

<style scoped>
  .card_heading {
    font-weight: bold;
    word-wrap: break-word;
    text-align: left;
    margin-bottom: 1.5rem;
  }
  .card_describe {
    margin-top: auto;
  }
</style>
