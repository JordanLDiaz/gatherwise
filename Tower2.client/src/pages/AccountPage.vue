<template>
  <div class="container">
    <section class="row my-2">
      <h3>My Events</h3>
      <div v-for="e in myEvents" :key="e.id" class="col-12 col-md-3 col-sm-4 my-2">
        <EventCard :eventProp="e" />
      </div>
    </section>

    <div v-if="myTickets" class="row my-2 px-5 justify-content-center">
      <h3>My Tickets</h3>
      <div class="col-9" v-for="m in myTickets" :key="m.id">
        <div class="row">
          <div class="bg-success d-flex flex-row rounded-start justify-content-between ms-0 ps-0 my-1 position-relative"
            style="height: 25vh;">
            <div class="col-4">
              <img :src="m.event?.coverImg" class="img-fluid rounded-start" />
            </div>
            <div class="col-8 d-flex flex-column justify-content-between m-3">
              <div class="text-center">
                <div class="hole"></div>
                <h3 class="mb-0">{{ m.event?.name }}</h3>
                <h5 class="mb-0">{{ m.event?.location }}</h5>
                <h5 class="mb-4">{{ new Date(m.event?.startDate).toDateString() }}</h5>
                <p class="mb-0">Ticket for: {{ account.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import EventCard from "../components/EventCard.vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {

    async function getAllEvents() {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getMyTickets() {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAllEvents(),
        getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.towerEvents.filter(t => t.creatorId == AppState.account.id)),
      myTickets: computed(() => AppState.myTickets)
    };

  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}

.hole {
  position: absolute;
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  background-color: #FDF9EC;
  right: -70px;
}
</style>
