require('dotenv/config');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.pluralize(null);

const app = express();
const port = Number(process.env.PORT) || 4000;
const api = process.env.API_URL || '/api/v1';

app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(`${api}/location`, require('./routes/location'));
app.use(`${api}/user`, require('./routes/user'));
app.use(`${api}/admin`, require('./routes/admin'));
app.use(`${api}/driver`, require('./routes/driver'));
app.use(`${api}/bin`, require('./routes/bin'));
app.use(`${api}/complaint`, require('./routes/complaint'));
app.use(`${api}/work`, require('./routes/work'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: 'An unexpected server error occurred.' });
});

async function start() {
  if (!process.env.CONNECTION_STRING) throw new Error('CONNECTION_STRING is required.');
  if (!process.env.secret) throw new Error('secret is required.');

  await mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME || 'smart-waste-management',
  });
  console.log('Database connection is ready.');
  app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start the API:', error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
