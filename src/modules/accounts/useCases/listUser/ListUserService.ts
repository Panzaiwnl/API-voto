import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class ListUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository){}
        
    
    async execute(): Promise<User[]>{
        const user = await this.userRepository.list();

        return user;



    }
}