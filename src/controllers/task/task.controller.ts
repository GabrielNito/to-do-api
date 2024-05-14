import { Request, Response } from "express";
import Task from "../../models/task.entity";

export default class TaskController {
  static async store(req: Request, res: Response) {
    const { id, status, title, description, tags, date } = req.body;
    const { userId } = req.headers;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const task = new Task();
    task.id = id;
    task.status = status;
    task.title = title;
    task.description = description;
    task.tags = tags;
    task.date = date;
    task.userId = Number(userId);
    await task.save();

    return res.status(201).json(task);
  }

  static async index(req: Request, res: Response) {
    const { userId } = req.headers;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const tasks = await Task.find({ where: { userId: Number(userId) } });
    return res.json(tasks);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const task = await Task.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    return res.json("Task deletada com sucesso");
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const task = await Task.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    await task.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { _, status, title, description, tags, date } = req.body;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const task = await Task.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    task.status = status ?? task.status;
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.tags = tags ?? task.tags;
    task.date = date ?? task.date;
    await task.save();

    return res.json(task);
  }
  static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const task = await Task.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    task.status = status ?? task.status;
    await task.save();

    return res.json(task);
  }
}
