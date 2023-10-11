import { ApiMessagedto } from "src/dto/api-message.dto"

export class BaseController {
    makeResponse<T>(message, data = null, result = true, code = ''): ApiMessagedto<T> {
        return new ApiMessagedto(message, data, result, code);
    }
}