import { serve, setup } from 'swagger-ui-express';
import * as express from 'express';
import { join } from 'path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import openapiDocument from '../docs/openapi';
import AppLogger from '../modules/configuration/logging/app.logger';

const setupApplication = async (app: INestApplication): Promise<void> => {
  app.use('/api-docs/openapi.json', (req, res) => res.json(openapiDocument));
  app.use(
    '/api-docs',
    serve,
    setup(openapiDocument, {
      url: '/api-docs/openapi.json',
    }),
  );
  app.use(
    '/asyncapi-docs',
    express.static(join(__dirname, '../docs/asyncapi/page')),
  );
  app.enableShutdownHooks();
  app.useLogger(app.get(AppLogger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
};

export default setupApplication;
