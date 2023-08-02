<template>
  <div class="container mb-0">
    <section class="row justify-content-center">
      <div class="col-12 text-center m-3 elevation-3 hero rounded"></div>
    </section>
  </div>

  <div class="container">
    <section class="row justify-content-center">
      <button @click="filterBy = ''" class="btn btn-outline m-1 hvr-shrink">All</button>
      <button @click="filterBy = 'arts & theater'" class="btn btn-outline m-1 hvr-shrink">Arts & Theater</button>
      <button @click="filterBy = 'concert'" class="btn btn-outline m-1 hvr-shrink">Concerts</button>
      <button @click="filterBy = 'convention'" class="btn btn-outline m-1 hvr-shrink">Conventions</button>
      <button @click="filterBy = 'digital'" class="btn btn-outline m-1 hvr-shrink">Digital</button>
      <button @click="filterBy = 'family'" class="btn btn-outline m-1 hvr-shrink">Family</button>
      <button @click="filterBy = 'sport'" class="btn btn-outline m-1 hvr-shrink">Sports</button>
    </section>

    <section class="row my-2">
      <div v-for="e in events" :key="e.id" class="col-12 col-md-4 col-sm-6 my-2">
        <EventCard :eventProp="e" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from '../services/TowerEventsService.js'
import { AppState } from "../AppState.js";

export default {
  setup() {
    const filterBy = ref('')

    async function getAllEvents() {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAllEvents()
    })

    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == '') {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(t => t.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.hero {
  // NOTE placing background img here instead of in img tag in template, img tag in template creates an object and then properties for background-img won't work. 
  background-image: url('../assets/img/banner.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: none;
  height: 50vh;
  width: 95%;
}

button {
  width: 20vw;
}
</style>
