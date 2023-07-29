<template>
  <form @submit.prevent="createEvent()">
    <div class="form-floating mb-2">
      <input v-model="editable.name" type="text" class="form-control" id="floatingInput" aria-describedby="name"
        maxLength="30" required>
      <label for="floatingInput">Event Name</label>
    </div>
    <div class="form-floating mb-2">
      <textarea v-model="editable.description" type="text" class="form-control" id="floatingInput"
        aria-describedby="description" required></textarea>
      <label for="floatingInput">Event Description</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editable.coverImg" type="url" class="form-control" id="floatingInput" aria-describedby="coverImg"
        required>
      <label for="floatingInput">Event Cover Image</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editable.location" type="text" class="form-control" id="floatingInput" aria-describedby="location"
        required>
      <label for="floatingInput">Event Location</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editable.capacity" type="number" class="form-control" id="floatingInput" aria-describedby="capacity"
        required>
      <label for="floatingInput">Event Capacity</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editable.startDate" type="date" class="form-control" id="floatingInput" aria-describedby="startDate"
        required>
      <label for="floatingInput">Event Date</label>
    </div>
    <select v-model="editable.type" class="form-select mb-2" aria-label="Default select type" required>
      <option default selected>Select an event type</option>
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <div class="text-end">
      <button type="button" class="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-outline mx-1">Submit</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      types: ['arts & theater', 'concert', 'convention', 'digital', 'family', 'sport'],

      async createEvent() {
        try {
          const eventData = editable.value
          logger.log(eventData)
          const newEvent = await towerEventsService.createEvent(eventData)
          editable.value = {}
          Modal.getOrCreateInstance("#createEventModal").hide()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>