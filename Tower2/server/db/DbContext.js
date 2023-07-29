import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from "../models/TowerEvent.js";
import { TicketSchema } from "../models/Ticket.js";
import { CommentSchema } from "../models/Comment.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  // Bananas PLURAL             /file name   /schema being referenced       
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);

  Tickets = mongoose.model('Ticket', TicketSchema);

  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
