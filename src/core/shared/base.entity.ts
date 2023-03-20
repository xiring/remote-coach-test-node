import { Property } from "@mikro-orm/core";

export class BaseEntity {
  @Property({ hidden: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updatedAt = new Date();

  @Property({ hidden: true })
  isDeleted = false;

  @Property({ hidden: true })
  isPermanent = false;

  @Property({ type: "uuid", nullable: true, hidden: true })
  createdBy: string;

  @Property({ type: "uuid", nullable: true, hidden: true })
  updatedBy: string;

  @Property()
  isActive = true;
}
