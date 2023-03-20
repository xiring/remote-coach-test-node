class HttpException extends Error {
	public message: string;
	public status: number;
	public description: string;


	constructor(status: number, message: string, description: string = null) {
		super();
		this.message = message;
		this.status = status;
		this.description = description;
	}
}

export default HttpException;
