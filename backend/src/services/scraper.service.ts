import axios from "axios";
import * as cheerio from "cheerio";
import type { OpponentData } from "../types/arena.js";

export class ScraperService {
  private baseUrl = "https://ironforge.pro/pvp/player";

  public async fetchPlayerInfo(
    name: string,
    realm: string,
  ): Promise<OpponentData> {
    const formattedRealm = realm.toLowerCase().replace(/\s+/g, "-");
    const targetUrl = `${this.baseUrl}/${formattedRealm}/${name.toLowerCase()}`;

    try {
      const { data } = await axios.get(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        timeout: 5000,
      });

      const $ = cheerio.load(data);

      const ilvl = $(".ilvl-class-or-selector").text().trim() || "N/A";
      const spec = $(".spec-class-or-selector").text().trim() || "Desconocida";

      return {
        name,
        realm,
        ilvl,
        spec,
        url: targetUrl,
      };
    } catch (error) {
      return {
        name,
        realm,
        ilvl: "N/A",
        spec: "N/A",
        url: targetUrl,
        error: "No se encontraron datos en Ironforge",
      };
    }
  }

  public async fetchTeamData(
    players: { name: string; realm: string }[],
  ): Promise<OpponentData[]> {
    const promises = players.map((p) => this.fetchPlayerInfo(p.name, p.realm));
    return Promise.all(promises);
  }
}
