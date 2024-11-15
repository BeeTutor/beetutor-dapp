import { errorHandler } from "./errorMiddleware.js";
import { loggerMiddleware } from "./utils/logger.js";
import express from "express";
import cors from "cors";
import cacheControl from "express-cache-controller";
import bodyParser from "body-parser";
import commentRoutes from "./routes/comments.route.js";

const app = express();

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});

app
  .use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (!config.server.whitelist?.length) return callback(null, true);
        if (config.server.whitelist.includes(origin)) {
          callback(null, true);
        } else {
          console.log(">>> Not allow origin:", origin);
          callback(new Error("Not allow cors origin!!!"));
        }
      },
    })
  )
  .use(
    cacheControl({
      noCache: true,
      noStore: true,
      mustRevalidate: true,
    })
  )
  .use(loggerMiddleware())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(bodyParser())
  .use((req, res, next) => {
    res.header("Vary", "Origin");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-XSS-Protection", "1");
    next();
  });

app.use(errorHandler());

app.use("/api/comment", commentRoutes);

export default app;
