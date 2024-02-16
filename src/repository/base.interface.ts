import {
	Repository,
	DeepPartial,
	DeleteResult,
	FindOptionsWhere,
} from 'typeorm';
import { ILogger } from '../utils/logger';

export interface IBaseRepository<T extends Record<string, any>> {
	repository: Repository<T>;
	logger: ILogger;

	save(data: DeepPartial<T>): Promise<T>;
	delete(query: FindOptionsWhere<T>): Promise<DeleteResult>;
}
