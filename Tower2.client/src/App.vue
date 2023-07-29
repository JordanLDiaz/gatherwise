<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-11 col-md-11 p-0">
        <Navbar />
        <router-view />
      </div>
      <div class="col-1 side-bar">
        <button v-if="account.id" type="button" class="btn btn-outline-peach my-3 hvr-pulse rounded"
          data-bs-toggle="modal" data-bs-target="#createEventModal"><span class="mdi mdi-plus-box"></span>Event</button>
      </div>
    </div>
  </main>

  <footer class="bg-primary text-light text-center">
    <small>By continuing past this page, you agree to our <b>Terms of Use</b>. </small>
    <small><b> Privacy Policy</b> | ©️ g a t h e r w i s e 2023. All rights reserved. </small>
  </footer>

  <ModalComponent id="createEventModal">
    <template #header>
      Create Event
    </template>
    <template #body>
      <CreateEventForm />
    </template>
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


export default {
  setup() {

    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.side-bar {
  background-image: linear-gradient(180deg, #6D6875 30%, rgba(181, 131, 141, 0.3) 100%);
  min-height: 110vh;
}

body {
  font-family: 'Josefin Sans', sans-serif;
}

img {
  object-fit: cover;
  object-position: center;
}

footer {
  display: grid;
  place-content: center;
  background-image: linear-gradient(90deg, #6D6875 10%, rgba(181, 131, 141, 0.3) 100%);
  height: 20vh;
}
</style>
