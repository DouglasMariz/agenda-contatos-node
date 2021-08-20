import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from 'typeorm';
import bcrypt from 'bcryptjs';
import {User} from '@entity/User';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    firstName: "admin",
                    lastName: "",
                    email: "admin@admin.com",
                    password: bcrypt.hashSync("123456", 8),
                }
            ])
            .execute()
    }
}
