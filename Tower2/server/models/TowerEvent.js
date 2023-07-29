import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true, maxLength: 300 },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital', 'arts & theater', 'family'] },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true,
})