<template>
  <nav class="navbar">
    <router-link :to="{ name: 'Home' }">
      <div class="py-5">
        <img src="../assets/img/logo2.png" style="height: 10vh;" title="Go Home" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>

    <button v-if="account.id" type="button" class="btn btn-outline-peach my-3 hvr-pulse rounded" data-bs-toggle="modal"
      data-bs-target="#createEventModal"><span class="mdi mdi-plus-box"></span>Event</button>
  </nav>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>


<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}

navbar {
  justify-content: space-around;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    width: 64px;
  }
}
</style>