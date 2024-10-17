import { OpenAPIV3 } from 'openapi-types';
import { errorResponses } from './errors.docs';
import { paginatedResponseSchema } from './common.docs';
import { PaginationSort } from '../../modules/common/paginated';

const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    description: "OpenAPI doc for Mindlink's x service",
    version: 'v1',
    title: 'X Service',
  },
  servers: [
    {
      url: '/v1',
    },
  ],
  paths: {
    '/boilerplates': {
      post: {
        tags: ['Boilerplates'],
        summary: 'Boilerplate creation',
        operationId: 'create',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the boilerplate',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Boilerplate succesfully created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id', 'name'],
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Id',
                    },
                    name: {
                      type: 'string',
                      description: 'Name',
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/badRequestResponse',
          },
          401: {
            $ref: '#/components/responses/unauthorizedResponse',
          },
          422: {
            $ref: '#/components/responses/unprocessableEntityResponse',
          },
        },
      },
      get: {
        tags: ['Boilerplates'],
        summary: 'Boilerplate list',
        operationId: 'list',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Pagination page number',
            required: true,
            schema: {
              type: 'number',
              minimum: 1,
              default: 1,
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'Pagination limit list number',
            required: true,
            schema: {
              type: 'number',
              minimum: 1,
              maximum: 100,
              default: 10,
            },
          },
          {
            name: 'sort',
            in: 'query',
            description: 'Listing order',
            required: true,
            schema: {
              type: 'string',
              enum: Object.values(PaginationSort),
              default: PaginationSort.ASC,
            },
          },
        ],
        responses: {
          200: {
            description: 'Products successfully found.',
            content: {
              'application/json': {
                schema: paginatedResponseSchema(
                  '#/components/schemas/boilerplate',
                ),
              },
            },
          },
          400: {
            $ref: '#/components/responses/badRequestResponse',
          },
          401: {
            $ref: '#/components/responses/unauthorizedResponse',
          },
          422: {
            $ref: '#/components/responses/unprocessableEntityResponse',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      boilerplate: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id',
          },
          name: {
            type: 'string',
            description: 'Name',
          },
        },
      },
    },
    responses: {
      ...errorResponses,
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-KEY',
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
};

export default swaggerDocument;
