import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {

  async getCommentsByEvent(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    // logger.log('[GETTING COMMENTS]', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async postComment(commentData) {
    const res = await api.post('api/comments', commentData)
    // logger.log('[POSTING COMMENT]', res.data)
    const newComment = new Comment(res.data)
    AppState.comments.unshift(newComment)
    logger.log('[COMMENTS IN APPSTATE]', AppState.comments)
  }

  async removeComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    logger.log('[REMOVING COMMENT]', res.data)
    const index = AppState.comments.findIndex(c => c.id == commentId)
    if (index < 0) {
      return
    } else {
      AppState.comments.splice(index, 1)
    }
  }
}

export const commentsService = new CommentsService();