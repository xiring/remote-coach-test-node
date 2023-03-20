import AuthService from "./auth.service";
import { SuccessRes } from "@utils/response";
import { ChangePassword, Login, Register } from "./auth.dto";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  findAllUser = async (req: Request, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.findAll(),
      message: `User List Fetched Successfully`,
    });
  };

  login = async (req: Request<Login>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.login(req.body),
      message: `User Logged in Successfully`,
    });
  };

  register = async (req: Request<Register>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.register(req.body),
      message: `User Registered in Successfully`,
    });
  };

  changeStatus = async (req: Request<{ status: boolean }, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.changeStatus(req.params.id, req.body.status),
      message: `User Status Changed Successfully`,
    });
  };

  delete = async (req: Request<null, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.deleteUser(req.params.id),
      message: `User Deleted Successfully`,
    });
  };

  changePassword = async (req: Request<ChangePassword>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.changePassword(req.body),
      message: "Password Changed Successful.",
    });
  };
}

export default AuthController;
