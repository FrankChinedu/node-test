/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponse {
  token?: string;
  status: number;
  success: boolean;
  data?: any;
  error?: any
}

export interface IRegisterIn {
  name: string,
  email: string,
  password: string
}
