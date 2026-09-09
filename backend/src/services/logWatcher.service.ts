import fs from "fs";
import chokidar from "chokidar";

export class LogWatcherService {
  private filePath: string;
  private filePosition: number = 0;
  private onArenaEnterCallback: (
    players: { name: string; realm: string }[],
  ) => void;

  constructor(
    filePath: string,
    onArenaEnter: (players: { name: string; realm: string }[]) => void,
  ) {
    this.filePath = filePath;
    this.onArenaEnterCallback = onArenaEnter;
  }

  public start(): void {
    if (!fs.existsSync(this.filePath)) {
      console.warn(
        `[LogWatcher] El archivo no existe en la ruta: ${this.filePath}`,
      );
    } else {
      this.filePosition = fs.statSync(this.filePath).size;
    }

    const watcher = chokidar.watch(this.filePath, {
      persistent: true,
      usePolling: true,
      interval: 500,
    });

    watcher.on("change", () => this.handleFileChange());
    console.log(`[LogWatcher] Monitoreando: ${this.filePath}`);
  }

  private handleFileChange(): void {
    const stats = fs.statSync(this.filePath);
    if (stats.size < this.filePosition) {
      this.filePosition = 0; // El archivo se reinició o truncó
    }

    const stream = fs.createReadStream(this.filePath, {
      start: this.filePosition,
      end: stats.size,
      encoding: "utf-8",
    });

    stream.on("data", (chunk: Buffer | string) => {
      this.filePosition = stats.size;
      this.processLogChunk(chunk.toString());
    });
  }

  private processLogChunk(chunk: string): void {
    const lines = chunk.split("\n");

    lines.forEach((line) => {
      // Captura de eventos COMBATANT_INFO o inicio de arena
      if (line.includes("ZONE_CHANGE") || line.includes("COMBATANT_INFO")) {
        // Lógica de extracción de nombres y reinos
      }
    });
  }
}
