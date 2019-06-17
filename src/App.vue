<template>
  <v-app>
    <nav-bar />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    "nav-bar": Navbar
  },
  data() {
    return {
      //
    };
  }
};
</script>
