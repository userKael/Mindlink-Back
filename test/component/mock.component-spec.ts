import request from 'supertest';

describe('Health (component test - for these, we should mock external dependencies)', () => {
  beforeAll(async () => {});

  it('GET /health/readiness', async () => {
    return request(globalThis.app.getHttpServer())
      .get('/health/readiness')
      .then((result) => {
        expect(result.status).toEqual(200);
      });
  });
});
