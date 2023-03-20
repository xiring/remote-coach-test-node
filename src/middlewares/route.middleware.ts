import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/exceptions/http.exception';

const RouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!res.headersSent) throw new HttpException(404, 'Route Not Found!');
		next();
	} catch (err) {
		next(err);
	}
};

export default RouteMiddleware;
