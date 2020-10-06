import { createWriteStream } from 'fs';
import { format } from 'util';

export const accessLog = createWriteStream('access.log', { flags: 'a' });

export const outputLog = createWriteStream('output.log', { flags: 'w' });

type LogLevel = (...d: unknown[]) => void;

/**
 * Creates a log level
 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
 * @param {string} prefix - Log Level prefix (e.g. INFO, DEBUG, ERROR, TRACE, ...)
 * @return {LogLevel} Function to write the log with the respective log level prefix
 */
const createLogLevel = (prefix: string): LogLevel => (...d) => {
    outputLog.write(`[${prefix}] - ${format(d)} \n`);
};

export default {
    info: createLogLevel('INFO'),
    debug: createLogLevel('DEBUG'),
    error: createLogLevel('ERROR'),
};
