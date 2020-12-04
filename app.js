const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/products', require('./routes/products.routes'));

const PORT = process.env.PORT || config.get('port') || 5000;

async function start() {
  try {
    // TODO: setup mongoose

    // console.log(2, config.get('mongoUri'))
    await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

start();
