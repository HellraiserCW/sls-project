import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/types";

export const logger = new Logger({
serviceName: process.env.SERVICE_NAME,
logLevel: process.env.POWERTOOLS_LOG_LEVEL as LogLevel,
});
