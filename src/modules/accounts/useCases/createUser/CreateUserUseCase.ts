import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import {hash} from "bcrypt"

interface IRequest{
    name: string;
    email: string;
    password: string;

}

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}
    
    
    async execute({name, email, password}: ICreateUserDTO): Promise<void>{
        const alreadyExists = await this.userRepository.findByEmail(email);

        if(alreadyExists){
            throw new Error("Email already exists");
        }

        const hashedPassword = await hash(password, 8);

        await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        })

       
    }

    

}

