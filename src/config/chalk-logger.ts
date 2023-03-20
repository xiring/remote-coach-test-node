import chalk from 'chalk';

const chalkLoggerDeclaration = () => {
	global.logger = {
		error(...data: any[]) {
			console.log(chalk.red('[ERROR] - ', ...data));
		},
		primary(...data: any[]) {
			console.log(chalk.blue(...data));
		},
		success(...data: any[]) {
			console.log(chalk.green('[SUCCESS] - ', ...data));
		},

		info(...data: any[]){
			console.log(chalk.gray('[INFO] - ', ...data));
		}
	};
};

export default chalkLoggerDeclaration;
