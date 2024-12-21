import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const ingredients = await prisma.ingredient.findMany();
      res.status(200).json(ingredients);
    } else if (req.method === 'POST') {
      const { name, quantity, unit } = req.body;
      const ingredient = await prisma.ingredient.create({
        data: { name, quantity, unit },
      });
      res.status(201).json(ingredient);
    } else if (req.method === 'PUT') {
      const { id, quantity } = req.body;
      const updatedIngredient = await prisma.ingredient.update({
        where: { id },
        data: { quantity },
      });
      res.status(200).json(updatedIngredient);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    // Updated Error Handling
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}