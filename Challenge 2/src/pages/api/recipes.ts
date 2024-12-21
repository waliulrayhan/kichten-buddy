import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const recipes = await prisma.recipe.findMany({
        include: { media: true },
      });
      res.status(200).json(recipes);
    } else if (req.method === 'POST') {
      const { title, description, ingredients, steps, isFavorite } = req.body;
      const recipe = await prisma.recipe.create({
        data: { title, description, ingredients, steps, isFavorite },
      });
      res.status(201).json(recipe);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    // res.status(500).json({ error: error.message });
        // Updated Error Handling
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
