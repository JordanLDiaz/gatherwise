import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TowerEventsService {
  async getAllEvents(query) {
    const events = await dbContext.TowerEvents.find(query).populate('creator ticketCount', 'name picture')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount', 'name picture')
    if (!event) throw new BadRequest('No event at id: ${eventId}')
    return event
  }

  async createEvent(eventData) {
    const newEvent = await dbContext.TowerEvents.create(eventData)
    await newEvent.populate('creator ticketCount', 'name picture')
    return newEvent
  }

  async editEvent(eventId, userId, eventData) {
    const originalEvent = await this.getEventById(eventId)

    // @ts-ignore
    if (originalEvent.creatorId != userId) throw new Forbidden('Cannot edit event that you did not create.')

    if (originalEvent.isCanceled) throw new BadRequest('Cannot edit an event that has been canceled.')

    originalEvent.name = eventData.name || originalEvent.name
    originalEvent.description = eventData.description || originalEvent.description
    originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
    originalEvent.location = eventData.location || originalEvent.location
    originalEvent.capacity = eventData.capacity || originalEvent.capacity
    originalEvent.startDate = eventData.startDate || originalEvent.startDate
    originalEvent.type = eventData.type || originalEvent.type

    await originalEvent.save()
    return originalEvent
  }

  async archiveEvent(eventId, userId) {
    const eventToArchive = await this.getEventById(eventId)

    if (eventToArchive.creatorId != userId) throw new Forbidden('You do not have permission to delete this event.')

    eventToArchive.isCanceled = !eventToArchive.isCanceled
    await eventToArchive.save()
    return eventToArchive
  }

}

export const towerEventsService = new TowerEventsService();