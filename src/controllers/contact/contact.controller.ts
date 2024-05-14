import { Request, Response } from "express";
import Contact from "../../models/contact.entity";

export default class ContactController {
  static async store(req: Request, res: Response) {
    const { id, name, email, phone } = req.body;
    const { userId } = req.headers;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const contact = new Contact();
    contact.id = id;
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.userId = Number(userId);
    await contact.save();

    return res.status(201).json(contact);
  }

  static async index(req: Request, res: Response) {
    const { userId } = req.headers;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const contacts = await Contact.find({ where: { userId: Number(userId) } });
    return res.json(contacts);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const contact = await Contact.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    return res.json("contact deletada com sucesso");
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const contact = await Contact.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    if (!contact) {
      return res.status(404).json({ error: "contact não encontrada" });
    }

    await contact.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { userId } = req.headers;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const contact = await Contact.findOneBy({
      id: Number(id),
      userId: Number(userId),
    });
    if (!contact) {
      return res.status(404).json({ error: "contact não encontrada" });
    }

    contact.name = name ?? contact.name;
    contact.email = email ?? contact.email;
    contact.phone = phone ?? contact.phone;
    await contact.save();

    return res.json(contact);
  }
}
