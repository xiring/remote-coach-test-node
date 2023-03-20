import "reflect-metadata";
import App from "./app";
import chalkLoggerDeclaration from "./config/chalk-logger";

const bootstrap = async () => {
  new App();
};

bootstrap()
  .then(() => {
    logger.success("🔥 App Started 🔥");
    logger.info("*********************************");
  })
  .catch((err: Error) => {
    logger.error(err.stack);
  });
