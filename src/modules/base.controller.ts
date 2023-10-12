import { ApiMessagedto } from "src/common/dto/api-message.dto"

export class BaseController {
    makeResponse(message, data = null, result = true, code = ''): ApiMessagedto<any> {
        return new ApiMessagedto(message, data, result, code);
    }

    makeList(content, totalElements, { size, page }: any) {
        return { content, page, size, totalElements };
    }
}