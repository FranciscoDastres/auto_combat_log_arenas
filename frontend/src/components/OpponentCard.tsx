import React from "react";
import { Opponent } from "../types/arena";
import styles from "./OpponentCard.module.css";

interface OpponentCardProps {
  opponent: Opponent;
}

export const OpponentCard: React.FC<OpponentCardProps> = ({ opponent }) => {
  const { name, realm, ilvl, spec, url, error } = opponent;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.realm}>{realm}</span>
      </div>

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.details}>
          <p>
            <strong>iLvl:</strong>{" "}
            <span className={styles.highlight}>{ilvl}</span>
          </p>
          <p>
            <strong>Especialización:</strong> {spec}
          </p>
        </div>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Ver en Ironforge
      </a>
    </div>
  );
};
