<template>
  <v-container>
    <v-layout row v-if="!loading && myProducts.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Product List </h1>
        <v-card
          class="elevation-10 mb-2"
          v-for="(product, i) in myProducts"
          :key="i"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="product.imgSrc"
                height="250px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">
                  {{ product.title }}
                </h2>
                <p>
                  {{ product.description }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="'/product/'+product.id" class="info">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myProducts.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text--primary">You have no products</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'ProductList',
    computed: {
      myProducts () {
        return this.$store.getters.myProducts
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
