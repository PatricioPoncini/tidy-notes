import { Mongoose } from "./db";
import { HttpServer } from "./http";
import dotenv from "dotenv";

const startApp = async () => {
    dotenv.config();
    try {
        console.log("🚀 Starting application...");

        console.log("⏳ Connecting to MongoDB...");
        await Mongoose.start();
        console.log("✅ Mongoose connected successfully!");

        console.log("⏳ Starting HTTP server...");
        HttpServer.start(4000);
        console.log("✅ HTTP server is running on port 3000!");
        console.log("📝 Application is ready to accept requests.");
    } catch (error) {
        console.error("❌ Failed to start application:", error);
        process.exit(1);
    }

    process.on("SIGINT", async () => {
        console.log("🔄 Gracefully shutting down...");
        try {
            console.log("⏳ Disconnecting MongoDB...");
            await Mongoose.stop();
            console.log("✅ MongoDB disconnected successfully.");

            console.log("⏳ Stopping HTTP server...");
            HttpServer.stop();
            console.log("✅ HTTP server stopped gracefully.");
        } catch (shutdownError) {
            console.error("❌ Error during shutdown:", shutdownError);
        } finally {
            process.exit(0);
        }
    });
};

await startApp();
