import express from 'express';

import { createApp } from './app';
import { SERVER_PORT, ENV } from './config/environment';
import { Logger } from '../src/utils/logger';

(async () => {
	const app = express();
	const logger = new Logger(ENV);

	await createApp(app);

	const server = app.listen(SERVER_PORT);

	logger.info(`Server is start listening at port: ${SERVER_PORT}`, {});

	return server;
})();
