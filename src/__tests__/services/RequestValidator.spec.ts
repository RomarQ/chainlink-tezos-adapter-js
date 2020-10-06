import RequestValidationError from '../../services/exceptions/RequestValidationError';
import Validator from '../../services/Validator';

const requestSpec = {
    id: 'string',
    data: {
        address: 'string',
        request_id: 'string',
    },
};

describe('Validator', () => {
    it('Validate Request - Empty Body', () => {
        const emptyRequest = {};
        expect(() => Validator.validateRequest(requestSpec, emptyRequest)).toThrow(RequestValidationError);
    });

    it('Validate Request - Without data object', () => {
        const request = { id: 'id' };
        expect(() => Validator.validateRequest(requestSpec, request)).toThrow(RequestValidationError);
    });

    it('Validate Request - With an incomplete data object', () => {
        const request = { id: 'id', data: { address: 'address' } };
        expect(() => Validator.validateRequest(requestSpec, request)).toThrow(RequestValidationError);
    });

    it('Validate Request - With an incorrect types in data object', () => {
        const request = { id: 'id', data: { address: 1, request_id: '1' } };
        expect(() => Validator.validateRequest(requestSpec, request)).toThrow(RequestValidationError);
    });

    it('Validate Request - Valid Request', () => {
        const request = { id: 'id', data: { address: 'address', request_id: '1' } };
        expect(() => Validator.validateRequest(requestSpec, request)).not.toThrow();
    });
});
