import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.archiveEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      // NOTE sets up get all to support queries
      const query = req.query
      const events = await towerEventsService.getAllEvents(query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await towerEventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventTickets = await ticketsService.getEventTickets(eventId)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getEventComments(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      const eventData = req.body
      // NOTE set creatorId to userInfo id here
      // req.body.creatorId = req.userInfo.id
      eventData.creatorId = req.userInfo.id
      const newEvent = await towerEventsService.createEvent(eventData)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      // NOTE grab user Id so we can validate if user is allowed to edit the event specified in params
      const userId = req.userInfo.id
      const eventData = req.body
      const updatedEvent = await towerEventsService.editEvent(eventId, userId, eventData)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }

  async archiveEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const eventToArchive = await towerEventsService.archiveEvent(eventId, userId)
      return res.send(eventToArchive)
    } catch (error) {
      next(error)
    }
  }
}