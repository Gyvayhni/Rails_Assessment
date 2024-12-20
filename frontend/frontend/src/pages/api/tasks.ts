// pages/api/tasks.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';  // Assuming you have set up Prisma

// Define a type for the Task model (can be expanded later)
type Task = {
  id: number;
  title: string;
  listId: number;
  status: string;
};

// Handle different HTTP methods: GET, POST, PUT, DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all tasks
      try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      break;

    case 'POST':
      // Create a new task
      try {
        const { title, listId } = req.body;
        const newTask = await prisma.task.create({
          data: {
            title,
            listId,
            status: 'Pending', // Set default status
          },
        });
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
      }
      break;

    case 'PUT':
      // Update an existing task
      try {
        const { id, title, status } = req.body;
        const updatedTask = await prisma.task.update({
          where: { id },
          data: { title, status },
        });
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
      }
      break;

    case 'DELETE':
      // Delete a task
      try {
        const { id } = req.query;
        const deletedTask = await prisma.task.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedTask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
