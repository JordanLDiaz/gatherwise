import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from "../models/Ticket.js"
import { logger } from '../utils/Logger'
import Pop from "../utils/Pop.js"
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets() {
    try {
      const res = await api.get('/account/tickets')
      logger.log('[MY TICKETS]', res.data)
      AppState.myTickets = res.data.map(t => new Ticket(t))
      // AppState.myTickets = res.data
    } catch (error) {
      logger.error(error)
      Pop.error(error.message)
    }
  }
}

export const accountService = new AccountService()
