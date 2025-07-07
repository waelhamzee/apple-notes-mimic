export interface ApiResponse<T> {
  success: true;
  data: T;
  message: string;
}
