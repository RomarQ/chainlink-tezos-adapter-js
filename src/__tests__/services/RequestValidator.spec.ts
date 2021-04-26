import RequestValidationError from '../../services/exceptions/RequestValidationError';
import { requestSpec } from '../../services/Server';
import Validator from '../../services/Validator';

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
        const request = { id: 'id', data: { oracleAddress: 'address' } };
        expect(() => Validator.validateRequest(requestSpec, request)).toThrow(RequestValidationError);
    });

    it('Validate Request - With an incorrect types in data object', () => {
        const request = { id: 'id', data: { oracleAddress: 1, parameters: '1' } };
        expect(() => Validator.validateRequest(requestSpec, request)).toThrow(RequestValidationError);
    });

    it('Validate Request - Valid Request', () => {
        const request = {
            id: 'id',
            data: {
                id: "id",
                oracleAddress: 'address',
                parameters: {
                    decimals: 8,
                    from: "EUR",
                    to: "XTZ",
                }
            }
        };
        expect(() => Validator.validateRequest(requestSpec, request)).not.toThrow();
    });
});
