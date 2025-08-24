export const openapiSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Interval Processor API',
        version: '1.0.0',
        description: 'API for processing intervals'
    },
    servers: [
        { url: `http://localhost:${Number(process.env.PORT ?? 3000)}` }
    ], components: {
        schemas: {
            HealthResponse: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'healthy' },
                    timestamp: { type: 'string', example: '2025-08-22T15:44:25.898Z' },
                    service: { type: 'string', example: 'interval-processor' },
                    version: { type: 'string', example: '1.0.0' }
                }
            },
            IntervalRequest: {
                type: 'object',
                properties: {
                    includes: { type: 'array', items: { type: 'string' }, example: ['1-10', '20-30'] },
                    excludes: { type: 'array', items: { type: 'string' }, example: ['5-7', '25-27'] }
                },
                required: ['includes', 'excludes']
            },
            IntervalResponse: {
                type: 'object',
                properties: {
                    result: { type: 'array', items: { type: 'string' }, example: ['1-4', '8-10', '20-24', '28-30'] },
                    executionTime: { type: 'number', description: 'ms', example: 0 }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Internal server error' },
                    message: {
                        type: 'string',
                        example: 'Bad control character in string literal in JSON at position 73 (line 6 column 14)'
                    }
                }
            }
        }
    },
    paths: {
        '/api/intervals': {
            post: {
                summary: 'Process interval include/exclude operations',
                tags: ['Intervals'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/IntervalRequest' } } }
                },
                responses: {
                    200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/IntervalResponse' } } } },
                    400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
                    500: { description: 'Internal error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            }
        },
        '/api/health': {
            get: {
                summary: 'Health check endpoint',
                tags: ['Health'],
                responses: {
                    200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/HealthResponse' } } } }
                }
            }
        }
    }
};