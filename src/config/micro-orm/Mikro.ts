import { MikroORM } from "@mikro-orm/core";
import { SqlEntityManager } from "@mikro-orm/postgresql";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
export class OrmManager {
  private orm: MikroORM;
  private em: SqlEntityManager;

  getOrm = () => this.orm;

  getEM = () => this.em;

  setOrm = (orm: MikroORM) => {
    this.orm = orm;
  };

  setEm = (em: SqlEntityManager) => {
    this.em = em;
  };
}
