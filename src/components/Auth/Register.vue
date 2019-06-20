<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                v-model="email"></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                v-model="password"></v-text-field>
              <v-text-field
                prepend-icon="repeat"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                :rules="confirmPasswordRules"
                v-model="confirmPassword"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              color="primary"
              :disabled="!valid || loading"
              :loading="loading"
            >Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import AuthMixin from './AuthMixin';
  import { userConst } from '../../store/constants';

  export default {
    name: 'Register',
    data() {
      return {
        confirmPassword: '',
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Password should match'
        ]
      }
    },
    methods: {
      onSubmit: function () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          };

          this.$store.dispatch(userConst.registerUser, user)
            .then(() => this.$router.push('/'))
            .catch(() => {})
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    mixins: [AuthMixin]
  }
</script>

<style scoped>

</style>
