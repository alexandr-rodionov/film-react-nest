import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

interface ILoggerConfig {
  type: string;
  dirName: string;
  allowedLevels: string;
}

@Injectable()
export class LoggerFactory {
  create(config: ILoggerConfig): LoggerService {
    const { type, dirName, allowedLevels } = config;
    const fileName = `${type}.log`;
    const allPossibleLevels = ['log', 'error', 'warn', 'debug'];
    const levels =
      allowedLevels === '*'
        ? allPossibleLevels
        : allowedLevels.split(',').map((level) => level.trim());

    switch (type.toLowerCase()) {
      case 'dev':
        return new DevLogger(dirName, fileName, levels);
      case 'json':
        return new JsonLogger(dirName, fileName, levels);
      case 'tskv':
        return new TskvLogger(dirName, fileName, levels);
      default:
        throw new Error(`Unsupported logger type: ${type}`);
    }
  }
}
