import { Router } from "express";
import TaskController from "../../controllers/task/task.controller";

const contactsRoutes = Router();

contactsRoutes.post("/", TaskController.store);
contactsRoutes.get("/", TaskController.index);
contactsRoutes.get("/:id", TaskController.show);
contactsRoutes.delete("/:id", TaskController.delete);
contactsRoutes.put("/:id", TaskController.update);

export default contactsRoutes;
