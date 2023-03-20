import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import UserRepository from "@core/auth/user.repository";
import { BaseEntity } from "../shared/base.entity";

@Entity({ tableName: "user", customRepository: () => UserRepository })
export class UserEntity extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id = v4();

  @Property()
  firstName: string;

  @Property({ nullable: true })
  middleName: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  phoneNumber: string;

  @Property({ hidden: true })
  password: string;

  @Property({ hidden: true, nullable: true })
  changePassword = true;

  @Property({ hidden: true, nullable: true })
  passwordChangedDate: Date;

  @Property({ hidden: true, nullable: true })
  lastLoginDate: Date;

  @Property({ type: "text", hidden: true, nullable: true })
  refreshToken: string;
}
