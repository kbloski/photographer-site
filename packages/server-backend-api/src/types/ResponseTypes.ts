export type ErrorResponse = {
    success: false,
    message: string,
    errorCode?: string
};

export type SuccessResponse<T> = {
    success: true,
    data: T;
    message?: string
}