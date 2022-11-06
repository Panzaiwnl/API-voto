import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";


export class UserRepository implements IUserRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }
    
    async create({name, email, password}: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({name, email, password});

        await this.repository.save(user);       
        
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
      }

    async list(): Promise<User[]> {
        const user = await this.repository.find();

        return user;
    }
   
    
}