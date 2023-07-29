import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.buyTicket)
      .delete('/:ticketId', this.sellTicket)
  }
  async buyTicket(req, res, next) {
    try {
      const ticketData = req.body
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.buyTicket(ticketData)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async sellTicket(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const ticketId = req.params.ticketId
      const message = await ticketsService.returnTicket(accountId, ticketId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}