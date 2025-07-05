import * as fs from 'fs';
import * as path from 'node:path';
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private filePath: string;
  private allowedLevels: string[];

  constructor(dirName: string, fileName: string, allowedLevels: string[]) {
    this.filePath = path.join(dirName, fileName);
    this.allowedLevels = allowedLevels;
    this.setupLogFile(dirName);
  }

  private setupLogFile(dirName: string) {
    try {
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }

      fs.appendFileSync(this.filePath, '');
    } catch (err) {
      console.error(
        `Ошибка при создании файла журнала ${this.filePath}: ${err.message}`,
      );
    }
  }

  private _formatMes(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    return (
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: level.toUpperCase(),
        message,
        additionalInfo: optionalParams.length > 0 ? optionalParams : undefined,
      }) + '\n'
    );
  }

  private writeLog(level: string, message: any, params: any[] | undefined) {
    if (!this.allowedLevels.includes(level)) return;

    const formattedMessage = this._formatMes(level, message, ...(params || []));

    try {
      fs.appendFileSync(this.filePath, formattedMessage);
    } catch (err) {
      console.error(`Ошибка при записи в журнал: ${err.message}`);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    this.writeLog('log', message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.writeLog('debug', message, optionalParams);
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    this.writeLog('error', message, [...optionalParams, trace]);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLog('warn', message, optionalParams);
  }
}
