import mongoose, {type ConnectOptions} from "mongoose";
import {TaskModel} from "./models/Task.ts";

export class Mongoose {
    private static instance?: Mongoose;
    private static readonly dbName: string = 'tidy-notes';

    public static start = async () => {
        if (this.instance) {
            throw new Error('Mongo instance already started');
        }
        this.instance = new Mongoose();
        await this.instance.connectToMongoDb();
        await this.instance.syncMongoModels();
    }

    private syncMongoModels = async () => {
        const models = [TaskModel];
        for (const model of models) {
            await model.syncIndexes();
        }
    };

    private connectToMongoDb = async () => {
        const options: ConnectOptions = {
            dbName: 'tidy-notes',
        };
        const MONGO_URI = process.env.MONGO_URI; // TODO: Get or fail

        await new Promise<void>((resolve, reject) => {
            mongoose
                .connect(MONGO_URI!, options) // TODO: Remove !
                .then(() => resolve())
                .catch((e: unknown) => {
                    console.log(
                        '\x1b[31m%s\x1b[0m',
                        `❌ Mongoose initial connection failed`,
                    );
                    reject(e as Error);
                });
        });
    };

    private stop = async () => {
        await mongoose.disconnect();
    };

    public static stop = async () => {
        await this.instance?.stop();
        this.instance = undefined;
    };
}