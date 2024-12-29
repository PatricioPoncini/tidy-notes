import mongoose, { type ConnectOptions } from 'mongoose';

import { TaskModel } from './models';

export class Mongoose {
  private static instance?: Mongoose;
  private static readonly dbName: string = 'tidy-notes';

  public static start = async () => {
    if (this.instance) {
      console.log('\x1b[33m⚠ Mongo instance already started\x1b[0m');
      return this.instance;
    }
    this.instance = new Mongoose();
    await this.instance.connectToMongoDb();
    await this.instance.syncMongoModels();
  };

  private syncMongoModels = async () => {
    const models = [TaskModel];
    if (models.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', '⚠ No models to sync');
      return;
    }

    for (const model of models) {
      await model.syncIndexes();
    }
  };

  private connectToMongoDb = async (retries = 5, delay = 3000) => {
    const options: ConnectOptions = {
      dbName: Mongoose.dbName,
    };
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI doesn't exist");
    }

    for (let i = 0; i < retries; i++) {
      try {
        await mongoose.connect(MONGO_URI, options);
        console.log('\x1b[32m%s\x1b[0m', '✅ Mongo connected');
        return;
      } catch (e) {
        console.error(e);
        console.log(
          '\x1b[33m%s\x1b[0m',
          `Attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`
        );
        await new Promise(res => setTimeout(res, delay));
      }
    }

    throw new Error('Failed to connect to MongoDB after multiple attempts');
  };

  private stop = async () => {
    await mongoose.disconnect();
  };

  public static stop = async () => {
    await this.instance?.stop();
    this.instance = undefined;
  };
}
