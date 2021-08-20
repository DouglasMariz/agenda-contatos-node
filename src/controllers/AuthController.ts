import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {User} from "@entity/User";

class AuthController {
    async authenticate(request: Request, response: Response) {
        const {email, password} = request.body;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {email}});

        if (!user) {
            return response.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.sendStatus(401);
        }

        const token =  jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'});

        delete user.password;

        return response.json({
            user,
            token
        })
    }
}

export default new AuthController();
