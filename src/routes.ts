import { Router } from "express";

import { getCustomRepository } from "typeorm";
import { SettingsController } from "./controllers/SettingsController";

import { SettingsRepository } from "./repositories/SetttingsRepository";

const routes = Router();

const settingsController = new SettingsController();

routes.post("/settings", settingsController.create)


export { routes };