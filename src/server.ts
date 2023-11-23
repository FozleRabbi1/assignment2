// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
// Dc6Wrj9wWQfDR7Y6
// assignment-2
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
