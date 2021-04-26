import supertest from 'supertest';

import server from '../../services/Server';

const request = supertest(server);

describe('Server', () => {
    it('Call (/) route without including a body', async () => {
        const response = await request.post('/');

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    'Expected field [id] of type (string)',
                    "Expected field [data.id] of type (string)",
                    'Expected field [data.oracleAddress] of type (string)',
                    'Expected field [parameters.decimals] of type (number)',
                    'Expected field [parameters.to] of type (string)',
                    'Expected field [parameters.from] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route without a data object', async () => {
        const response = await request.post('/').send({ id: 'DUMMY' });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    "Expected field [data.id] of type (string)",
                    'Expected field [data.oracleAddress] of type (string)',
                    'Expected field [parameters.decimals] of type (number)',
                    'Expected field [parameters.to] of type (string)',
                    'Expected field [parameters.from] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with an incomplete data object', async () => {
        const response = await request.post('/').send({ id: 'DUMMY', data: { oracleAddress: 'DUMMY' } });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    "Expected field [data.id] of type (string)",
                    'Expected field [parameters.decimals] of type (number)',
                    'Expected field [parameters.to] of type (string)',
                    'Expected field [parameters.from] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with an invalid id type', async () => {
        const response = await request.post('/').send({ id: 1, data: { oracleAddress: 'DUMMY' } });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    'Expected field [id] of type (string)',
                    "Expected field [data.id] of type (string)",
                    'Expected field [parameters.decimals] of type (number)',
                    'Expected field [parameters.to] of type (string)',
                    'Expected field [parameters.from] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with a valid body', async () => {
        const response = await request
            .post('/')
            .send({
                id: 'DUMMY',
                data: {
                    id: "id",
                    oracleAddress: 'DUMMY',
                    parameters: {
                        decimals: 8,
                        from: "XTZ",
                        to: "EUR"
                    }
                }
            });

        //expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            jobRunID: 'DUMMY',
            data: { result: 'DUMMY' },
            result: 'DUMMY',
            statusCode: 200,
        });
    });
});
