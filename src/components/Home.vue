<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            delimiter-icon="stop"
            prev-icon="mdi-arrow-left"
            next-icon="mdi-arrow-right"
          >
            <v-carousel-item
              v-for="(item,i) in products"
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
                <h3 class="headline mb-0">{{ product.name }}</h3>
                <div class="card_describe">
                  <p class="subheading">{{ product.description.substring(0,60) }}</p>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat dark color="light-blue darken-4" :to="'/product/'+product.id">More</v-btn>
              <v-btn flat dark color="green">Add to card</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      products: [
        {
          id: '1',
          vendor: 'squirrel',
          color: 'squirrel',
          material: 'squirrel',
          description: 'squirrel',
          price: 500,
          promo: false,
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          id: '2',
          vendor: 'sky',
          color: 'sky',
          material: 'sky',
          description: 'sky',
          price: 100,
          promo: false,
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          id: '3',
          vendor: 'bird',
          color: 'bird',
          material: 'bird',
          description: 'bird',
          price: 250,
          promo: false,
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          id: '4',
          vendor: 'planet',
          color: 'planet',
          material: 'planet',
          description: 'planet',
          price: 80,
          promo: false,
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
};
</script>

<style scoped>
  .card_heading {
    font-weight: bold;
    word-wrap: break-word;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .card_describe {
    margin-top: auto;
    padding-left: 1rem;
  }
</style>
