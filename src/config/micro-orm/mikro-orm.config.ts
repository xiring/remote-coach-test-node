import { LoadStrategy, Options, UnderscoreNamingStrategy } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { BaseEntity } from "@core/shared/base.entity";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import validateEnv from "@utils/validate-env";

validateEnv();

const ormConfig: Options = {
  type: "mysql",
  host: process.env.MICRO_ORM_DB_HOST,
  dbName: process.env.MICRO_ORM_DB_NAME,
  user: process.env.MICRO_ORM_DB_USER,
  password: process.env.MICRO_ORM_DB_PASSWORD,
  port: Number(process.env.MICRO_ORM_DB_PORT),
  // clientUrl: process.env.MICRO_ORM_DB_URL,
  namingStrategy: UnderscoreNamingStrategy,
  highlighter: new SqlHighlighter(),
  loadStrategy: LoadStrategy.JOINED,
  debug: process.env.NODE_ENV !== "production",
  entitiesTs: ["src/**/*.entity.ts"],
  entities: ["dist/**/*.entity.js"],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
  entityRepository: BaseEntity,
  metadataProvider: TsMorphMetadataProvider,
};

export default ormConfig;
