const express = require('express');
const mongoose = require('mongoose');
const companyRouter = require('./router/companyRouter');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('./db/connection');

const app = express();

app.use((req, res, next) => {
  req.setTimeout(15 * 60 * 1000);
  next();
});

app.use(cors());
app.use(express.json());
app.use('/api/companies', companyRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
