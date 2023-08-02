<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top justify-content-center px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <div class="josefin fs-1">g a t h e r w i s e </div>
      </div>
    </router-link>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.josefin {
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  text-shadow: 1px 2px 2px rgb(0, 0, 0);
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
