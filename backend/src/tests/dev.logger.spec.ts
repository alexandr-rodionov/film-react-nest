import * as fs from 'fs';
import * as path from 'node:path';
import { DevLogger } from '../loggers/dev.logger';

const dirName = '/tmp/test_logs';
const fileName = 'dev.log';

beforeEach(() => {
  const tempDir = dirName;

  if (tempDir && fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  jest.resetModules();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

afterAll(() => {
  const tempDir = dirName;

  if (tempDir && fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe('DevLogger', () => {
  it('Create log-file in the specified directory', () => {
    const expectedFilePath = path.join(dirName, fileName);

    new DevLogger(dirName, fileName, ['log', 'error']);

    expect(fs.existsSync(expectedFilePath)).toBe(true);
  });

  it('Write logs with different levels', () => {
    const expectedFilePath = path.join(dirName, fileName);
    const logger = new DevLogger(dirName, fileName, [
      'log',
      'error',
      'warn',
      'debug',
    ]);

    logger.log('Test log message');
    logger.error('Test error message');
    logger.warn('Test warning message');
    logger.debug('Test debug message');

    const content = fs.readFileSync(expectedFilePath, 'utf8');

    expect(content).toMatch(new RegExp(`\\[.*] \\[LOG] Test log message\\n`));
    expect(content).toMatch(
      new RegExp(`\\[.*] \\[ERROR] Test error message .*\\n`),
    );
    expect(content).toMatch(
      new RegExp(`\\[.*] \\[WARN] Test warning message\\n`),
    );
    expect(content).toMatch(
      new RegExp(`\\[.*] \\[DEBUG] Test debug message\\n`),
    );
  });

  it('Filter out messages based on allowed log levels', () => {
    const expectedFilePath = path.join(dirName, fileName);
    const logger = new DevLogger(dirName, fileName, ['log', 'error']);

    logger.log('Test log message');
    logger.error('Test error message');
    logger.warn('Test warning message');
    logger.debug('Test debug message');

    const content = fs.readFileSync(expectedFilePath, 'utf8');

    expect(content).toContain('[LOG]');
    expect(content).toContain('[ERROR]');
    expect(content).not.toContain('[WARN]');
    expect(content).not.toContain('[DEBUG]');

    expect(content).toMatch(
      new RegExp(`\\[.*\\] \\[LOG\\] Test log message\\n`),
    );
    expect(content).toMatch(
      new RegExp(`\\[.*\\] \\[ERROR\\] Test error message .*\\n`),
    );
    expect(content).not.toMatch(
      new RegExp(`\\[.*\\] \\[WARN\\] Test warning message\\n`),
    );
    expect(content).not.toMatch(
      new RegExp(`\\[.*\\] \\[DEBUG\\] Test debug message\\n`),
    );
  });

  it('Handle errors during directory creation', () => {
    const spyConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const spyAppendFileSync = jest
      .spyOn(fs, 'appendFileSync')
      .mockImplementation(() => {
        throw new Error('Some error');
      });

    new DevLogger(dirName, fileName, ['log', 'error']);

    expect(spyAppendFileSync).toHaveBeenCalled();
    expect(spyConsoleError).toHaveBeenCalled();
  });

  it('Handle error during file writing', () => {
    const spyConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const spyAppendFileSync = jest
      .spyOn(fs, 'appendFileSync')
      .mockImplementation(() => {
        throw new Error('Ошибка записи в файл');
      });
    const logger = new DevLogger(dirName, fileName, ['log', 'error']);

    logger.log('Test log message');

    expect(spyAppendFileSync).toHaveBeenCalled();
    expect(spyConsoleError).toHaveBeenCalled();
  });
});
