import ValidationError from './exceptions/RequestValidationError';

export type RequestParameters = {
    [key: string]: RequestParameters | string | number;
};

const validateRequest = (spec: RequestParameters, requestParameters: RequestParameters): void => {
    const errors = validateSpec(spec, undefined, Object.keys(spec), requestParameters);
    if (errors.length > 0) {
        throw new ValidationError('The request is invalid, check the errors for details.', errors);
    }
};

const validateSpec = (spec: RequestParameters, parent = '', items: string[], request: RequestParameters = {}) => {
    let errors: string[] = [];
    items.forEach((field) => {
        if (typeof request[field] !== spec[field]) {
            if (typeof spec[field] === 'object') {
                const objectErrors = validateSpec(
                    spec[field] as RequestParameters,
                    field,
                    Object.keys(spec[field]),
                    (typeof request[field] === 'object' ? request[field] : {}) as RequestParameters,
                );
                if (objectErrors.length > 0) {
                    errors = [...errors, ...objectErrors];
                }
            } else {
                errors = [...errors, `Expected field [${parent}${parent ? '.' : ''}${field}] of type (${spec[field]})`];
            }
        }
    });

    return errors;
};

export default {
    validateRequest,
};
