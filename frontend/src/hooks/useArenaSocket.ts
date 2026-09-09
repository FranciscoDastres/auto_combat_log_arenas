import { useEffect, useState } from "react";
import { socketService } from "../services/socketService";
import type { Opponent, ConnectionStatus } from "../types/arena";

export const useArenaSocket = () => {
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");

  useEffect(() => {
    setStatus("connecting");
    const socket = socketService.connect();

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));

    socket.on("arena-opponents", (data: Opponent[]) => {
      setOpponents(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("arena-opponents");
      socketService.disconnect();
    };
  }, []);

  return { opponents, status };
};
