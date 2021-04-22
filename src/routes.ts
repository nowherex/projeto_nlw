import { Router } from "express";
import { MessagesCrontroller } from "./controllers/MessagesCrontroller";

import { SettingsController } from "./controllers/SettingsController";
import { UsersControllers } from "./controllers/UsersControllers";


const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersControllers();
const messagesController = new MessagesCrontroller();

routes.post("/settings", settingsController.create);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);


export { routes };