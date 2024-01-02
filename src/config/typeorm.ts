import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { Quiz } from '../modules/quiz/quiz.entity';
import {Test} from '../modules/test/test.entity';
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'secret',
    database: 'QUIZ',
    entities: [Quiz, Test],
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);