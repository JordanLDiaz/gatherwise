import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { towerEventsService } from "./TowerEventsService.js";

class TicketsService {
  async getMyTickets(accountId) {
    const myTickets = await dbContext.Tickets.find({ accountId })
      // NOTE nested populate so we can call to initial event virtual
      // NOTE then target specific event, populate virtuals on to original event virtual
      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        }
      })
    return myTickets
  }

  // async getMyTickets(accountId) {
  //   const myTickets = await dbContext.Tickets.find({ accountId }).populate('event')
  //   return myTickets
  // }

  async getEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return eventTickets
  }

  async buyTicket(ticketData) {
    // NOTE first grab event by its id
    const event = await towerEventsService.getEventById(ticketData.eventId)
    if (event.isCanceled) throw new BadRequest(`${event.name} has been canceled, you can no longer purchase a ticket.`)
    if (event.capacity == 0) throw new BadRequest(`There are no more seats available for ${event.name}.`)

    const newTicket = await dbContext.Tickets.create(ticketData)

    await newTicket.populate('profile event')
    return newTicket
  }

  async returnTicket(accountId, ticketId) {
    const ticketToBeReturned = await dbContext.Tickets.findById(ticketId).populate('event profile')

    if (!ticketToBeReturned) throw new BadRequest('Cannot find ticket.')
    if (ticketToBeReturned.accountId != accountId) throw new Forbidden('You do not have permission to sell tickets that you do not own.')

    await ticketToBeReturned.remove()
    return 'Ticket was returned.'
  }
}

export const ticketsService = new TicketsService();