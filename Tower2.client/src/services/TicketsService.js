import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketsService {
  async getTicketsByEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    // logger.log('[GETTING ATTENDEES]', res.data)
    AppState.attendees = res.data.map(t => new Ticket(t))
    logger.log('[ATTENDEES IN APPSTATE]', AppState.attendees)
  }

  async buyTicket(ticketData) {
    // logger.log('buying tickets')
    const res = await api.post('api/tickets', ticketData)
    logger.log('[BUYING TICKET]', res.data)
    const newTicket = new Ticket(res.data)
    AppState.attendees.push(newTicket)
    logger.log('[Tickets in appstate]', AppState.attendees)
  }

  async sellTicket(ticketId) {
    // logger.log('selling ticket')
    const res = await api.delete('api/tickets/' + ticketId)
    logger.log('[SELLING TICKET]', res.data)
    AppState.attendees = AppState.attendees.filter(a => a.id != ticketId)
    logger.log('[ATTENDEES IN APPSTATE]', AppState.attendees)
  }
}

export const ticketsService = new TicketsService();