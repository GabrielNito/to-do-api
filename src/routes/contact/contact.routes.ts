import { Router } from "express";
import ContactController from "../../controllers/contact/contact.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const contactsRoutes = Router();

contactsRoutes.post("/", authMiddleware, ContactController.store);
contactsRoutes.get("/", authMiddleware, ContactController.index);
contactsRoutes.get("/:id", authMiddleware, ContactController.show);
contactsRoutes.delete("/:id", authMiddleware, ContactController.delete);
contactsRoutes.put("/:id", authMiddleware, ContactController.update);

export default contactsRoutes;
