import { UserController } from './controller/user';
import 'reflect-metadata';

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { UserRepository } from './repository/user';
import { UserService } from './service/user';
import { requestLogger } from './middleware/logger';
import { AppDataSource } from './config/orm/typorm';
import { Logger } from './utils/logger';
import { ENV } from './config/environment';

const logger = new Logger(ENV);

const setupRoutes = async (app: any) => {
	// init DataSource
	const appDatasource = await new AppDataSource(logger).initDatasource();
	const userRepository = new UserRepository(appDatasource, logger);

	const userService = new UserService(userRepository);

	const userController = new UserController(userService);

	app.use(express.static('public'));
	app.use(requestLogger);

	app.use('/api/user', userController);

	app.use('*', (_: Request, res: Response) => {
		res.status(401).send('Unauthorized');
	});
};

export const createApp = async (app: any) => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	return await setupRoutes(app);
};
