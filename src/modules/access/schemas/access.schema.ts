import * as mongoose from 'mongoose';

export const AccessSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    index: true,
  },
  isMobile: {
    type: Boolean,
    required: true,
  },
  ip: {
    type: String,
  },
  address: {
    type: String,
    index: true,
  },
  referer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
