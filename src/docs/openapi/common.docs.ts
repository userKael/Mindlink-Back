import { OpenAPIV3 } from 'openapi-types';
import { PaginationSort } from '../../modules/common/paginated';

// eslint-disable-next-line import/prefer-default-export
export const paginatedResponseSchema = (
  ref: string,
): OpenAPIV3.SchemaObject => ({
  type: 'object',
  required: ['items'],
  properties: {
    page: {
      type: 'number',
      description: 'List page',
    },
    pageSize: {
      type: 'number',
      description: 'Number of items to be returned',
    },
    total: {
      type: 'number',
      description: 'Total count of items',
    },
    sort: {
      type: 'string',
      enum: Object.values(PaginationSort),
      description: 'Listing order',
    },
    items: {
      type: 'array',
      items: {
        $ref: ref,
      },
    },
  },
});
