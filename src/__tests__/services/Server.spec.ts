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
                    'Expected field [data.address] of type (string)',
                    'Expected field [data.result] of type (string)',
                    'Expected field [data.type] of type (string)',
                    'Expected field [data.request_id] of type (string)',
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
                    'Expected field [data.address] of type (string)',
                    'Expected field [data.result] of type (string)',
                    'Expected field [data.type] of type (string)',
                    'Expected field [data.request_id] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with an incomplete data object', async () => {
        const response = await request.post('/').send({ id: 'DUMMY', data: { address: 'DUMMY' } });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    'Expected field [data.result] of type (string)',
                    'Expected field [data.type] of type (string)',
                    'Expected field [data.request_id] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with an invalid id type', async () => {
        const response = await request.post('/').send({ id: 1, data: { address: 'DUMMY' } });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            error: {
                name: 'RequestValidationError',
                message: 'The request is invalid, check the errors for details.',
                errors: [
                    'Expected field [id] of type (string)',
                    'Expected field [data.result] of type (string)',
                    'Expected field [data.type] of type (string)',
                    'Expected field [data.request_id] of type (string)',
                ],
            },
            status: 'errored',
            statusCode: 500,
        });
    });

    it('Call (/) route with a valid body', async () => {
        const response = await request
            .post('/')
            .send({ id: 'DUMMY', data: { address: 'DUMMY', type: 'int', result: '1', request_id: 'DUMMY' } });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            jobRunID: 'DUMMY',
            data: { result: 'DUMMY' },
            result: 'DUMMY',
            statusCode: 200,
        });
    });
});
