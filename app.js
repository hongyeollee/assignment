const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { globalErrorHandler } = require('./middleware/error');
const routes = require('./routes');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(routes);

  app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
