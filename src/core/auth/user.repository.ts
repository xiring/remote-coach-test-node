import { Singleton } from "@utils/decorators/singleton";
import { UserEntity } from "./user.entity";
import BaseRepository from "../shared/base.repository";

@Singleton
class UserRepository extends BaseRepository<UserEntity> {}

export default UserRepository;
