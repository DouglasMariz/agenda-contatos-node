import {getRepository, Like} from 'typeorm';
import {Request, Response} from 'express';
import {Person} from "@entity/Person";

class PersonController {
    async index(request: Request, response: Response) {
        const persons = await Person.find({withDeleted: false, relations: ["phone"]});
        return response.send({userId: request.userId, persons: persons});
    }

    async find(request: Request, response: Response) {
        const {name, cpf} = request.body;
        const personRepository = getRepository(Person);

        const condition = {
            where: [
                {name: Like(`%${name}%`)},
                {cpf: Like(`%${cpf}%`)}
            ]
        };

        if (name && cpf) {
            condition.where = {
                name: Like(`%${name}%`),
                cpf: Like(`%${cpf}%`)
            }
        }

        const persons = await personRepository.find(condition);
        return response.send({userId: request.userId, persons: persons});
    }

    async store(request: Request, response: Response) {
        const {cpf} = request.body;
        const personExists = await Person.findOne({where: {cpf}});

        if (personExists) {
            return response.sendStatus(409);
        }

        const person = Person.create(request.body);
        await Person.save(person);

        return response.json(person).sendStatus(200);
    }

    async update(request: Request, response: Response) {
        const {id} = request.body;
        if (!id) {
            return response.sendStatus(409);
        }

        const personRepository = getRepository(Person);
        const person = await personRepository.findOne(id, {relations: ["phone"]});
        personRepository.merge(person, request.body);
        const updated = await personRepository.save(person);
        return response.json(updated).sendStatus(200);
    }

    async delete(request: Request, response: Response) {
        const {id} = request.body;

        if (!id) {
            return response.sendStatus(409);
        }

        const person = await getRepository(Person).findOne(id);
        const deleted = await Person.softRemove(person);
        return response.json(deleted).sendStatus(200);
    }
}

export default new PersonController();
