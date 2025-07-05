import * as fs from 'fs';
import * as path from 'node:path';
import { TskvLogger } from '../loggers/tskv.logger';

const dirName = '/tmp/test_logs';
const fileName = 'json.log';

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

describe('TskvLogger', () => {
  it('Create log-file in the specified directory', () => {
    const expectedFilePath = path.join(dirName, fileName);

    new TskvLogger(dirName, fileName, ['log', 'error']);

    expect(fs.existsSync(expectedFilePath)).toBe(true);
  });

  it('Write logs with different levels', () => {
    const expectedFilePath = path.join(dirName, fileName);
    const logger = new TskvLogger(dirName, fileName, [
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

    expect(content).toMatch(
      new RegExp(`level=LOG\tmessage="Test log message"\ttimestamp=.*\\n`),
    );
    expect(content).toMatch(
      new RegExp(
        `level=ERROR\tmessage="Test error message"\ttimestamp=.*\tparam.*=.*\\n`,
      ),
    );
    expect(content).toMatch(
      new RegExp(`level=WARN\tmessage="Test warning message"\ttimestamp=.*\\n`),
    );
    expect(content).toMatch(
      new RegExp(`level=DEBUG\tmessage="Test debug message"\ttimestamp=.*\\n`),
    );
  });

  it('Filter out messages based on allowed log levels', () => {
    const logger = new TskvLogger(dirName, fileName, ['log', 'error']);
    const expectedFilePath = path.join(dirName, fileName);

    logger.log('Test log message');
    logger.error('Test error message');
    logger.warn('Test warning message');
    logger.debug('Test debug message');

    const content = fs.readFileSync(expectedFilePath, 'utf8');

    expect(content).toContain('level=LOG');
    expect(content).toContain('level=ERROR');
    expect(content).not.toContain('level=WARN');
    expect(content).not.toContain('level=DEBUG');
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

    new TskvLogger(dirName, fileName, ['log', 'error']);

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
    const logger = new TskvLogger(dirName, fileName, ['log', 'error']);

    logger.log('Test log message');

    expect(spyAppendFileSync).toHaveBeenCalled();
    expect(spyConsoleError).toHaveBeenCalled();
  });
});
