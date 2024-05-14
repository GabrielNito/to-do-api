import { Router } from "express";
import taskRoutes from "./task/task.routes";
import authRoutes from "./auth/auth.routes";
import contactsRoutes from "./contact/contact.routes";

const routes = Router();

routes.use("/task", taskRoutes);
routes.use("/auth", authRoutes);
routes.use("/contacts", contactsRoutes);

export default routes;
