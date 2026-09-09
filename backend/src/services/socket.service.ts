import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { ENV } from "../config/environment.js";
import type { OpponentData } from "../types/arena.js";

export class SocketService {
  private io: Server;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: ENV.CORS_ORIGIN,
        methods: ["GET", "POST"],
      },
    });

    this.initListeners();
  }

  private initListeners(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`[Socket] Cliente conectado: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`[Socket] Cliente desconectado: ${socket.id}`);
      });
    });
  }

  public broadcastOpponents(opponents: OpponentData[]): void {
    this.io.emit("arena-opponents", opponents);
  }
}
