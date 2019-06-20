<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
            subheader
            two-line
        >
          <v-list-tile
            avatar
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-list-tile-action>
              <v-checkbox
                color="success"
                @change="markDone(order)"
                :input-value="order.done"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.email }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn :to="'/product/'+order.productId" class="primary">OPEN</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-xs-center pt-5" v-else>
        <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import { orderConst } from '../../store/constants';

  export default {
    name: 'Checkout',
    methods: {
      markDone: function (order) {
        this.$store.dispatch(orderConst.markOrder, order.id)
          .then(() => order.done = true)
          .catch(() => {})
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      orders () {
        return this.$store.getters.orders;
      }
    },
    created () {
      this.$store.dispatch(orderConst.fetchOrders)
    }
  }
</script>

<style scoped>

</style>
