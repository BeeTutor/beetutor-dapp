export const loggerMiddleware = () => (request, response, next) => {
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
