import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER || 'mongodb',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/afisha',
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

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export interface AppServeStatic {
  rootPath: string;
  serveRoot: string;
}
