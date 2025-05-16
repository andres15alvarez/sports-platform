import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL, API_HEADERS } from "@/src/config/apiConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { endpoint = "leagues", ...params } = req.query;

  const url = new URL(`${API_URL}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  try {
    const response = await fetch(url.toString(), {
      headers: API_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`API externa no disponible: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error al llamar la API externa:", err);
    res.status(500).json({ error: "Error al conectar con la API externa" });
  }
}
