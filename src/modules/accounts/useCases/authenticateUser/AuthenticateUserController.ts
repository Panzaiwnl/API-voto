import {Response, response, Request} from "express"
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;

        const authenticateUserUseCase = await container.resolve(AuthenticateUserUseCase);


    }
}