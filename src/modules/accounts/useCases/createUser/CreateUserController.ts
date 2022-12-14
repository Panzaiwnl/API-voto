import { Response, response, Request } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


export class CreateUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const {name, email, password} = request.body;

        const createUserService = container.resolve(CreateUserUseCase);
        
        await createUserService.execute({
            name,
            email,
            password
        });

        return response.status(201).send();

    }
}