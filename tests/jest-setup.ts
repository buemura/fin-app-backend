import "dotenv/config";
import { logger } from "../src/utils/logger";

logger.info = jest.fn();
logger.error = jest.fn();
