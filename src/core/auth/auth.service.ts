import { ChangePassword, Login, Register } from "./auth.dto";
import UserRepository from "@core/auth/user.repository";
import { UserEntity } from "@core/auth/user.entity";
import HttpException from "@utils/exceptions/http.exception";
import { compareHash, hashPassword } from "@utils/bcrypt";
import { Singleton } from "@utils/decorators/singleton";
import { getContextUser } from "@utils/utility";
import { FilterQuery } from "@mikro-orm/core";
import { TokenService } from "@core/auth/token.service";
import { OrmManager } from "@config/micro-orm/Mikro";

@Singleton
class AuthService {
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor() {
    const em = new OrmManager().getEM();

    this.userRepository = em.getRepository(UserEntity);

    this.tokenService = new TokenService();
  }
  findUserOrFail = async (where: FilterQuery<UserEntity>) => {
    const user = await this.userRepository.findOne(where, {
      populate: ["id", "email", "phoneNumber", "firstName", "lastName", "middleName", "isActive"],
    });
    if (!user) throw new HttpException(400, "User does not Exist.");

    return user;
  };

  findAll = () => this.userRepository.findEntries({ $ne: { id: getContextUser()?.id } } as any);

  /**
   *
   * @param password
   * @param email
   */
  login = async ({ password, email }: Login) => {
    const user = await this.findUserOrFail({ email });

    if (!user.isActive) throw new HttpException(404, "User is not active");

    if (!user || !(await compareHash(password, user.password)))
      throw new HttpException(404, "User Not Found!");

    const userData = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phoneNumber: user.phoneNumber,
      isPermanent: user.isPermanent,
    };

    const token = this.tokenService.signToken(userData, user.id);
    const refreshToken = this.tokenService.signRefreshToken(userData, user.id);

    user.lastLoginDate = new Date();
    user.refreshToken = refreshToken;

    await this.userRepository.flush();

    return {
      user,
      accessToken: token,
      refreshToken,
    };
  };

  register = async (data: Register) => {
    const userData = await this.userRepository.findEntry({ email: data.email, isDeleted: false });
    if (userData) throw new HttpException(400, "User with the email address already exists");

    const user = await this.userRepository.createEntry({
      ...data,
      password: await hashPassword(data.password),
    });

    const token = this.tokenService.signToken(userData, user.id);
    const refreshToken = this.tokenService.signRefreshToken(userData, user.id);

    user.lastLoginDate = new Date();
    user.refreshToken = refreshToken;

    await this.userRepository.flush();

    return {
      user,
      accessToken: token,
      refreshToken,
    };
  };

  changeStatus = async (id: string, status: boolean) => {
    if (id === getContextUser().id) throw new HttpException(400, "You cannot delete your self :)");

    const userData = await this.userRepository.findEntry({
      id,
      isDeleted: false,
      isActive: !status,
    });

    if (!userData) throw new HttpException(404, "User Not Found!");
    await this.userRepository.updateEntry(userData, { isActive: status, refreshToken: null });

    return userData;
  };

  deleteUser = async (id: string) => {
    const userData = await this.userRepository.findEntry({
      id,
      isDeleted: false,
    });

    if (!userData) throw new HttpException(404, "User Not Found!");
    await this.userRepository.deleteEntry(userData);

    return userData;
  };

  changePassword = async (
    { oldPassword, newPassword }: ChangePassword,
    id = getContextUser()?.id,
  ) => {
    const user = await this.userRepository.findOne({ id });
    if (user.isPermanent) throw new HttpException(400, "Cannot Perform Operation for this user");

    if (!(await compareHash(oldPassword, user.password)))
      throw new HttpException(401, "Current Password is not correct");

    if (await compareHash(newPassword, user.password))
      throw new HttpException(422, "Current password and new password cannot be same.");

    user.password = await hashPassword(newPassword);
    user.changePassword = false;
    user.passwordChangedDate = new Date();

    await this.userRepository.flush();

    return;
  };
}

export default AuthService;
