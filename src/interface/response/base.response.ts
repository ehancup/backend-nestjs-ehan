import { ResponseSuccess, ResponsePagination } from './response.interface';
export class BaseResponse {
  _success(status: string, message: string, data?: any): ResponseSuccess {
    return {
      status,
      message,
      data: data || {},
    };
  }

  _pagination(
    status: string,
    message: string,
    data: any,
    totalData: number,
    page: number,
    pageSize: number,
  ): ResponsePagination {
    return {
      status,
      message,
      data: data || {},
      pagination: {
        total: totalData,
        page,
        pageSize,
      },
    };
  }
}
