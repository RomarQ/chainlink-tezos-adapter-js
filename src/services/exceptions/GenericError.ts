export default class GenericError extends Error {
    public name = 'GenericError';
    public errors: string[] = [];

    constructor(message: string, errors: string[] = []) {
        super(message); // 'Error' breaks prototype chain here
        this.errors = errors;

        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
}
