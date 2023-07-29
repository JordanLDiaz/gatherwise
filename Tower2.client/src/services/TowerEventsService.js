import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TowerEventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    // logger.log('[GETTING ALL EVENTS]', res.data)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
    logger.log('[EVENTS IN APPSTATE]', AppState.towerEvents)
  }

  async createEvent(eventData) {
    // logger.log(eventData)
    const res = await api.post('api/events', eventData)
    logger.log('[CREATING EVENT]', res.data)
    const newEvent = new TowerEvent(res.data)
    AppState.towerEvents.unshift(newEvent)
  }

  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    // logger.log('[GETTING ACTIVE EVENT]', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
    logger.log('[ACTIVE EVENT IN APPSTATE]', AppState.activeEvent)
  }

  async cancelEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    AppState.activeEvent.isCanceled = true
    logger.log('[EVENT CANCELED]', AppState.activeEvent.isCanceled)
  }
}

export const towerEventsService = new TowerEventsService();