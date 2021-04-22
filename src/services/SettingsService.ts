import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SetttingsRepository";

interface ErrorWithStatus extends Error {
    status?: number;
}

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create ({ chat, username } : ISettingsCreate ) {
        
        const userAlreadyExists = await this.settingsRepository.findOne({username});

        if(userAlreadyExists) {
            let erro = new Error("User already exists!") as ErrorWithStatus;
            erro.status = 409;
            throw erro;
        }

        const settings = this.settingsRepository.create({
            chat, 
            username
        });
    
        await this.settingsRepository.save(settings);

        return settings;
    
    }
}

export { SettingsService }