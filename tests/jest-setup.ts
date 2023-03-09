import "dotenv/config";
import { logger } from "../src/helpers/logger";

logger.info = jest.fn();
logger.error = jest.fn();
