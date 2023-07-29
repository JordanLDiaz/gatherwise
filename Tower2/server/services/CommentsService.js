import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async createComment(commentData) {
    const newComment = await dbContext.Comments.create(commentData)
    await newComment.populate('creator')
    return newComment
  }

  async removeComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.creatorId != userId) throw new Forbidden('You do not have permission to delete a comment you did not make.')
    comment.remove()
    return 'Comment was removed.'
  }
}

export const commentsService = new CommentsService();