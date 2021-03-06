import { Request, Response } from "express"
import { MessagesService } from "../services/MessagesService"

class MessagesCrontroller {
    async create(request: Request, response: Response) {
        const {admin_id, text, user_id } = request.body;
        const messagesServices = new MessagesService();

        const message = await messagesServices.create({
            admin_id,
            text,
            user_id
        })

        return response.json(message);
    }

    async showByUser(request: Request, response: Response){
        const { id } = request.params;
        
        const messagesServices = new MessagesService();

        const list = await messagesServices.listByUser(id);

        return response.json(list);
    }
}

export { MessagesCrontroller }