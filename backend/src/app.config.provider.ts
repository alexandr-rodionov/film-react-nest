import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER || 'mongodb',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || '27017',
      name: process.env.DATABASE_NAME || 'afisha',
      user: {
        name: process.env.DATABASE_USERNAME || 'afisha_user',
        password: process.env.DATABASE_PASSWORD || 'afisha_password',
      },
    },
    serveStatic: {
      rootPath: process.env.ROOT_PATH || '/public/content/afisha',
      serveRoot: process.env.SERV_ROOT_PATH || '/content/afisha',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  serveStatic: AppServeStatic;
}

type DriverType = 'mongodb' | 'postgres';

export interface AppConfigDatabase {
  driver: DriverType;
  host: string;
  port: number;
  name: string;
  user?: {
    name: string;
    password: string;
  };
}

export interface AppServeStatic {
  rootPath: string;
  serveRoot: string;
}
