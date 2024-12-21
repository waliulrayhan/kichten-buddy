import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { userMessage } = req.body;

      // Fetch available ingredients
      const ingredients = await prisma.ingredient.findMany();
      const ingredientList = ingredients.map((ing: { name: string }) => ing.name).join(', ');

      // Prepare the prompt
      const prompt = `I have the following ingredients: ${ingredientList}. I want ${userMessage}. Suggest a recipe.`;

      // Call Gemini API
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
      );

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

      // Save chat log
      await prisma.chatLog.create({
        data: { userMessage, botResponse },
      });

      res.status(200).json({ reply: botResponse });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
}
