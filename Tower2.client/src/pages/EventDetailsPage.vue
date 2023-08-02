<template>
  <!-- STUB Active Event Card -->
  <div v-if="activeEvent" class="container">
    <section class="row justify-content-center my-3">
      <div class="col-11">
        <div class="position-relative">
          <img :src="activeEvent.coverImg" :alt="activeEvent.name" class="img-fluid blur-img">
          <div class="glass">
            <div class="row">
              <!-- STUB focused img -->
              <div class="col-5 d-flex">
                <div class="align-item-center">
                  <img :src="activeEvent.coverImg" class="img-fluid main-img">
                </div>
              </div>

              <!-- STUB rest of description -->
              <div class="col-7">
                <h1 class="px-3 text-end">...</h1>
                <div class="d-flex justify-content-between">
                  <h3>{{ activeEvent.name }}</h3>
                  <p>{{ activeEvent.startDate }}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>{{ activeEvent.location }}</p>
                  <p>Starting at 9:00 am</p>
                </div>
                <p>{{ activeEvent.description }}</p>
              </div>
            </div>

            <div class="row justify-content-evenly pt-3">
              <div v-if="activeEvent.ticketCount == activeEvent.capacity && !activeEvent.isCanceled"
                class="col-3 bg-primary d-flex align-items-center justify-content-center">
                <p class="mb-0">Event Full!</p>
              </div>

              <div v-else-if="activeEvent.isCanceled"
                class="col-3 bg-primary d-flex align-items-center justify-content-center">
                <p class="mb-0">Event Canceled!</p>
              </div>

              <div v-else class="col-3 bg-primary d-flex align-items-center justify-content-center">
                <p class="mb-0">
                  <b> {{ activeEvent.capacity - activeEvent.ticketCount }} </b> spots remaining!
                </p>
              </div>

              <div v-if="!isAttending && !activeEvent.isCanceled && activeEvent.ticketCount != activeEvent.capacity"
                class="col-4 text-center">
                <button @click="buyTicket()" type="button" class="btn btn-outline hvr-pulse">Buy Ticket</button>
              </div>

              <div v-if="isAttending && !activeEvent.isCanceled" class="col-4 text-center">
                <button @click="sellTicket()" type="button" class="btn btn-outline">Sell Ticket</button>
              </div>

              <div class="col-4 text-center">
                <button @click="cancelEvent()"
                  v-if="account.id && account.id == activeEvent?.creatorId && !activeEvent.isCanceled"
                  class="btn btn-outline">
                  <span class="mdi mdi-close-outline"> Cancel Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STUB Attendees-->
    <section class="row mt-3 mx-3">
      <div class="p-2 attendees rounded">
        <p>See who's attending</p>
        <img v-for="a in attendees" :src="a.profile.picture" :title="a.profile.name" class="img-fluid rounded-circle"
          style="height: 50px; width: 50px;" />
      </div>
    </section>

    <!-- STUB Comments -->
    <section class="row px-5 py-3">
      <div class="comments p-5">
        <div class="d-flex justify-content-between">
          <h5>What are people saying?</h5>
          <p>Join the conversation!</p>
        </div>
        <form @submit.prevent="postComment()">
          <div class="form-floating mb-3">
            <textarea v-model="editable.body" type="text" class="form-control" id="floatingInput"
              aria-describedby="Leave a comment" rows="4" required></textarea>
            <label for="floatingInput">Leave a comment...</label>
          </div>
          <div class="text-end mb-2">
            <button type="submit" class="btn btn-outline mx-1"><span class="mdi mdi-plus-box"></span>Comment</button>
          </div>
        </form>

        <div v-for="c in comments" class="a-comment mx-5 my-3 px-4 d-flex justify-content-between rounded d-flex">
          <div class="col-1 d-flex justify-content-center align-items-center">
            <img :src="c.creator.picture" :title="c.creator.name" class="img-fluid rounded-circle"
              style="height: 60px; width: 60px;" />
          </div>
          <div class="col-11 mt-2 px-2">
            <!-- TODO add in isAttending boolean to show icon for commenters who are also attendees -->
            <h5>{{ c.creator.name }}</h5>
            <p class="text-white">{{ c.body }}</p>
            <div @click="removeComment(c.id)" class="text-end">
              <button v-show="c.creatorId == account.id" class="btn btn-outline-purple"><span class="mdi mdi-trash-can"
                  title="Remove comment"></span></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"

export default {
  setup() {
    const route = useRoute();
    const editable = ref({});

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await towerEventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getTicketsByEvent() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsByEvent(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getCommentsByEvent() {
      try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByEvent(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById(),
        getTicketsByEvent(),
        getCommentsByEvent()
    })

    return {
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      isAttending: computed(() => {
        return AppState.attendees.find(a => a.accountId == AppState.account.id)
      }),

      async postComment() {
        try {
          // NOTE alias out editable.value, this is our placeholder object we're creating from form input
          const commentData = editable.value
          logger.log(commentData)
          // NOTE cast eventId from current event page to our commentData object so it has necessary properties for server to make a comment
          commentData.eventId = route.params.eventId
          await commentsService.postComment(commentData)
          editable.value = {}
          Pop.toast('You posted a new comment!', "success", "center")
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async removeComment(commentId) {
        try {
          if (await Pop.confirm('Are you sure you want to remove this comment?', 'This cannot be undone!'))
            await commentsService.removeComment(commentId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async buyTicket() {
        try {
          // logger.log('buy ticket')
          const activeEventId = route.params.eventId
          const ticketData = { eventId: activeEventId }
          await ticketsService.buyTicket(ticketData)
          AppState.activeEvent.ticketCount++
          Pop.toast('Ticket received!', 'success', 'center')
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async sellTicket() {
        try {
          // logger.log('selling ticket')
          const ticketToSell = AppState.attendees.find(a => a.accountId == AppState.account.id)
          const ticketId = ticketToSell.id
          await ticketsService.sellTicket(ticketId)
          AppState.activeEvent.ticketCount--
          Pop.toast('Ticket sold!', 'success', 'center')
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async cancelEvent() {
        try {
          const wantsToCancel = await Pop.confirm()
          if (!wantsToCancel) {
            return
          }
          const eventId = route.params.eventId
          await towerEventsService.cancelEvent(eventId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.blur-img {
  height: 65vh;
  width: 100%;
}

.main-img {
  height: 50vh;
  width: 100%;
  border: 4px solid #B5838D;
}

.glass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 12px;
  color: #FDF9EC;
  font-weight: 300;
  background: rgb(255, 180, 162);
  background: rgba(255, 180, 162, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(5.5px);
  border: 2px solid rgba(255, 180, 162, 0.5);
}

.attendees {
  background-color: #E5989B;
  border: 3px solid #FFB4A2;
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  color: #FDF9EC;
}

.comments {
  background-color: #FFCDB2;
  border: 5px solid #B5838D;
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  color: #FDF9EC;
}

.a-comment {
  background-color: #B5838D;
  border: 3px solid #6D6875;
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  color: #FDF9EC;
}
</style>