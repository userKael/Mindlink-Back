import { CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import MessageInterceptor from '../message.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  isRabbitContext: jest.fn().mockReturnValue(true),
}));

const nestExecutionContext = (): any => ({
  getArgByIndex: jest
    .fn()
    .mockReturnValue({ properties: { correlationId: '12345678' } }),
});

const next: Partial<CallHandler> = {
  handle: jest.fn(),
};

describe('MessageInterceptor', () => {
  let interceptor: MessageInterceptor;

  beforeEach(() => {
    interceptor = new MessageInterceptor();
    (next.handle as jest.Mock).mockReturnValue(of({ id: 1 }));
  });

  describe('for any context but RabbitMQ', () => {
    beforeEach(() => {
      (isRabbitContext as jest.Mock).mockImplementation(() => false);
    });

    it('calls next.handle for http context', (done) => {
      const result: Observable<any> = interceptor.intercept(
        nestExecutionContext() as any,
        next as any,
      );

      result.subscribe({
        complete: () => {
          expect(next.handle).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('for RabbitMQ context', () => {
    beforeEach(() => {
      (isRabbitContext as jest.Mock).mockImplementation(() => true);
    });
    it('sets trackId from message correlationId', (done) => {
      (next.handle as jest.Mock).mockImplementation(() => {
        return of({ id: 1 });
      });

      const result: Observable<any> = interceptor.intercept(
        nestExecutionContext() as any,
        next as any,
      );

      result.subscribe({
        complete: () => {
          expect(next.handle).toHaveBeenCalled();
          done();
        },
      });
    });
  });
});
