import * as mongoose from 'mongoose';

export const ChannelConfigSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    mobileUrl: {
      type: String,
      required: true,
    },
    pcUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
