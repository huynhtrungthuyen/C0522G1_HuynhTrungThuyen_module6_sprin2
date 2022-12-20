import {IUser} from "./i-user";

export interface IEmployee {
  id?: number;
  name?: string;
  birthday?: string;
  gender?: number;
  idCard?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  image?: string;
  user?: IUser;
}
