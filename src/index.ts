import dotenv from 'dotenv';

import { Mongoose } from './db';
import { HttpServer } from './http';

const startApp = async () => {
  dotenv.config();
  try {
    console.log('\x1b[32m🚀 Starting application...\x1b[0m');

    await Mongoose.start();
    HttpServer.start(4000);
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }

  process.on('SIGINT', async () => {
    console.log('\x1b[38;5;214m🔄 Gracefully shutting down...\x1b[0m');
    try {
      await Mongoose.stop();
      console.log('\x1b[38;5;214m✅ MongoDB disconnected successfully.\x1b[0m');

      HttpServer.stop();
      console.log('\x1b[38;5;214m✅ HTTP server stopped gracefully.\x1b[0m');
    } catch (shutdownError) {
      console.error('❌ Error during shutdown:', shutdownError);
    } finally {
      process.exit(0);
    }
  });
};

await startApp();
