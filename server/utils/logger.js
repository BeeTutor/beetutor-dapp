import * as util from "util";
import { transports, format, createLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Utility format for handling JSON and errors
const prettyJson = format((info) => {
  if (typeof info.message === "object") {
    info.message = util.inspect(info.message);
  }
  return info;
});

const errorHandle = format((info) => {
  if (info instanceof Error) {
    return { ...info, isError: true, errorMessage: info.stack || info.message };
  }
  return info;
});

// Utility for creating transports to reduce duplication
const createTransports = (logDir, filename) => [
  new DailyRotateFile({
    maxFiles: process.env.LOGGER_MAX_COUNT || 1000,
    maxSize: process.env.LOGGER_MAX_SIZE || 1024000,
    zippedArchive: true,
    utc: true,
    dirname: logDir,
    filename,
    extension: ".log",
    datePattern: "YYYYMMDD",
  }),
  new transports.Console(),
];

// Logger configuration
const logger = createLogger({
  level: process.env.LOGGER_LEVEL || "info",
  silent: false,
  format: format.combine(
    errorHandle(),
    prettyJson(),
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DDTHH:mm:ssZ" }),
    format.printf((info) => {
      const memo = info.memo ? ` : ${JSON.stringify(info.memo)}` : "";
      const baseLog = `${info.timestamp} - ${info.level}:`;
      return info.isError
        ? `${baseLog} ${info.errorMessage} ${memo}`
        : `${baseLog} ${info.message}${memo}`;
    })
  ),
  transports: createTransports("logs", "combined"),
});

// Middleware for request logging
const loggerMiddleware = () => (request, response, next) => {
  const start = new Date().getTime();
  const remoteAddr = request.ips.length > 0 ? request.ips[0] : request.ip;
  const contentLength = request.headers["content-length"] || 0;
  const httpReferer = request.headers.referer || "";
  const userAgent = request.headers["user-agent"] || "";

  response.on("finish", () => {
    const ms = new Date().getTime() - start;
    const logLevel =
      response.statusCode >= 500
        ? "error"
        : response.statusCode >= 400
        ? "warn"
        : "info";
    const logMessage = `${remoteAddr} - "${request.method} ${request.originalUrl} ${request.httpVersion}" ${response.statusCode} ${contentLength} "-"${httpReferer}" "${userAgent}" ${ms}ms`;

    logger.log(logLevel, logMessage);
  });

  next();
};

// Reconfigure the logger for request middleware
logger.configure({
  level: process.env.LOGGER_LEVEL || "info",
  transports: createTransports("logs/request", "request"),
});

export { logger, loggerMiddleware };
