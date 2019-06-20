<template>
  <v-app>
    <nav-bar/>
    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn
          dark
          flat
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar';
  import { commonConst } from './store/constants';

  export default {
    name: 'App',
    components: {
      'nav-bar': Navbar
    },
    methods: {
      closeError() {
        this.$store.dispatch(commonConst.clearError)
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      }
    }
  };
</script>
