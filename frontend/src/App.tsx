import React from "react";
import { useArenaSocket } from "./hooks/useArenaSocket";
import { OpponentCard } from "./components/OpponentCard";
import styles from "./App.module.css";

export const App: React.FC = () => {
  const { opponents, status } = useArenaSocket();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>WoW Arena Tracker</h1>
        <span className={`${styles.badge} ${styles[status]}`}>
          {status.toUpperCase()}
        </span>
      </header>

      <section className={styles.grid}>
        {opponents.length > 0 ? (
          opponents.map((opp, idx) => (
            <OpponentCard
              key={`${opp.name}-${opp.realm}-${idx}`}
              opponent={opp}
            />
          ))
        ) : (
          <p className={styles.empty}>Esperando entrada a la arena...</p>
        )}
      </section>
    </main>
  );
};

export default App;
