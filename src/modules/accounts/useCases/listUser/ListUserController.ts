import {Response, response, Request} from "express"
import { container } from "tsyringe";
import { ListUserService } from "./ListUserService";


export class ListUserController {
    async handle(request: Request, response: Response): Promise<Response>{
        const listUserService = container.resolve(ListUserService);

        const allUsers = await listUserService.execute();

        return response.status(200).json(allUsers);
}

}