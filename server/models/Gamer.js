const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let GamerModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();
const setGame = (platform) => _.escape(platform).trim();
const setStatus = (status) => _.escape(status).trim();

const GamerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },

  platform: {
    type: String,
    required: true,
    trim: true,
    set: setGame,
  },

  status: {
    type: String,
    required: true,
    trim: true,
    set: setStatus,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

GamerSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  platform: doc.platform,
  status: doc.status,
});

GamerSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return GamerModel.find(search).select('title platform status').exec(callback);
};

GamerModel = mongoose.model('Gamer', GamerSchema);

module.exports.GamerModel = GamerModel;
module.exports.GamerSchema = GamerSchema;
