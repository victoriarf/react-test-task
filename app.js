const express = require('express');
const config = require('config');

const app = express();

app.use('/api/products', require('./routes/products.routes'));

const PORT = process.env.PORT || config.get('port') || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

start();
