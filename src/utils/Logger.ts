import { FastifyBaseLogger } from 'fastify';
// @ts-expect-error abstract-logging has no types
import nullLogger from 'abstract-logging';

class Logger {

  private instance: FastifyBaseLogger | typeof nullLogger = nullLogger;

  constructor() {
    this.instance = nullLogger;
  }

  init( fastifyLogger: FastifyBaseLogger ): void {
    this.instance = fastifyLogger;
  }

  info( obj: unknown, msg?: string, ...args: any[] ): void {
    this.instance.info(obj, msg, ...args);
  }

  error(obj: unknown, msg?: string, ...args: any[]): void {
    this.instance.error(obj, msg, ...args);
  }

  fatal(obj: unknown, msg?: string, ...args: any[]): void {
    this.instance.fatal(obj, msg, ...args);
  }

  warn(obj: unknown, msg?: string, ...args: any[]): void {
    this.instance.warn(obj, msg, ...args);
  }

  debug(obj: unknown, msg?: string, ...args: any[]): void {
    this.instance.debug(obj, msg, ...args);
  }

  trace(obj: unknown, msg?: string, ...args: any[]): void {
    this.instance.trace(obj, msg, ...args);
  }

}

export const logger : Logger = new Logger();
