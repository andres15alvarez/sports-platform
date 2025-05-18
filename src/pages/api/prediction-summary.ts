import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'API key de OpenAI no definida' });
  }

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { homeTeam, awayTeam, seriesState, odds } = req.body;

  const prompt = `
  Redacta una previa deportiva para el partido entre ${homeTeam} y ${awayTeam}.
  - Cuota para ${homeTeam}: ${odds?.home || 'no disponible'}.
  - Cuota para ${awayTeam}: ${odds?.away || 'no disponible'}.
  - Estado de la serie: ${seriesState || 'fase regular'}.
  
  Analiza las probabilidades, menciona fortalezas, debilidades y factores a considerar según las cuotas y contexto.
  Usa un tono periodístico y termina con una conclusión razonable.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
    });

    const summary = completion.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al generar previa:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ error: 'Error generando la previa' });
    }
  }
}
