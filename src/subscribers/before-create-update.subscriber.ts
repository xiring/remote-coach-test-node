import {
  BeforeCreate,
  BeforeUpdate,
  EventArgs,
  EventSubscriber,
  Subscriber,
} from "@mikro-orm/core";
import * as httpContext from "express-http-context";

@Subscriber()
export class BeforeCreateUpdateSubscriber implements EventSubscriber {
  @BeforeCreate()
  async beforeCreate(args: EventArgs<any>): Promise<void> {
    const currentUser = httpContext.get("user");
    args.entity.createdBy = currentUser?.id;
    args.entity.updatedBy = currentUser?.id;
  }

  @BeforeUpdate()
  async beforeUpdate(args: EventArgs<any>): Promise<void> {
    const currentUser = httpContext.get("user");
    args.entity.updatedBy = currentUser?.id;
  }
}
