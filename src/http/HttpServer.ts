import express, {type Express } from "express";

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
    }

    private configureRoutes() {
        this.app.get("/", (req, res) => {
            res.send("🚀 Server is running!");
        });

        this.app.use("/tasks", this.taskRoutes());
    }

    private taskRoutes() {
        const router = express.Router();

        router.get("/", (req, res) => {
            res.send("📋 List of tasks");
        });

        router.post("/", (req, res) => {
            const { title, description } = req.body;
            res.status(201).send({ message: "Task created", title, description });
        });

        return router;
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