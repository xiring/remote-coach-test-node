import bcrypt from 'bcryptjs';

const hashPassword = async (password: string, saltRounds = 10): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
};

const compareHash = async (pwd: string, hashedPwd: string) => {
	return await bcrypt.compare(pwd, hashedPwd);
};

export { compareHash, hashPassword };

