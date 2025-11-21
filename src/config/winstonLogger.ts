import winston from "winston";
import path from "path";

const logDir = path.resolve("logs"); // pasta fora do src

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: `${logDir}/error.log`, level: "error" }),
    new winston.transports.File({ filename: `${logDir}/app.log` })
  ]
});

export default logger;
