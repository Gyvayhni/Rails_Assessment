// pages/api/lists.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../backend/prisma';  // Import Prisma Client

// Handle different HTTP methods: GET, POST
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all lists
      try {
        const lists = await prisma.list.findMany({
          include: {
            items: true, // Include related items
          },
        });
        res.status(200).json(lists);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lists' });
      }
      break;

    case 'POST':
      // Create a new list
      try {
        const { name } = req.body; // Get list name from request body
        const newList = await prisma.list.create({
          data: {
            name,
          },
        });
        res.status(201).json(newList);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create list' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
