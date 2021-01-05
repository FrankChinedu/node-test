/* eslint-disable @typescript-eslint/no-explicit-any */

import { type } from "os"

export interface IResponse {
  token?: string;
  status: number;
  success: boolean;
  data?: any;
  error?: any,
  message?: string
}

export type UserDataType = {
  name: string,
  email: string,
  password: string
}

export interface UserType {
  id: number,
  email: string,
  name: string
}
