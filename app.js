import express from "express";
import { exceptionHandler } from "./app/middleware/exceptions.js";
import { logger } from "./app/middleware/logger.js";
import { config } from "./config.js";
import routers from "./routes/routers.js";

const server = express();

server.use(express.json());
server.use(logger);
server.use(express.static(config.public.path));
server.use(routers);
server.use(exceptionHandler);

server.listen(config.api.port, () =>
	console.log(`Listening on: http://localhost:${config.api.port}`)
);
