import {getRepository, Like} from "typeorm";
import {Request, Response} from 'express';
import {User} from "@entity/User";

class UserController {
    async index(request: Request, response: Response) {
        const users = await User.find({withDeleted: false});
        return response.send({userId: request.userId, users: users});
    }

    async find(request: Request, response: Response) {
        const {firstName, email} = request.body;
        const userRepository = getRepository(User);

        const condition = {
            where: [
                {firstName: Like(`%${firstName}%`)},
                {email: Like(`%${email}%`)}
            ]
        };

        if (firstName && email) {
            condition.where = {
                firstName: Like(`%${firstName}%`),
                email: Like(`%${email}%`)
            }
        }

        const users = await userRepository.find(condition);
        return response.send({userId: request.userId, users: users});
    }

    async store(request: Request, response: Response) {
        const {email} = request.body;
        const userExists = await User.findOne({where: {email}});

        if (userExists) {
            return response.sendStatus(409);
        }

        const user = await User.create(request.body);
        await User.save(user);

        return response.json(user).sendStatus(200);
    }

    async update(request: Request, response: Response) {
        const {id} = request.body;
        if (!id) {
            return response.sendStatus(409);
        }
        const updated = await User.update({id: id}, request.body);
        return response.json(updated).sendStatus(200);
    }

    async delete(request: Request, response: Response) {
        const {id} = request.body;
        if (!id) {
            return response.sendStatus(409);
        }

        const user = await getRepository(User).findOne(id);
        const deleted = await User.softRemove(user);
        return response.json(deleted).sendStatus(200);
    }
}

export default new UserController();
