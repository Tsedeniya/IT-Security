const mongoose = require('mongoose');
const logger = require('./../config/logger');

const migration = require('../lib/migirations.lib');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;
const env = process.env.NODE_ENV;
let url = process.env.MONGO_URI;
if (env === 'test') {
  url += '_test';
}

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
mongoose.plugin(require('mongoose-hidden')({
  defaultHidden: {'_id': false, password: true, pin: true, '__v': true}
}));
 exports.connect = () => {
  return mongoose
      .connect(url)
      .then(async () => {
        console.log('mongoDB connected...')
        await migration.migratePermissions()
        await migration.migrateRoles()
        await migration.migrateUsers()
      }).catch(err => console.error('Database connection failed', err));
};