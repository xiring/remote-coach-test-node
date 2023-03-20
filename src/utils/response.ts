const SuccessRes = (response: Response, status: number, data: { data?: any, message: string }) => {
	return response.status(status).send({ ...data, status, success: true });
};

const ErrorRes = (response: Response, status: number, data: { error?: any, message: string }) => {
	return response.status(status).send({ ...data, status, success: false });
};

export { SuccessRes, ErrorRes };
