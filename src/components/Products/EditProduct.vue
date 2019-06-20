<template>
  <v-dialog width="400px" v-model="dialog">
    <v-btn color="primary" slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit Product</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  name="title"
                  label="Title"
                  type="text"
                  v-model="editTitle"></v-text-field>
              <v-textarea
                  name="description"
                  label="Description"
                  type="text"
                  v-model="editDescription"></v-textarea>
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
                @click="onCancel"
              >Cancel</v-btn>
              <v-btn
                dark
                color="light-blue darken-4"
                @click="onSave"
              >Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { productConst } from '../../store/constants';

  export default {
    name: 'EditProduct',
    props: ['product'],
    data () {
      return {
        dialog: false,
        editTitle: this.product.title,
        editDescription: this.product.description
      }
    },
    methods: {
      onCancel () {
        this.editTitle = this.product.title;
        this.editDescription = this.product.description;
        this.dialog = false;
      },
      onSave () {
        if ((this.editTitle !== '') && (this.editDescription !== '')) {
          this.$store.dispatch(productConst.editProduct, {
            title: this.editTitle,
            description: this.editDescription,
            id: this.product.id
          });
          this.dialog = false;
        }
      },
    }
  }
</script>

<style scoped>

</style>
