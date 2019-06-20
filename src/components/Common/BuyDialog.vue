<template>
  <v-dialog width="400px" v-model="dialog">
    <v-btn class="green" dark slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Buy Product</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Name"
                type="text"
                required
                :rules="nameRules"
                v-model="name"></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
                v-model="email"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="light-blue darken-4"
                outline
                :disabled="localLoading"
                @click="onClose"
              >Cancel</v-btn>
              <v-btn
                dark
                color="light-blue darken-4"
                :disabled="localLoading"
                :loading="localLoading"
                @click="onBuy"
              >Buy</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { orderConst } from '../../store/constants';

  export default {
    name: 'BuyDialog',
    props: ['product'],
    data () {
      return {
        dialog: false,
        name: '',
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          v => !!v || 'Name is required',
        ],
        localLoading: false
      }
    },
    methods: {
      onClose () {
        this.name = '';
        this.email = '';
        this.dialog = false;
      },
      onBuy () {
        if ((this.name !== '') && (this.email !== '')) {
          this.localLoading = true;
          this.$store.dispatch(orderConst.createOrder, {
            name: this.name,
            email: this.email,
            productId: this.product.id,
            ownId: this.product.ownId
          })
            .finally(() => {
              this.name = '';
              this.email = '';
              this.localLoading = false;
              this.dialog = false;
            });
        }
      },
    }
  }
</script>

<style scoped>

</style>
