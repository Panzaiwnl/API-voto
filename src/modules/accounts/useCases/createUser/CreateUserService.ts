import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

interface IRequest{
    name: string;
    email: string;
    password: string;

}

@injectable()
export class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}
    
    
    async execute({name, email, password}: ICreateUserDTO): Promise<void>{
        const alreadyExists = await this.userRepository.findByEmail(email);

        if(alreadyExists){
            throw new Error("Email already exists");
        }

        await this.userRepository.create({
            name,
            email,
            password
        })

    }

}