// pages/api/items.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../backend/prisma';  // Import Prisma Client

// Handle different HTTP methods: GET, POST, PUT, DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all items for a specific list
      try {
        const { listId } = req.query;
        const items = await prisma.item.findMany({
          where: {
            listId: Number(listId),
          },
        });
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
      }
      break;

    case 'POST':
      // Create a new item
      try {
        const { content, listId } = req.body; // Get item content and listId from request body
        const newItem = await prisma.item.create({
          data: {
            content,
            listId,
          },
        });
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
      }
      break;

    case 'PUT':
      // Update an existing item
      try {
        const { id, content } = req.body; // Get item id and new content from request body
        const updatedItem = await prisma.item.update({
          where: { id },
          data: { content },
        });
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
      }
      break;

    case 'DELETE':
      // Delete an item
      try {
        const { id } = req.query;
        const deletedItem = await prisma.item.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
