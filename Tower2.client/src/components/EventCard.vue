<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: eventProp.id } }">
    <div class="image hvr-grow">
      <img :src="eventProp.coverImg" :alt="eventProp.name" class="img-fluid rounded" />
      <div class="glass rounded-bottom">
        <p>{{ eventProp.name }}</p>
        <p>{{ eventProp.location }}</p>
        <p>{{ eventProp.startDate }}</p>
        <div v-if="eventProp.isCanceled" class="text-center text-white bg-secondary py-3 rounded">Event Canceled
        </div>
        <div v-if="eventProp.capacity - eventProp.ticketCount < 1 && !eventProp.isCanceled"
          class="text-center text-white bg-secondary py-3 rounded">Event
          Full</div>
        <div v-else-if="eventProp.capacity - eventProp.ticketCount > 0 && !eventProp.isCanceled" class="text-end mb-0">
          <span>{{ eventProp.capacity - eventProp.ticketCount }}</span> spots left
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent.js";
export default {
  props: {
    eventProp: { type: TowerEvent, required: true }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
img {
  height: 40vh;
  width: 100%;
}

.image {
  position: relative;
  width: 100%;
}

.glass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  color: #FDF9EC;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 500;
  line-height: 0.2em;
  background: rgb(255, 180, 162);
  background: rgba(255, 180, 162, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  text-shadow: 1px 2px 2px rgb(0, 0, 0);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border: 2px solid rgba(255, 180, 162, 0.5);
}
</style>