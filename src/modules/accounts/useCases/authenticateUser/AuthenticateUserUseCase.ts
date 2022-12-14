import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect")
        }

        const token = sign({}, "c6cc8094c2dc07b700ffcc36d64e2138",{
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            user: {
              name: user.name,
              email: user.email,
            },
            token,
          };



    }
}