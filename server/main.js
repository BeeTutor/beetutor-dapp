import { configMap } from "./config.js";
import { errorHandler } from "./errorMiddleware.js";
import express from "express";
import commentRoutes from "./routes/comments.route.js";
import tokenRoutes from "./routes/token.route.js";
import bodyParser from "body-parser";
import cors from "cors";

async function main() {
  const app = express();

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: "*", // TODO: remove
    })
  );
  app
    .use((req, res, next) => {
      res.set("X-Content-Type-Options", "nosniff");
      next();
    })
    .use(
      bodyParser.urlencoded({
        extended: true,
      })
    )
    .use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Vary", "Origin");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-XSS-Protection", "1");
    next();
  });

  app.use(errorHandler());

  app.use("/api/comment", commentRoutes);
  app.use("/api/token", tokenRoutes);

  app.listen(configMap.server.port, () => {
    console.info(`=== Server running on port ${configMap.server.port} ===`);
  });
  return app;
}

await main();

const gracefulShutdown = async (signal) => {
  console.info(`=== Received ${signal}. Starting graceful shutdown... ===`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
