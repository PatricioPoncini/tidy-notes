import express, {type Express } from "express";
import taskRoutes from "./routes/tasks.ts";
import morgan from "morgan";
import cors from "cors";

export class HttpServer {
    private static instance?: HttpServer;
    private server?: HttpServer;
    private readonly app: Express;

    private constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware() {
        //this.app.use(bodyParser.json());
        //this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(cors());
    }

    private configureRoutes() {
        this.app.get("/", (req, res) => {
            res.send("🚀 Server is running!");
        });

        this.app.use("/tasks", taskRoutes);
    }

    public static start(port: number) {
        if (this.instance) {
            throw new Error(`Server is already running!`);
        }
        this.instance = new HttpServer();
        this.instance.app.listen(port, () => {
            console.log(`✅ Server running on http://localhost:${port}`);
        });
    }

    private stop = () => {
        void this.server?.stop();
    };

    public static stop() {
        this.instance?.stop();
        this.instance = undefined;
    }
}