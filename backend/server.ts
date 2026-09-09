import express from "express";
import { createServer } from "http";
import cors from "cors";
import { ENV } from "./src/config/environment";
import { SocketService } from "./src/services/socket.service";
import { ScraperService } from "./src/services/scraper.service";
import { LogWatcherService } from "./src/services/logWatcher.service";

// --- CONFIGURACIÓN ---
const app = express();
app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());

const httpServer = createServer(app);

// Instancia de Servicios
const socketService = new SocketService(httpServer);
const scraperService = new ScraperService();

// Callback disparado cuando el LogWatcher detecta oponentes en arena
const handleArenaMatch = async (
  detectedPlayers: { name: string; realm: string }[],
) => {
  console.log("[Arena] Oponentes detectados:", detectedPlayers);
  const opponentsData = await scraperService.fetchTeamData(detectedPlayers);
  socketService.broadcastOpponents(opponentsData);
};

const logWatcher = new LogWatcherService(ENV.LOG_FILE_PATH, handleArenaMatch);

// Endpoint de prueba
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- EJECUCIÓN ---
httpServer.listen(ENV.PORT, () => {
  console.log(`[Server] Corriendo en http://localhost:${ENV.PORT}`);
  logWatcher.start();
});
