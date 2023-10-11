export class ApiMessagedto<T> {
    message: string;
    data: T;
    result: number;
    code: string;

    constructor(message, data, result, code) {
        this.message = message;
        this.data = data;
        this.result = result;
        this.code = code;
    }
}