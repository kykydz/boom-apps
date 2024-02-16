import { NextFunction, Request, Response } from 'express';

import { ENV } from '../config/environment';
import { Logger } from '../utils/logger';
import { uuid } from 'uuidv4';

const logger = new Logger(ENV);

export const requestLogger = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentReqUUID = uuid();
	logger.info('Incoming request', {
		content: {
			path: req.path,
			headers: req.headers,
			content: req.body,
		},
		requestUUID: currentReqUUID,
	});

	const originalJsonMethod = res.json;

	res.json = (responseData) => {
		logger.info('Response request UUID: ', {
			content: responseData,
			requestUUID: currentReqUUID,
		});

		return originalJsonMethod.call(res, responseData);
	};

	next();
};
