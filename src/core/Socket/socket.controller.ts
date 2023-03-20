import SocketIo, { Socket } from "socket.io";
import { Server } from "http";
import { ExtendedError } from "socket.io/dist/namespace";
import { SocketAuthMiddleware } from "@middlewares/auth.middleware";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
class SocketController {
  private io: SocketIo.Server;
  private readonly instance: SocketController;

  constructor(server: Server) {
    this.init(server);
  }

  init(server: Server): void {
    this.io = new SocketIo.Server(server, {
      transports: ["websocket"],
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.initSocketMiddleware();

    this.io.on("connection", (socket) => {
      logger.primary(`************** USER Connected **************`);

      socket.on("disconnect", (socket) => {
        logger.error(`************** USER Disconnected **************`);
      });
    });
  }

  initSocketMiddleware(): void {
    const wrap = (middleware) => (socket: Socket, next: (err?: ExtendedError) => void) =>
      middleware({ headers: { authorization: socket.handshake.auth.token } }, next);
    this.io.use(wrap(SocketAuthMiddleware));
  }

  getIo(): SocketIo.Server {
    return this.io;
  }
}

export default SocketController;
